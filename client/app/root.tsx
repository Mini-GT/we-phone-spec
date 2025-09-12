import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
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
import NotificationService from "./services/notification.service";
import { ScrollToTop } from "./components/scrollToTop";

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

  if (!isTokenValid(accessToken) && refreshToken) {
    const { newAccessToken } = await authService.refresh(refreshToken!)
    session.set("accessToken", newAccessToken)
    return redirect(currentUrl, {
      headers: {
      "Set-Cookie": await commitSession(session)
      }
    })
  }

  const userService = new UserService(accessToken)
  const smartphoneService = new SmartphoneService()
  const notificationService = new NotificationService(accessToken)
  let notifData = null
  let user = null
  try {
    if(accessToken) {
      user = await queryClient.fetchQuery({
        queryKey: queryKeysType.me,
        queryFn: async () => await userService.getMe(),
      })

      notifData = await queryClient.fetchQuery({
        queryKey: queryKeysType.notifications,
        queryFn: async () => await notificationService.getNotifications(),
      })
    }

    await queryClient.prefetchQuery({
      queryKey: queryKeysType.topDevicesByViewStats,
      queryFn: async () => await smartphoneService.getTopDevicesByViewStats(),
      staleTime: 5 * 60 * 1000,
    })

    await queryClient.prefetchQuery({
      queryKey: queryKeysType.topAllTimeViewed,
      queryFn: async () => await smartphoneService.getTopAllTimeViewedSmartphones(),
      staleTime: 5 * 60 * 1000,
    })

    await queryClient.prefetchQuery({
      queryKey: queryKeysType.topAllTimeLiked,
      queryFn: async () => await smartphoneService.getTopLikedSmartphones(),
      staleTime: 5 * 60 * 1000,
    })

    await queryClient.prefetchQuery({
      queryKey: queryKeysType.newAddedSmartphones,
      queryFn: async () => await smartphoneService.getNewAddedSmartphones(),
      staleTime: 5 * 60 * 1000,
    })
    
    
  } catch (error) {
    console.error(error)
  }
  // return { user, notifData, accessToken }
  return { user, notifData, accessToken, dehydratedState: dehydrate(queryClient) }
}

export async function action({
  request,
}: Route.ActionArgs) {
  const queryClient = new QueryClient()
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
  const currentUrl = new URL(request.url).pathname
  let formData = await request.formData()
  const logout = formData.get("logout") as string
  const markReadId = formData.get("markReadId") as string
  const loginTokens = formData.get("tokenData") as string
  const parsedLoginTokens = JSON.parse(loginTokens)

  // save the token sent from server(when user login) to session storage
  if(parsedLoginTokens !== null) {
    const { accessToken, refreshToken } = parsedLoginTokens 
    session.set("accessToken", accessToken)
    session.set("refreshToken", refreshToken)
    return redirect(currentUrl, {
      headers: {
        "Set-Cookie": await commitSession(session)
      },
    })
  }

  if(logout) {
    return redirect("/", {
      headers: [
        ["Set-Cookie", await destroySession(session)],
        [
          "Set-Cookie",
          "socketToken=; Max-Age=0"
        ]
      ]
    })
  }

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
    accessToken = newAccessToken
  }

  const notificationService = new NotificationService(accessToken)

  if(markReadId) {
    queryClient.prefetchQuery({
      queryKey: queryKeysType.markNotificationAsRead(markReadId),
      queryFn: async () => await notificationService.markNotificationAsRead(markReadId)
    })
    return data({
      headers: {
        "Set-Cookie": await commitSession(session)
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
        <ScrollToTop />
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
  const clientEnv = import.meta.env.VITE_NODE_ENV
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
      {stack && clientEnv !== "production" && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}