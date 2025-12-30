import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./pages/home.tsx"),
  route("posts/:slug", "./pages/post.tsx"),
  route("404", "./pages/not-found.tsx"),
] satisfies RouteConfig;
