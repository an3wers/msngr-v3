import { createEffect } from "effector";
import api from "../../../shared/api/baseAPI";
import { User, UserError } from "../model/types";
import { checkError } from "../../../shared/api/chekError";

export const getUserFx = createEffect<void, User, Error>(async () => {
  try {
    const res = await api.get<User | UserError>("auth/user", {
      credentials: "include",
    });

    checkError(res);

    return res.data as User;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
