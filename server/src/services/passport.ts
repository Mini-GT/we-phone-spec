import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcryptjs"
import prisma from "@/prismaClient"
import type { User } from '@prisma/client'

passport.use(new LocalStrategy({
  usernameField: "email", 
  passwordField: "password" 
}, 
async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return done(null, false, { message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect email or password" });
    }

    return done(null, user);
  } catch (error) {
    done(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, (user as User).id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id } 
    })

    if (!user) {
      return done(new Error("User not found"));
    }

    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport;