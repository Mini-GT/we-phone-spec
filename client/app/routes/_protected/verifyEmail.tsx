import { data, redirect, useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import authService from "~/services/auth.service";
import EmailService from "~/services/email.service";
import { commitSession, destroySession, getSession } from "~/session/sessions.server";
import { isTokenValid } from "~/utils/tokenValidator";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import type { AxiosResponse } from "axios";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"))
  let accessToken = session.get("accessToken")
  let refreshToken = session.get("refreshToken")
  const verifyToken = url.searchParams.get("verifyToken")
  const hasRequested =  session.get("hasRequestedVerification")
  console.log(hasRequested)
  if(!refreshToken || !accessToken || !verifyToken || hasRequested) {
    return redirect("/")
  }

  if(!isTokenValid(refreshToken)) {
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

  const emailService = new EmailService(accessToken)
  let emailData = null
  if(verifyToken && !session.get("hasRequestedVerification")) {
    emailData = await emailService.verifyEmail(verifyToken)
    session.set("hasRequestedVerification", true)
  }
  return data(
    { emailData }, 
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  )
}

export default function VerifyEmail() {
  const { emailData } = useLoaderData<typeof loader>()
  const navigate = useNavigate()

  const [status] = useState<number | undefined>(emailData?.status);
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if(status === 200) {
      setMessage(`${emailData?.data.message ?? "Redirecting in 3 secs..."}`)

      const timer = setTimeout(() => {
        navigate("/")
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (status === 400) {
      setMessage(emailData?.data.error || "Invalid or expired token.");
    }

    if (status === 500) {
      setMessage("Something went wrong. Please try again later.");
    }
  }, [status, emailData])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        {status === undefined && (
          <>
            <Loader2 className="animate-spin mx-auto text-blue-500" size={48} />
            <p className="mt-4 text-gray-600">{message}</p>
          </>
        )}

        {status === 200 && (
          <>
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>
            {/* <p className="mt-2 text-sm text-gray-500">Redirecting in 3 seconds...</p> */}
          </>
        )}

        {status === 400 && (
          <>
            <XCircle className="mx-auto text-red-500" size={48} />
            <p className="mt-4 text-lg font-semibold text-red-700">{message}</p>
          </>
        )}

        {status === 500 && (
          <>
            <XCircle className="mx-auto text-red-500" size={48} />
            <p className="mt-4 text-lg font-semibold text-red-700">{message}</p>
            <button
              onClick={() => navigate("/user/profile")}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Resend Verification
            </button>
          </>
        )}
      </div>
    </div>
  )
}