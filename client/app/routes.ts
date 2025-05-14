import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  // route("mostpopular", "routes/mostPopular.tsx"),
  route("login", "routes/login.tsx"),

  ...prefix("smartphones", [
    index("routes/smartphones.tsx"),
    route(":smartphoneData", "routes/smartphone.tsx"),
  ]),
  
  ...prefix("user", [
    route("profile", "routes/profilePage.tsx"),
    route("like-list", "routes/likeList.tsx"),
    route("notification", "routes/notification.tsx"),
    route("settings", "routes/settings.tsx"),
  ])
  
] satisfies RouteConfig;
