import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import bcrypt from "bcryptjs"
import prisma from "@/prismaClient"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import type { User } from "@prisma/client"

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
if(!googleClientId || !googleClientSecret) throw new Error("Google client credential is missing")

passport.use(new LocalStrategy({
  usernameField: "email", 
}, 
async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.password) {
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

passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value
    const profileImage  = profile.photos?.[0]?.value
    
    // check if we have an email
    if (!email) {
      return done(new Error('Email is required from Google authentication'));
    }

    // download and save the Google profile image
    // let profileImage = null;

    // if (googleImageUrl) {
    //   const filename = `${uuidv4()}.jpg`
    //   const avatarDir = path.join(__dirname, "../public/avatars")
    //   const filepath = path.join(avatarDir, filename)

    //   // ensure avatars directory exists
    //   fs.mkdirSync(avatarDir, { recursive: true });

    //   try {
    //     const response = await axios.get(googleImageUrl, { responseType: "arraybuffer" });
    //     fs.writeFileSync(filepath, response.data)
    //     profileImage = `/avatars/${filename}`; // public path served by Express
    //   } catch (err) {
    //     if (err instanceof Error) {
    //       console.error("Failed to download profile image:", err.message);
    //     } else {
    //       console.error("Unknown error while downloading profile image:", err);
    //     }
    //   }
    // }

    // find a user with the Google ID
    let user = await prisma.user.findUnique({ 
      where: { googleId: profile.id } 
    });
    
    // if no user found with Google ID, try to find by email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (user) {
        // update existing user with Google ID
        user = await prisma.user.update({
          where: { id: user.id },
          data: { 
            googleId: profile.id,
            profileImage,
          }
        });
      } else {
        // create new user with Google account info
        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            name: profile.displayName ?? "Google User",
            email,
            profileImage,
            role: "USER",
          }
        });
      }
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