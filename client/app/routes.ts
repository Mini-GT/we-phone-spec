import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("unauthorized", "routes/unauthorized.tsx"),
  route("about", "routes/about.tsx"),
  // route("mostpopular", "routes/mostPopular.tsx"),
  route("login", "routes/login.tsx"),

  ...prefix("brand-list", [
    route(":brandName", "routes/brandList.tsx"),
  ]),

  ...prefix("smartphones", [
    index("routes/smartphones.tsx"),
    route(":smartphoneData", "routes/smartphone.tsx"),
  ]),
  
  ...prefix("user", [
    route("profile", "routes/_protected/profile.tsx"),
    route("like-list", "routes/_protected/likeList.tsx"),
    route("notification", "routes/_protected/notification.tsx"),
    route("settings", "routes/_protected/settings.tsx"),
  ])
  
] satisfies RouteConfig;
