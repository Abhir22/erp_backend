import { Request, Response } from "express";
import passport from "../services/google-auth.service";
import { Profile } from "passport-google-oauth20";
import { findAndUpdateuser } from "../databases/mongo/method";

export class GoogleAuth {
  googleLogin(req: Request, res: Response) {
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })(req, res);
  }

  googleAuthCallback(req: Request, res: Response) {
    passport.authenticate("google", {
      failureRedirect: "/api/auth",
      successRedirect: "/api/auth/profile",
    })(req, res);
  }

  login(req: Request, res: Response) {
    res.send("<a href='/api/auth/google'>Login with Google</a>");
  }
  async profile(req: Request, res: Response) {
    try {
      const passportSession = req.session as { passport?: { user?: Profile } };
      const googleUser = passportSession?.passport?.user;
      if (!googleUser) {
        return res.status(400).send("User not authenticated");
      }
      const email = googleUser.emails?.[0]?.value || "No email available";
      const result = await findAndUpdateuser(
        { user_email: email }, 
        {
          user_type: "Google",
          user_email: email,
          user_name: googleUser.displayName || "Anonymous",
          created_at: new Date(),
          updated_at: new Date(),
          expiry: new Date(),
        },
        "user"
      );
      if (result) {
        res.send(`Welcome ${googleUser.displayName} Your email is ${email}`);
      } else {
        res.status(500).send("Error saving pr updating user.");
      }
    } catch (error) {
      console.error("error:", error);
      res.status(500).send("Error finding user profile");
    }
}

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error logging out");
      }
      res.redirect("/api/auth");
    });
  }
}
