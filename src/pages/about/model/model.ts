import { createEvent, createStore, sample } from "effector";
import { routes } from "../../../shared/config/routes";

export const currentRoute = routes.about;
currentRoute.opened.watch(() => console.log("About route opened"));

/* Examples */

interface UserExample {
  name: string;
  id: string;
}

type UserSelected = {
  id: string;
};

export const userSelected = createEvent<UserSelected>();
export const userSeted = createEvent<UserExample>();

/*
EventCallable

Каждое событие, созданное через createEvent, имеет тип EventCallable<T>
— то есть, событие можно использовать как функцию для передачи данных:
*/

// example
userSelected({ id: "123" });

/*
  события могут быть использованы в React через useUnit:
  page/about/ui...
*/

/*

Подписки

Чтобы отследить момент срабатывания того или иного события можно использовать .watch(fn),
но только для отладки.

Важно! Не нужно запускать в .watch(fn) какую-нибудь важную логику,
так как метод для этого не предназначен, он подавляет ошибки и не позволяет подписаться на окончание выполнения.

*/

userSelected.watch(({ id }) => console.log('[Event]: "User selected"', { id }));

/*
Состояния в effector

Store в Effector представляет собой единицу состояния,
которая отвечает за хранение данных и их реактивное обновление.
*/

export const $userExample = createStore<UserExample | null>(null);

// Хранилища могут использовать watch
// .watch() чаще всего применяется в библиотечном коде или для отладки, но не рекомендуется для регулярного использования в бизнес-логике.
// .watch(fn) будет вызвана при создании стора, а также при каждом обновлении.
$userExample.watch((user) => console.log('[Store]: "User updated"', { user }));

//1. Пример обнования сторая
userSeted.watch((user) => {
  console.log('[Event]: "User seted"', { user });
});

/*

  Сторы могут хранить любые значения, но при обновлении нужно возвращать НОВОЕ значение.
  
  Функция переданная в .on() называется редюссер, и должна быть чистой, чтобы effector мог выполнять оптимизации.
  В редюссере может быть два аргумента: первый это состояние стора, второй — аргумент из события.
  $store.on(someEvent, (storeValue, eventPayload) => newStoreValue);

  */
// .on(clock, reducer)
// (_, user) => user - редьюсер
// $userExample.on(userSeted, (_, user) => user);

// 2. Еще один вариант обновления стора

// sample({ source?, clock?, filter?, fn?, target?}): target

sample({
  clock: userSeted,
  target: $userExample,
});

/*
  Сайд-эффекты в effector

  const fetchDataFx = createEffect(async (id: string) => {
  const response = await fetch(`/api/data/${id}`);
  return response.json();
});

  Структура эффекта
  const effectFx: Effect<Params, Done, Fail> = createEffect(handler);


  При успешном завершении эффекта, будет вызвано событие effectFx.done с аргументом эффекта и результатом работы handler.
  При выброшенной ошибке (или же Promise.reject), будет вызвано событие effectFx.fail с аргументом эффекта и ошибкой.

  effectFx.watch((params) => console.info("effect called with", params));
  effectFx.done.watch(({ params, result }) => console.log("effect finished", params, result));
  effectFx.fail.watch(({ params, error }) => console.warn("effect failed", params, result));
  effectFx.pending.watch((pending) => console.info("effect pending state is", pending));
*/

/*
  Логические цепочки / Map
  События могут образовывать цепочки через .map(), что позволяет трансформировать данные, не вызывая события вручную:

  const numberReceived: EventCallable<number> = createEvent<number>();
  const oddNumberReceived: Event<boolean> = numberReceived.map((num) => num % 2 === 0);
  
  oddNumberReceived будет автоматически вызвано при каждом срабатывании события numberReceived.
  
  Метод .map() возвращает новое событие сразу же, сохраняя оригинальное событие неизменным.
  При этом numberReceived является EventCallable<number>, а oddNumberReceived — Event<boolean>


  Сторы, как и события, могут создавать производные сторы с помощью .map()
  const $number = createStore(5);
  const $isOddNumber = $number.map((number) => number % 2 === 0);

  filter
  Кроме .map() события имеют ряд других методов, например .filter({fn}), позволяющий определить в каких случаях второе событие нужно вызывать, а когда нет.

  */

/*
    Юниты

    Большинство операторов, которые принимают на вход событие, могут принимать также стор и эффект.


    const counterClicked = createEvent();
    const $counter = createStore(0);
    const $sum = createStore(0);

    $counter.on(counterClicked, (counter) => counter + 1);
    // $sum подписан на обновления $counter
    $sum.on($counter, (sum, counter) => sum + counter);


    $sum.on(
      [effectFx, effectFx.doneData, $counter, incrementClicked],
      (sum, amount) => sum + amount,
    );
*/

/*
  Sample

  export const cityClicked = createEvent<{ cityName: string }>();

  const $currentCityName = createStore<string | null>(null>);
  export const $currentCity = createStore<City | null>(null);
  export const $cities = createStore<City[]>([]);

  В этом примере, при изменении текущего выбранного города,
  нужно переложить объект City из $cities в $currentCity, но именно при срабатывании события cityClicked.

  sample({
  clock: cityClicked,
  source: $cities,
  fn: (cities, { cityName }) =>
    cities.find(c => c.name === cityName) ?? null,
    target: $currentCity,
  });

  clock — когда будет запущен cityClicked,
  source — в этот момент прочитать $cities,
  fn — вызвать эту функцию со значениями из $cities и cityClicked,
  target — положить результат вызова fn в $currentCity.

*/

/*
  combine

  Оператор позволяет создать новый стор, на основе состояния нескольких существующих.
  При обновлении каждого стора, от которого зависит combined-стора, значение внутри combined будет рассчитано заново.
  Пример выше можно переписать и на combine:
  
  export const $currentCity = combine(
  $currentCityName, $cities,
  (cityName, cities) => cities.find(c => c.name === cityName) ?? null
);

  $combined = combine($a, $b, $c, ..., (a, b, c, ...) => result);

*/

/*
  Merge

  const mergedEvent = merge([firstEvent, anotherEvent, $someStore, someFx]);

*/
