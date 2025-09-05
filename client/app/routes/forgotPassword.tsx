import { useEffect, useState } from "react";
import { Form, useNavigation, type ActionFunctionArgs, type MetaFunction } from "react-router";
import { email } from "~/schema/email.schema";
import z from "zod";
import type { Route } from "./+types/forgotPassword";
import EmailService from "~/services/email.service";
import EmailVerificationModal from "~/components/emailCardModal";
import { useToggle } from "~/hooks/useToggle";

export function meta({}: MetaFunction) {
  return [
    { title: "Forgot Password - WePhoneSpec" },
    { name: "description", content: "Forgot Password" },
  ];
}

const emailService = new EmailService()

export async function action({request}: ActionFunctionArgs) { 
  let formData = await request.formData()
  const emailForm = formData.get("email") as string
  const result = await email.safeParseAsync(emailForm)
  if(!result.success) {
    const flattened = z.flattenError(result.error)
    const [defaultErr, customErr] = flattened.formErrors
    return { error: customErr ?? defaultErr }
  }

  if(emailForm.trim()) {
    const res = await emailService.forgotPassword(emailForm.trim())
    return { message: res.message }
  } else {
    return { error: "Field Empty" }
  }
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  const [message, setMessage] = useState<string | null>(null)
  const navigation = useNavigation()
  const emailToggle = useToggle()
  const apiMessage = actionData?.message
  const error = actionData?.error

  useEffect(() => {
    if(!error) return
    setMessage(error)

    const timeout = setTimeout(() => {
      setMessage(null)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {apiMessage && !emailToggle.isOpen && <EmailVerificationModal message={apiMessage} onClose={emailToggle.open} />}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <Form method="post" className="space-y-5">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`mt-2 w-full rounded-lg border ${message ? "border-red-500" : null} border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="you@example.com"
            />
            <div className="absolute text-xs text-red-500 left-1">{message}</div>
          </div>
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {navigation.state === "submitting" ? "Sending..." : "Send Reset Link"}
          </button>
        </Form> 
      </div>
    </div>
  );
}
