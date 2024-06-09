import { Anchor, Box, Group, Title } from "@mantine/core";
import styles from "./signin.module.css";
import { Link } from "react-router-dom";
// import { Routes } from "../../../shared/config/routes";
import { LoginForm } from "../../../features/login";

export const Signin = () => {
  return (
    <main className={styles.layout}>
      <Box w="100%" maw={360} mx="auto">
        <Title order={1} size="h2" mb={"lg"}>
          Войти
        </Title>
        <LoginForm />
        <Group justify="center">
          {/* <Anchor to={Routes.SIGN_UP} component={Link}>
            Нет аккаунта?
          </Anchor> */}
        </Group>
      </Box>
    </main>
  );
};
