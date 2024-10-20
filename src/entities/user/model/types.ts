import { UserResponse } from "../../../shared/api/user/types";

export interface User extends UserResponse {}

export interface UserError {
  reason: string;
}
