import { useUnit } from "effector-react";
import { userSelected, userSeted, $userExample } from "../model/model";

export const About = () => {
  //
  const [handleUserSelected, handleUserSeted, someUser] = useUnit([
    userSelected,
    userSeted,
    $userExample,
  ]);

  return (
    <>
      <h1>About page</h1>
      <div>
        <button onClick={() => handleUserSelected({ id: "123" })}>Select user</button>
        <button onClick={() => handleUserSeted({ id: "123", name: "Jhon" })}>Set user</button>
      </div>
      <div>{someUser !== null && JSON.stringify(someUser)}</div>
    </>
  );
};
