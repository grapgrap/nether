import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [index("./pages/home.tsx"), route("*", "./pages/post.tsx")] satisfies RouteConfig;
