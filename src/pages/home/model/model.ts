import { routes } from "../../../shared/config/routes";

export const currentRoute = routes.home;
currentRoute.opened.watch(() => console.log("Home route opened"));
