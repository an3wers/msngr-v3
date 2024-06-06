import { createStore, createEvent, sample } from "effector";

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();

export const $email = createStore<string>("");
export const $password = createStore<string>("");

$email.on(emailChanged, (_, val) => val);
$password.on(passwordChanged, (_, val) => val);

export const submit = createEvent<React.SyntheticEvent>();

/*
smaple

clock – срабатывание чего
target – вызывает что


*/

sample({
  clock: submit,
  source: { $email: $email, $password: $password },
  fn: (data) => {
    console.log("@sample", data);
  },
});
