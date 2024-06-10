/* eslint-disable @typescript-eslint/ban-types */
import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  RouteInstance,
  UnmappedRouteObject,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";
import { appStarted } from "./init";

// TODO: Add Profile
export const routes = {
  home: createRoute(),
  about: createRoute(),
  auth: {
    signin: createRoute(),
    signup: createRoute(),
  },
};

const routesMap: UnmappedRouteObject<
  Record<string, string | RouteInstance<{}>>
>[] = [
  {
    path: "/sign-in",
    route: routes.auth.signin,
  },
  {
    path: "/sign-up",
    route: routes.auth.signup,
  },
  {
    path: "/",
    route: routes.home,
  },
  {
    path: "/about",
    route: routes.about,
  },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
