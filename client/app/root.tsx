import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/navbar";
import { PopupButtonProvider, usePopupButton } from "./context/popupButtonContext";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import LoginRegister from "./components/loginRegister";
import { AuthProvider } from "./context/authContext";
import Footer from "./components/footer";
import NotFound from "./routes/notFound";
import { SmartphoneProvider } from "./context/smartphoneContext";
import CardModal from "./components/cardModal";
import authService from "./services/auth.service";
import { UserProvider, useUser } from "./context/userContext";
import { useEffect, useRef, useState } from "react";
import { SelectedUserProvider } from "./context/selectedUserContext";
import { queryKeysType } from "./types/globals.type";
import { AccessTokenProvider } from "./context/accessTokenContext";
import { commitSession, destroySession, getSession } from "./session/sessions.server";
import { isTokenValid } from "./utils/tokenValidator";
import UserService from "./services/user.service";
import SmartphoneService from "./services/smartphone.service";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const session = await getSession(request.headers.get("Cookie"))
  const currentUrl = new URL(request.url).pathname
  let accessToken = session.get("accessToken")
  const refreshToken = session.get("refreshToken")

  if(refreshToken && !isTokenValid(refreshToken)) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      }
    })
  }

  if (!isTokenValid(accessToken) && isTokenValid(refreshToken)) {
    const { newAccessToken } = await authService.refresh(refreshToken!)
    session.set("accessToken", newAccessToken)
    return redirect(`${currentUrl}`, {
      headers: {
      "Set-Cookie": await commitSession(session)
      }
    })
  }
  // console.log("root:", accessToken)
  const userService = new UserService(accessToken)
  const smartphoneService = new SmartphoneService()

  if (isTokenValid(accessToken)) {
    await queryClient.fetchQuery({
      queryKey: queryKeysType.me,
      queryFn: () => userService.getMe(),
    })
  } 
    
  try {
    queryClient.prefetchQuery({
      queryKey: queryKeysType.topDevicesByViewStats,
      queryFn: () => smartphoneService.getTopDevicesByViewStats(),
      staleTime: 5 * 60 * 1000,
    })

    queryClient.prefetchQuery({
      queryKey: queryKeysType.topAllTimeViewed,
      queryFn: () => smartphoneService.getTopAllTimeViewedSmartphones("?limitNumber=5&sort=desc"),
      staleTime: 5 * 60 * 1000,
    })

    queryClient.prefetchQuery({
      queryKey: queryKeysType.topAllTimeLiked,
      queryFn: () => smartphoneService.getTopLikedSmartphones("?limitNumber=5&sort=desc"),
      staleTime: 5 * 60 * 1000,
    })

    queryClient.prefetchQuery({
      queryKey: queryKeysType.newAddedSmartphones,
      queryFn: () => smartphoneService.getNewAddedSmartphones("?limitNumber=5&sort=desc"),
      staleTime: 5 * 60 * 1000,
    })
    
  } catch (error) {
    console.error(error)
  }

  return { accessToken, refreshToken, dehydratedState: dehydrate(queryClient) }
}

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const currentUrl = new URL(request.url).pathname
  let formData = await request.formData()
  const logout = formData.get("logout") as string
  const tokens = formData.get("tokenData") as string
  const parsedTokens = JSON.parse(tokens)

  if(parsedTokens !== null) {
    const { accessToken, refreshToken } = parsedTokens 
    session.set("accessToken", accessToken)
    session.set("refreshToken", refreshToken)
    return redirect(`${currentUrl}`, {
      headers: {
        "Set-Cookie": await commitSession(session)
      },
    })
  }

  if(logout) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      }
    })
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { dehydratedState } = useLoaderData<typeof loader>()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  )
  
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
          <HydrationBoundary state={dehydratedState}>
            <PopupButtonProvider>
              <AuthProvider>
                <SmartphoneProvider>
                  <UserProvider>
                    <SelectedUserProvider>
                      <AccessTokenProvider>
                        {children}
                      </AccessTokenProvider>
                    </SelectedUserProvider>
                  </UserProvider>
                </SmartphoneProvider>
              </AuthProvider>
            </PopupButtonProvider>
          </HydrationBoundary>
        </QueryClientProvider>
        <ScrollRestoration/>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const {popupButton} = usePopupButton()
  const { accessToken } = useLoaderData<typeof loader>()
  const userService = new UserService(accessToken)
  const { setUser } = useUser()
  const { data: user } = useQuery({
    queryKey: queryKeysType.me,
    queryFn: async () => await userService.getMe(),
    enabled: !!accessToken && isTokenValid(accessToken)
  })
  const userRef = useRef(user)

  useEffect(() => {
    setUser(userRef.current)
  }, [])

  return (
    <div>
      {/* {isNavigating && <Spinner spinSize="w-12 h-12" />} */}
      {popupButton.isLoginClicked && <LoginRegister />}
      {popupButton.popup && <CardModal />}
      <div className="mx-2 xl:mx-15 lg:mx-7 md:mx-5">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
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