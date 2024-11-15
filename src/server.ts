import App from "./app";
import AuthRoutes from "./routes/auth.routes";
import MongoClientClass from "./databases/mongo/setup";
// import { findOne, insertOne } from "./databases/mongo/method";
async function startServer() {
  try {
    await MongoClientClass.initialize().initializeMongoConnection();

    const app = new App([new AuthRoutes()]);
    await app.listen();
  } catch (error) {
    console.log(`Errored out in server ${error}`);
  }
}
startServer();
