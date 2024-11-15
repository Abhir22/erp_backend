import axios from 'axios'
import qs from 'querystring'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import ConfigClass from '../configs'
const config = {
  //   NEXT_PUBLIC_GOOGLE_CLIENT_ID:
  //   '40371381493-jgkjo26qsn0qbrna3be9iab89mgq90do.apps.googleusercontent.com',
  // NEXT_PUBLIC_SERVER_ENDPOINT: 'http://localhost:1337',
  // NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL:
  //   'http://localhost:1337/api/sessions/oauth/google',
  //   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET : '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'
}
export async function getGoogleOAuthTokens ({code}:{code:string}) {
    // try {
    //     const url = 'https://oauth2.googleapis.com/token'
    //     const values = {
    //         code,
    //         client_id:config.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    //         client_secret: config.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    //         redirect_uri: config.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
    //         grant_type: 'authorization_code'
    //     }
    //     const res = await axios.post(url,qs.stringify(values),{
    //         headers: {
    //             "Content-Type":"application/x-www-form-urlencoded"
    //         }
    //     })
    //     return res.data
        
    // } catch (error) {
    //     console.error(error);
        
    // }

}

export function jwtDecode(token: string){
    return jwt.decode(token)
}

export function generatePasswordSalt(pass:string){
    return CryptoJS.PBKDF2(pass,ConfigClass.initialize().Salt.salt,{keySize: 8}).toString()
}

export function comparePassword(pass:string,storedPass: string){
    if(storedPass === CryptoJS.PBKDF2(pass,ConfigClass.initialize().Salt.salt,{keySize: 8}).toString()){
        return true
    }
    return false
}
