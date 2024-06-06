import { MantineProvider, MantineTheme } from "@mantine/core";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme: Partial<MantineTheme> = {
    fontFamily: '"Fira Sans", sans-serif;',
    primaryColor: "dark",
    fontSmoothing: true,
    primaryShade: 9,
  };
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
};
