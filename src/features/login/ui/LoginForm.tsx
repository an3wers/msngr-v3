import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import * as model from "../index";
import { useUnit } from "effector-react";

export const LoginForm = () => {
  const [email] = useUnit([model.$email]);
  const [password] = useUnit([model.$password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.submit(e);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => model.emailChanged(e.currentTarget.value)}
            placeholder="your@email.com"
          />
          <PasswordInput
            label="Пароль"
            value={password}
            onChange={(e) => model.passwordChanged(e.currentTarget.value)}
            placeholder="Введите пароль"
          />
        </Stack>
        <Button mt={"xl"} fullWidth type="submit">
          Войти
        </Button>
      </form>
    </>
  );
};
