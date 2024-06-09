import { createStore, createEvent, sample, attach } from "effector";
import { formValidator } from "../../../shared/libs/formValidator";
import { reset, every, and, or, not } from "patronum";
import * as api from "../api/loginApi";
import { getUserFx } from "../../../entities/user";

// TODO: Обработать кейс размонтирования компонента - сбрасывать стор на дефолтное состояние

// Локализая эффекта, для того чтобы он срабатывал в рамках только этого модуля и не влиял на другие части приложения, в которых тоже может вызываться оригинальный api.signInFx
// Создаем с помощью attach локальную копию эффекта
const signInFx = attach({ effect: api.signInFx });

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent<React.SyntheticEvent>();

export const $email = createStore<string>("");
export const $emailError = createStore<"invalid" | "empty" | null>(null);

export const $password = createStore<string>("");
export const $passwordError = createStore<"invalid" | "empty" | null>(null);

export const $signInError = createStore<Error | null>(null);

export const $signInPending = signInFx.pending;

$email.on(emailChanged, (_, val) => val);
$password.on(passwordChanged, (_, val) => val);

reset({ clock: emailChanged, target: $emailError });
reset({ clock: passwordChanged, target: $passwordError });

const $isFormValid = every({
  stores: [$emailError, $passwordError],
  predicate: null,
});

/*
smaple
clock – срабатывание чего
target – вызывает что
*/

// form validate

const { isEmailValid, isPasswordValid, isEmpty } = formValidator();

$signInError.on(formSubmitted, () => null);

sample({
  clock: formSubmitted,
  source: $email,
  fn: (email) => {
    if (isEmpty(email)) return "empty";
    if (!isEmailValid(email)) return "invalid";
    return null;
  },
  target: $emailError,
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
  source: { login: $email, password: $password },
  filter: and($isFormValid, not($signInPending)),
  target: signInFx,
});

$signInError.on(signInFx.failData, (_, error) => error);

sample({
  clock: signInFx.done,
  filter: () => $signInError === null,
  target: getUserFx,
});
