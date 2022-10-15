import app from "./src/server";
import Dotenv from "dotenv";
import path from "path";

(async () => {
  Dotenv.config({ path: path.join("./.env") });
  await app.start();
})();
