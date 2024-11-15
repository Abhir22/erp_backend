// import { Router } from "express";
// import { Routes } from "../interfaces/routes.interface";
// import { Request,Response } from "express";
// import AuthController from "../controllers/auth.controller";

// class AuthRoutes implements Routes {
//     public path = ''
//     public router: Router = Router()
//     public authController = new AuthController();
//     constructor(){
//         this.initializeRoutes()
//     }

//     private async initializeRoutes(){
//         console.log(this.path)
//         this.router.get(`${this.path}/sessions/oauth/google`,this.authController.googleOauth)
//         this.router.post(`${this.path}/signUp`,this.authController.signUp)
//         this.router.post(`${this.path}/signIn`,this.authController.signIn)
//     }

// }

// export default AuthRoutes



// test auth 
import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { Request, Response } from "express";
import { GoogleAuth } from "../controllers/google-auth.controller";
import passport from "passport";

class AuthRoutes implements Routes {
  public path = "/auth"; 
  public router: Router = Router();
  public googleAuthController = new GoogleAuth()
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.googleAuthController.login);
    this.router.get(`${this.path}/google`, passport.authenticate("google", { scope: ["profile", "email"] }));
    this.router.get(`${this.path}/google/callback`, this.googleAuthController.googleAuthCallback); 
    this.router.get(`${this.path}/profile`, this.googleAuthController.profile); 
    this.router.get(`${this.path}/logout`, this.googleAuthController.logout); 
  }
}

export default AuthRoutes;
