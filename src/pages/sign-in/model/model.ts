import { routes } from "../../../shared/config/routes";

export const currentRoute = routes.auth.signin;
currentRoute.opened.watch(() => console.log("Signin route opened"));
