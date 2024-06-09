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

// export const enum Routes {
//   HOME = "/",
//   SIGN_IN = "/sign-in",
//   SIGN_UP = "/sign-up",
//   ABOUT = "/about",
// }

// @/app/routing

// import { homeRoute } from '@/pages/home';
// import { postRoute } from '@/pages/post';

// 1. Define routes
// const routes = [
//   { path: '/', route: homeRoute },
//   { path: '/posts/:postId', route: postRoute },
// ];

// 2. Create router
// const router = createHistoryRouter({
//   routes: routes,
// });

// 3. Create history
// const history = isSsr ? createMemoryHistory() : createBrowserHistory();

// 4. Attach it to router
// router.setHistory(history);

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
    route: routes.auth.signin,
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
