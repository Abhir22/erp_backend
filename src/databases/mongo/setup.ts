import { MongoClient, ServerApiVersion } from "mongodb";
import ConfigClass from "../../configs";

export default class MongoClientClass {
  uri: string =""
  private client!: MongoClient;
  private static mongoClient: MongoClientClass;
  private readonly configs = ConfigClass.initialize()
  private constructor() {

  }

  public static initialize() {
    if (!this.mongoClient) {
      this.mongoClient = new MongoClientClass();
    }
    return this.mongoClient;
  }

  public async initializeMongoConnection() {
    try {
        let {mongo_uri} = this.configs.MongoConfigDetails
        this.client = new MongoClient(mongo_uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      // Connect the client to the server
      await this.client.connect();

      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your db. You successfully connected to MongoDB!"
      );
    } catch (error) {
        console.error(error)
        throw error;
    }
  }

  public collection(collection_name :string) {
    let {mongo_db_name}= this.configs.MongoConfigDetails    
    return this.client.db(mongo_db_name).collection(collection_name)
  }
}
