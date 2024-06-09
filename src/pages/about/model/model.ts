import { routes } from "../../../shared/config/routes";

export const currentRoute = routes.about;
currentRoute.opened.watch(() => console.log("About route opened"));
