/* eslint-disable @typescript-eslint/no-empty-object-type */

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

export const routes = {
  home: createRoute(),
  about: createRoute(),
  auth: {
    signin: createRoute(),
    signup: createRoute(),
  },
  private: {
    posts: createRoute(),
    post: createRoute(),
    messanger: createRoute(),
    profile: createRoute(),
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
  {
    path: "/posts",
    route: routes.private.posts,
  },
  {
    path: "/posts/:postId",
    route: routes.private.post,
  },
  {
    path: "/messanger",
    route: routes.private.messanger,
  },
  {
    path: "/profile",
    route: routes.private.profile,
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
