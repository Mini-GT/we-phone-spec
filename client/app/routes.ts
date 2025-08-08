import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("unauthorized", "routes/unauthorized.tsx"),
  route("about", "routes/about.tsx"),
  // route("mostpopular", "routes/mostPopular.tsx"),
  route("login", "routes/login.tsx"),
  route("most-viewed", "routes/mostViewed.tsx"),
  route("most-liked", "routes/mostLiked.tsx"),
  route("new-added", "routes/newAdded.tsx"),

  // Protected Routes by role and permission
  route("users", "routes/_protected/users.tsx"),

  ...prefix("devices", [
    index("routes/_protected/devices.tsx"),
    route("new", "routes/_protected/addNewDevice.tsx"),
  ]),

  ...prefix("brand-list", [
    route(":brandName", "routes/brandList.tsx"),
  ]),

  ...prefix("smartphones", [
    index("routes/smartphones.tsx"),
    route(":smartphoneData", "routes/smartphone.tsx"),
  ]),
  
  ...prefix("user", [
    route("profile", "routes/_protected/profile.tsx"),
    route("new", "routes/_protected/addNewUser.tsx"),
    route("like-list", "routes/_protected/likeList.tsx"),
    route("notification", "routes/_protected/notification.tsx"),
    route("settings", "routes/_protected/settings.tsx"),
  ]),

  route("*", "routes/notFound.tsx"),
  
] satisfies RouteConfig;
