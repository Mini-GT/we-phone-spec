import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/navbar";
import { PopupButtonProvider, usePopupButton } from "./context/popupButtonContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginRegister from "./components/loginRegister";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/authContext";
import Footer from "./components/footer";
import Unauthorized from "./routes/unauthorized";
import { AlertTriangle } from "lucide-react";
import Spinner from "./components/spinner";
import NotFound from "./routes/notFound";
import AddUser from "./components/dashboard/usersManagement/addUserForm";
import { SmartphoneProvider } from "./context/smartphoneContext";
import AddDevice from "./components/dashboard/deviceManagement.tsx/addDevice";
import PhoneSpecsForm from "./components/addDeviceForm";

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
                {children}
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

// removes screen y-scroll when login/register form popups
function BodyStyles() {
  const { popupButton } = usePopupButton()
  
  const overflowStyle = popupButton.isLoginClicked || popupButton.isAddUserClicked || popupButton.isAddDeviceClicked 
    ? 'body { overflow: hidden; }'
    : 'body { overflow: auto; }'
  
  return <style>{overflowStyle}</style>
}

export default function App() {
  const {popupButton} = usePopupButton()
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)
  
  return (
    <div>
      <BodyStyles />
      {isNavigating && <Spinner />}
      {popupButton.isLoginClicked && <LoginRegister />}
      {popupButton.isAddUserClicked && <AddUser />}
      {popupButton.isAddDeviceClicked && <AddDevice />}
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
