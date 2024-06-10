import { createRoutesView } from "atomic-router-react";
import { HomeRoute } from "./home";
import { SignInRoute } from "./sign-in";
import { SignUpRoute } from "./sign-up";
import { AboutRoute } from "./about";

export const RoutesView = createRoutesView({
  routes: [HomeRoute, SignInRoute, SignUpRoute, AboutRoute],
});
