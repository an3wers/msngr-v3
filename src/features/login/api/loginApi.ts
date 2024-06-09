import { createEffect } from "effector";
import api from "../../../shared/api/baseAPI";
import { checkError } from "../../../shared/api/chekError";

interface SignInRequest {
  login: string;
  password: string;
}

export const signInFx = createEffect<SignInRequest, unknown, Error>(
  async (data) => {
    try {
      const res = await api.post("auth/signin", data);

      checkError(res);

      return res.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : JSON.stringify(error)
      );
    }
  }
);
