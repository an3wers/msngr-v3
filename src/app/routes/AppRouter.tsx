import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../../pages/home";
import { Signin } from "../../pages/sign-in";
import { Routes } from "../../shared/config/routes";
import { Signup } from "../../pages/sign-up/ui/signup";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: Routes.HOME,
      element: <Home />,
    },
    {
      path: Routes.SIGN_IN,
      element: <Signin />,
    },
    {
      path: Routes.SIGN_UP,
      element: <Signup />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
