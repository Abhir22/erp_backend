import configClass from "../configs";
import jwt from "jsonwebtoken";

const {privateKey, pubicKey} = configClass.initialize().ConfigDetails


export function signJwt(object: Object,options?: jwt.SignOptions | undefined){
    return jwt.sign(object,privateKey,{
        ...(options && options),
    })
}

export function verifyJwt(token: string){
    try {
        const decoded = jwt.verify(token,pubicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error :any) {
        console.error(error);
        return {
            valid: false,
            expired: error.message  === "jwt.expired",
            decoded: null
        }
        
    }
}