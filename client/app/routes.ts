import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("smartphones", "routes/smartphones.tsx"),
  route("mostpopular", "routes/mostPopular.tsx"),
  route("login", "routes/login.tsx"),
  route(":smartphoneName", "routes/smartphone.tsx"),
] satisfies RouteConfig;
