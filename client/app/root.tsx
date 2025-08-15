import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
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
import userService from "./services/user.service";
import authService from "./services/auth.service";
import { UserProvider, useUser } from "./context/userContext";
import { useEffect, useState } from "react";
import { SelectedUserProvider } from "./context/selectedUserContext";
import smartphoneService from "./services/smartphone.service";
import { queryKeysType, type Smartphone } from "./types/globals.type";

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
//   const selectedUserData = formData.get("selectedUser") as string
//   return selectedUserData 
// }

export async function loader({ request }: LoaderFunctionArgs) {
  const queryClient = new QueryClient();
  const token = authService.privateRoute(request);
  let user = null;

  try {
    if (token) {
      user = await queryClient.fetchQuery({
        queryKey: queryKeysType.me,
        queryFn: () => userService.getMe(token),
      })
    }

    const smartphonesPromise = queryClient.fetchQuery({
      queryKey: queryKeysType.smartphones,
      queryFn: () => smartphoneService.getSmartphones(),
      staleTime: 5 * 60 * 1000,
    })

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

    // prefetch each phone's details
    const smartphonesData = await smartphonesPromise;
    const phones: Smartphone[] = smartphonesData?.phones || [];

    await Promise.all(
      phones.map(phone =>
        queryClient.prefetchQuery({
          queryKey: queryKeysType.smartphone(phone._id),
          queryFn: () => smartphoneService.getSmartphoneById(phone._id),
          staleTime: 5 * 60 * 1000,
        })
      )
    );
  } catch (error) {
    console.error(error)
  }

  return { user, dehydratedState: dehydrate(queryClient) }
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
                      {children}
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
  const { user } = useLoaderData<typeof loader>()
  const { setUser } = useUser()
  // console.log(user)
  useEffect(() => {
    setUser(user)
  }, [user])

  return (
    <div>
      {/* {isNavigating && <Spinner spinSize="w-12 h-12" />} */}
      {popupButton.isLoginClicked && <LoginRegister />}
      {popupButton.popup && <CardModal />}
      <Navbar />
      <div className="lg:mx-15 md:mx-10 sm:mx-5">
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