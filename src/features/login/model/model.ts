import { createStore, createEvent, sample, attach } from "effector";
import { formValidator } from "../../../shared/libs/formValidator";
import { reset, every, and, not } from "patronum";
import * as api from "../../../shared/api/user/userApi";

// TODO: Точно ли нужно этот эффект использовать
import { getUserFx } from "../../../entities/user";

// TODO: Обработать кейс размонтирования компонента - сбрасывать стор на дефолтное состояние

// Локализая эффекта, для того чтобы он срабатывал в рамках только этого модуля
// и не влиял на другие части приложения, в которых тоже может вызываться оригинальный api.signInFx
// Создаем с помощью attach локальную копию эффекта
const signInFx = attach({ effect: api.signInFx });

export const loginChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent<React.SyntheticEvent>();

export const $login = createStore<string>("");
export const $loginError = createStore<"invalid" | "empty" | null>(null);

export const $password = createStore<string>("");
export const $passwordError = createStore<"invalid" | "empty" | null>(null);

export const $signInError = createStore<Error | null>(null);

export const $signInPending = signInFx.pending;

$login.on(loginChanged, (_, val) => val);
$password.on(passwordChanged, (_, val) => val);

reset({ clock: loginChanged, target: $loginError });
reset({ clock: passwordChanged, target: $passwordError });

const $isFormValid = every({
  stores: [$loginError, $passwordError],
  predicate: null,
});

/*
smaple
clock – срабатывание чего
source
fn
filter
target – вызывает что
*/

// form validate

const { isLoginValid, isPasswordValid, isEmpty } = formValidator();

$signInError.on(formSubmitted, () => null);

sample({
  clock: formSubmitted,
  source: $login,
  fn: (login) => {
    if (isEmpty(login)) return "empty";
    if (!isLoginValid(login)) return "invalid";
    return null;
  },
  target: $loginError,
});

sample({
  clock: formSubmitted,
  source: $password,
  fn: (password) => {
    if (isEmpty(password)) return "empty";
    if (!isPasswordValid(password)) return "invalid";
    return null;
  },
  target: $passwordError,
});

sample({
  clock: formSubmitted,
  source: { login: $login, password: $password },
  filter: and($isFormValid, not($signInPending)),
  target: signInFx,
});

$signInError.on(signInFx.failData, (_, error) => error);

sample({
  clock: signInFx.done,
  filter: () => $signInError === null,
  target: getUserFx, // ??
});
