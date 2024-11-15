import {Collection, Document} from 'mongodb'

export interface User extends Document {
    user_name : string,
    user_email : string,
    password?: string,
    created_at: string,
    updated_at: string,
    expiry : string
}