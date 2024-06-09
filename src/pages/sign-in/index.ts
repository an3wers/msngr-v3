import { currentRoute } from "./model/model";
import { Signin } from "./ui/Signin";

export const SignInRoute = {
  view: Signin,
  route: currentRoute,
};
