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
import { LoginProvider, useLogin } from "./context/loginContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginRegister from "./components/loginRegister";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/authContext";
import Footer from "./components/footer";
import Unauthorized from "./routes/unauthorized";
import { AlertTriangle } from "lucide-react";

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
          <LoginProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LoginProvider>
        </QueryClientProvider>
        <ScrollRestoration/>
        <Scripts />
      </body>
    </html>
  );
}

// removes screen y-scroll when login/register form popups
function BodyStyles() {
  const { isLoginClicked } = useLogin()
  
  const overflowStyle = isLoginClicked 
    ? 'body { overflow: hidden; }'
    : 'body { overflow: auto; }'
  
  return <style>{overflowStyle}</style>
}

export default function App() {
  const {isLoginClicked} = useLogin()

  return (
    <div>
      <BodyStyles />
      {isLoginClicked && <LoginRegister />}
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
    <main className="pt-16 p-4 container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="text-red-500 w-12 h-12" />
            <h1 className="text-2xl font-semibold text-gray-800">{message}</h1>
            <p className="text-gray-600">
              {details}
            </p>
            <a
              href="/"
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
