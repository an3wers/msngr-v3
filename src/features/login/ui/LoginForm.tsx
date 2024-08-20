import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import * as model from "../index";
import { useUnit } from "effector-react";

export const LoginForm = () => {
  // TODO: В useUnit нужно добавить events
  const [pending, signInError] = useUnit([
    model.$signInPending,
    model.$signInError,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.formSubmitted(e);
  };

  return (
    <Stack>
      {signInError !== null && (
        <Alert variant="filled" color="red" title="Ошибка авторизации">
          {signInError.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <Login />
          <Password />
        </Stack>
        <Button mt={"xl"} loading={pending} fullWidth type="submit">
          Войти
        </Button>
      </form>
    </Stack>
  );
};

const loginErrorText = {
  empty: "Логин не может быть пустым",
  invalid: "Неверный формат логина",
};

const Login = () => {
  const [login, error] = useUnit([model.$login, model.$loginError]);

  return (
    <TextInput
      label="Логин"
      value={login}
      error={error ? loginErrorText[error] : null}
      onChange={(e) => model.loginChanged(e.currentTarget.value)}
    />
  );
};

const passwordErrorText = {
  empty: "Пароль не может быть пустым",
  invalid: "Пароль должен содержать больше символов",
};

const Password = () => {
  const [password, error] = useUnit([model.$password, model.$passwordError]);

  return (
    <PasswordInput
      label="Пароль"
      value={password}
      error={error ? passwordErrorText[error] : null}
      onChange={(e) => model.passwordChanged(e.currentTarget.value)}
    />
  );
};
