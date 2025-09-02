import { redirect, type LoaderFunctionArgs } from "react-router";
import { commitSession, getSession } from "~/session/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"))
  const accessToken = url.searchParams.get("accessToken")
  const refreshToken = url.searchParams.get("refreshToken")

  if(!refreshToken || !accessToken) {
    return redirect("/")
  }

  session.set("accessToken", accessToken)
  session.set("refreshToken", refreshToken)

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}