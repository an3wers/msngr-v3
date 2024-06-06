import {
  Anchor,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
// import { useForm } from "@mantine/form";
import styles from "./signin.module.css";
// import { useFormValidator } from "../../../shared/libs/formValidator";
import { Link } from "react-router-dom";
import { Routes } from "../../../shared/config/routes";
import { LoginForm } from "../../../features/login";

export const Signin = () => {
  // const { emailValidate, passwordValidate } = useFormValidator();

  // TODO: Переписать на Effectore

  // const form = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },

  //   validate: {
  //     email: (value) => emailValidate(value),
  //     password: (value) => passwordValidate(value),
  //   },
  // });

  return (
    <main className={styles.layout}>
      <Box w="100%" maw={360} mx="auto">
        <Title order={1} size="h2" mb={"lg"}>
          Войти
        </Title>
        <LoginForm />
        <Group justify="center">
          <Anchor to={Routes.SIGN_UP} component={Link}>
            Нет аккаунта?
          </Anchor>
        </Group>
      </Box>
    </main>
  );
};
