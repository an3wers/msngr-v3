import { Box, Title } from "@mantine/core";
import styles from "./signup.module.css";

export const Signup = () => {
  return (
    <main className={styles.layout}>
      <Box w="100%" maw={360} mx="auto">
        <Title order={1} size="h2" mb={"lg"}>
          Регистрация
        </Title>
      </Box>
    </main>
  );
};
