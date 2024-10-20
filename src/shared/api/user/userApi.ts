import { createEffect } from "effector";
import api from "../../../shared/api/base/baseAPI";
import { checkError } from "../../../shared/api/base/chekError";
import type { SignInRequest, SignInResponse, UserResponse } from "./types";

export const getUserFx = createEffect<void, UserResponse, Error>(async () => {
  try {
    const res = await api.get<UserResponse>("auth/user", {
      credentials: "include",
    });

    checkError(res);

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const signInFx = createEffect<SignInRequest, unknown, Error>(
  async (data) => {
    try {
      const res = await api.post<SignInResponse>("auth/signin", data, {});

      checkError(res);

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
