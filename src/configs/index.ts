import 'dotenv/config'
export default class ConfigClass {

  private static _instance: ConfigClass;
  private constructor() {}

  public static initialize() {
    if (!this._instance) {
      this._instance = new ConfigClass();
    }
    return this._instance;
  }

  get ServerInfo(){
    return {PORT: process.env.PORT}
  }

  get MongoConfigDetails(){
    return { mongo_uri: process.env.mongo_uri ?? '', mongo_db_name : process.env.mongo_db_name ?? ''}
  }
  
  get ConfigDetails(){
    return {privateKey : process.env.privateKey ?? 'your_private_key_here', pubicKey : process.env.publicKey ?? ''}
  }

  get Salt(){
    return {salt:process.env.salt ?? ''}
  }

 
}
