import { MantineProvider, MantineTheme } from "@mantine/core";
import { RouterProvider } from "atomic-router-react";
import { router } from "../../shared/config/routes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme: Partial<MantineTheme> = {
    fontFamily: '"Fira Sans", sans-serif;',
    primaryColor: "dark",
    fontSmoothing: true,
    primaryShade: 9,
  };
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router}>{children}</RouterProvider>
    </MantineProvider>
  );
};
