import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useNavigation,
  type ActionFunctionArgs,
  type ClientActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/navbar";
import { PopupButtonProvider, usePopupButton } from "./context/popupButtonContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginRegister from "./components/loginRegister";
import { AuthProvider } from "./context/authContext";
import Footer from "./components/footer";
import NotFound from "./routes/notFound";
import AddUser from "./components/dashboard/usersManagement/addUserForm";
import { SmartphoneProvider } from "./context/smartphoneContext";
import AddDevice from "./components/cardModal";
import AddDeviceForm from "./components/dashboard/deviceManagement.tsx/addDeviceForm";
import CardModal from "./components/cardModal";
import userService from "./services/user.service";
import authService from "./services/auth.service";
import { Spinner } from "./components/spinner";
import { UserProvider } from "./context/userContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// export async function action({
//   request,
// }: ActionFunctionArgs) {
//   let formData = await request.formData()
//   const email = formData.get("email") as string
//   const password = formData.get("password") as string
//   const response = await authService.login({ email, password })
//   // console.log(response.error)
// }

export async function loader({request}: LoaderFunctionArgs) {
  const token = authService.publicRoute(request)
  
  if(!token) {
    return
  } else {
    const user = await userService.getMe(token)
    return user
  } 
}

const queryClient = new QueryClient()

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <PopupButtonProvider>
            <AuthProvider>
              <SmartphoneProvider>
                <UserProvider>
                  {children}
                </UserProvider>
              </SmartphoneProvider>
            </AuthProvider>
          </PopupButtonProvider>
        </QueryClientProvider>
        <ScrollRestoration/>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const {popupButton} = usePopupButton()
  const navigation = useNavigation()
  const isNavigating = navigation.location?.pathname === "/"

  return (
    <div>
      {isNavigating && <Spinner spinSize="w-12 h-12" />}
      {popupButton.isLoginClicked && <LoginRegister />}
      {popupButton.popup && <CardModal />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    // the error boundary component that will display an error page
    <main className="container mx-auto">
      <NotFound 
        details={details}
        message={message}
      />
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}