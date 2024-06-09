import { routes } from "../../../shared/config/routes";

export const currentRoute = routes.auth.signup;
currentRoute.opened.watch(() => console.log("Signup route opened"));
