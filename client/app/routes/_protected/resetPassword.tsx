import { useEffect, useState } from "react";
import { Form, redirect, useLoaderData, useNavigation, type ActionFunctionArgs } from "react-router";
import { email } from "~/schema/email.schema";
import z from "zod";
import type { Route } from "./+types/resetPassword";
import { isTokenValid } from "~/utils/tokenValidator";
import { passwordSchema } from "~/schema/password.schema";
import EmailService from "~/services/email.service";
import { useToggle } from "~/hooks/useToggle";
import EmailVerificationModal from "~/components/emailCardModal";

const emailService = new EmailService()

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const resetToken = url.searchParams.get("token") as string
  const email = url.searchParams.get("email") as string

  if(!resetToken || !isTokenValid(resetToken)) {
    return redirect("/")
  } 

  return { email }
}

export async function action({request}: ActionFunctionArgs) { 
  const url = new URL(request.url);
  const email = url.searchParams.get("email") as string
  let formData = await request.formData()
  const passwordInput = formData.get("password") as string
  const confirmPasswordInput = formData.get("confirmPassword") as string

  const result = await passwordSchema.safeParseAsync({
    password: passwordInput,
    confirmPassword: confirmPasswordInput
  })

  if(!result.success) {
    const flattened = z.flattenError(result.error)
    return { 
      passErr: flattened.fieldErrors.password, 
      confirmErr: flattened.fieldErrors.confirmPassword 
    }
  }

  if(result.data.password !== result.data.confirmPassword) {
    return { notMatch: "Passwords don't match" }
  } else {
    const response = await emailService.resetPassword(result.data.password, result.data.confirmPassword, email)
    return { message: response.message }
  }
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
  const { email } = useLoaderData<typeof loader>() 
  const navigation = useNavigation()
  const messageModal = useToggle()
  const passErr = actionData?.passErr
  const apiMessage = actionData?.message
  const confirmErr = actionData?.confirmErr
  const notMatch = actionData?.notMatch

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {apiMessage && !messageModal.isOpen && <EmailVerificationModal message={apiMessage} details="You can now close this page" onClose={messageModal.open} />}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col mb-6 text-md font-bold text-gray-800 gap-1">
          <span>Resetting Password for:</span>
          <span className="font-normal">{email || "example@email.com"}</span>
        </div>
        <Form method="post" className="space-y-5">
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`mt-2 w-full rounded-lg border ${passErr || notMatch ? "border-red-500" : null} border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Password"
            />
            <div className="absolute text-xs text-red-500 left-1">{passErr || notMatch}</div>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password 
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`mt-2 w-full rounded-lg border ${confirmErr || notMatch ? "border-red-500" : null} border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Password"
            />
            <div className="absolute text-xs text-red-500 left-1">{confirmErr || notMatch}</div>
          </div>
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {navigation.state === "submitting" ? "Sending..." : "Reset Password"}
          </button>
        </Form> 
      </div>
    </div>
  );
}