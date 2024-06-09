import { createEffect } from "effector";
import api from "../../../shared/api/baseAPI";
import { User, UserError } from "../model/types";
import { checkError } from "../../../shared/api/chekError";

export const getUserFx = createEffect<void, User, Error>(async () => {
  try {
    const res = await api.get<User | UserError>("auth/user");

    checkError(res);

    return res.data as User;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : JSON.stringify(error)
    );
  }
});
