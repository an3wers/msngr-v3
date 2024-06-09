import { useUnit } from "effector-react";
import * as user from "../../../entities/user";
// import { routes } from "../../../shared/config/routes";

// const currentRoute = routes.home;
// currentRoute.opened.watch(() => console.log("Home route opened"));

export const Home = () => {
  const [userError] = useUnit([user.$userError]);

  return (
    <>
      <h1>Home page</h1>
      {userError !== null && JSON.stringify(userError)}
    </>
  );
};
