import { createStore, attach, sample, createEvent } from "effector";
import { User } from "./types";
import { appStarted } from "../../../shared/config/init";
import * as api from "../../../shared/api/user/userApi";

export const getUserFx = attach({ effect: api.getUserFx });

export const getUser = createEvent();

export const $user = createStore<User | null>(null);
export const $userError = createStore<string | null>(null);

// clear error
$userError.reset(getUserFx.pending);

$user.watch((u) => console.log(">> User state >>", u));

sample({
  clock: appStarted,
  target: getUser,
});

sample({
  clock: getUser,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $user,
});

sample({
  clock: getUserFx.failData,
  fn: (err) => {
    return err.message;
  },
  target: $userError,
});
