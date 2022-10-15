import Hapi from "@hapi/hapi";
import hapiswagger from "hapi-swagger";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Bell from "@hapi/bell";
import Router from "./routes";

class App {
  private server!: Hapi.Server;

  private async addPlugins() {
    this.server.register({
      plugin: hapiswagger,
      options: {
        info: {
          title: "API Documentation",
          description: "API Documentation",
        },
        jsonPath: "/documentation.json",
        documentationPath: "/documentation",
        schemes: ["http", "https"],
        debug: true,
        securityDefinitions: {
          Bearer: {
            type: "apiKey",
          },
        },
      },
    });
    //@ts-ignore
    await this.server.register([Inert, Vision, Bell]);
  }

  private async initServer() {
    this.server = Hapi.server({
      port: process.env.PORT || 8000,
      address: process.env.ADDRESS,

      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });
    await this.addPlugins();

    this.server.auth.strategy("google", "bell", {
      provider: "google",
      password: "cookie_encryption_password_secure",
      isSecure: false,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET,
      location:
        `http://${process.env.ADDRESS}:${process.env.PORT}` || "localhost:8000",
    });

    //@ts-ignore
    this.server.route(Router);
  }
  public async start() {
    try {
      await this.initServer();
      await this.server.start();

      console.log(
        `Server running at  ${this.server.info.protocol}://${this.server.info.address}:${this.server.info.port} `
      );
      console.log(
        `Documentation can be accessed at  ${this.server.info.protocol}://${this.server.info.address}:${this.server.info.port}/documentation `
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default new App();
