import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

type SessionFlashData = {
  error: string;
};

const sessionSecret = process.env.SESSION_SECRET
if(!sessionSecret) throw new Error("session secret key is empty")

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        httpOnly: true,
        secrets: [sessionSecret]
      },
    },
  );

export { getSession, commitSession, destroySession };
