import { Anchor, Box, Group, Space, Title } from "@mantine/core";
import styles from "./signin.module.css";
import { LoginForm } from "../../../features/login";
import { Link } from "atomic-router-react";
import { routes } from "../../../shared/config/routes";

export const Signin = () => {
  return (
    <main className={styles.layout}>
      <Box w="100%" maw={360} mx="auto">
        <Title order={1} size="h2" mb={"lg"}>
          Войти
        </Title>
        <LoginForm />
        <Space h="md" />
        <Group justify="center">
          <Anchor to={routes.auth.signup} component={Link}>
            Нет аккаунта?
          </Anchor>
        </Group>
      </Box>
    </main>
  );
};
