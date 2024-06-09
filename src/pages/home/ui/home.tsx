import { useUnit } from "effector-react";
import * as user from "../../../entities/user";

export const Home = () => {
  const [userError] = useUnit([user.$userError]);

  return (
    <>
      <h1>Home page</h1>
      {userError !== null && JSON.stringify(userError)}
    </>
  );
};
