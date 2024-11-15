import { Request, Response, NextFunction } from "express";
import { getGoogleOAuthTokens, jwtDecode, generatePasswordSalt, comparePassword } from "../services/auth.services";
import { findAndUpdateuser, insertOne } from "../databases/mongo/method";
import { signJwt } from "../utils/jwt.utils";
import { findOne } from "../databases/mongo/method";

class AuthController {
  public googleOauth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // try {
    //   //get the code from qs
    //   const code = req.query.code as string;
    //   //get the id and access token with code
    //   const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    //   //get user with token
    //   const googleUser: any = jwtDecode(id_token) || {};

    //   if (!googleUser && !googleUser.email_verified) {
    //     return res.status(403).send("Google account is not verified");
    //   }

    //   //upsert the user
    //   const user = await findAndUpdateuser(
    //     { user_email: googleUser.email },
    //     {
    //       user_type: "Google",
    //       user_email: googleUser.email,
    //       user_name: googleUser.name,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //       expiry: new Date(),
    //     },
    //     "user"
    //   );

    //   //create a session
    // //   const session = await createSession(
    // //     user._id,
    // //     req.get("user-agent") || ""
    // //   );

    //   //create access and refresh token
    //   const access_jwt_token = signJwt(
    //     { ...user },
    //     { expiresIn: 15 }
    //   );

    //   //set cookies
    //   res.cookie("accessToken", access_jwt_token, {
    //     maxAge: 90000,
    //     httpOnly: true,
    //     domain: "localhost",
    //     path: "/",
    //     sameSite: "lax",
    //     secure: false,
    //   });
    //   //redirect back to client
    //   res.redirect('http://localhost:4200')
    // } catch (error) {
    //   console.error(error);
    // }
  };

  public signUp = async (req:Request,res: Response,next:NextFunction)=>{
    let {user_name,user_email,password} = req.body;
    const existingUser = await findOne('user',{user_email})
    if(existingUser){
      return res.json({message: "User already exist"})
    }

    //create password hash
    password = generatePasswordSalt(password)   
    
    //update user collection
    await insertOne(
      "user",
      {
        user_type: "Custom",
        user_email: user_email,
        user_name: user_name,
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
        expiry: new Date(),
      },
    );

  }

  public signIn = async (req:Request,res: Response,next:NextFunction)=>{
    try {
      let {user_email,password} = req.body;
      const existingUser = await findOne('user',{user_email})
      if(!comparePassword(password,existingUser?.password)){
        return res.json({message: "Bad Password"})
      }
      const access_jwt_token = signJwt(
        { ...existingUser },
        { expiresIn: 15 }
      );
  
      //set cookies
      res.cookie("accessToken", access_jwt_token, {
        maxAge: 90000,
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "lax",
        secure: false,
      });
      return res.json({message: "authenticated"})
      
    } catch (error) {
      console.error(error);
      
    }


  }
}

export default AuthController;
