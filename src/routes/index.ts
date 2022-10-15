import Joi from "joi";
import controllerTest from "../controllers/test-controller";
import controllerAuth from "../controllers/auth-controller";
import makeResponsesDocs from "./validators/_http";

export default [
  {
    method: "GET",
    path: "/test",
    options: {
      description: "Получить Hello World",
      handler: controllerTest.test,
      tags: ["api", "test"],
      plugins: {
        "hapi-swagger": {
          responses: {
            200: {
              description: "Hello World",
            },
            400: { description: "Bad Request" },
          },
        },
      },
    },
  },
  {
    method: "GET",
    path: "/auth/google",
    options: {
      auth: {
        strategy: "google",
        mode: "try",
      },
      handler: controllerAuth.googleAuth,
      tags: ["api", "Auth"],
      plugins: {
        "hapi-swagger": {
          responses: makeResponsesDocs(
            Joi.object({
              provider: Joi.string().example("google"),
              token: Joi.string()
                .description("access token")
                .example("ya29.a0Aa4xrXNy..."),
              expiresIn: Joi.number()
                .description("Время действия токена")
                .example(3600),
              profile: Joi.object({
                id: Joi.string()
                  .description("ID пользователя")
                  .example("11111"),
                displayName: Joi.string()
                  .description("Отображаемое имя")
                  .example("Ivan Ivanov"),
                name: Joi.object({
                  given_name: Joi.string().description("Имя").example("Ivan"),
                  family_name: Joi.string()
                    .description("Фамилия")
                    .example("Ivanov"),
                }),
                email: Joi.string().example("ivan.ivanov@gmail.com"),
                raw: Joi.object({
                  sub: Joi.string()
                    .description("ID пользователя")
                    .example("11111"),
                  name: Joi.string()
                    .description("Отображаемое имя")
                    .example("Ivan Ivanov"),
                  given_name: Joi.string().description("Имя").example("Ivan"),
                  family_name: Joi.string()
                    .description("Фамилия")
                    .example("Ivanov"),
                  picture: Joi.string()
                    .description("Ссылка на картинку")
                    .example("https:123.googleusercontent.com/456"),
                  email: Joi.string().example("ivan.ivanov@gmail.com"),
                  email_verified: Joi.boolean().example("true"),
                  locale: Joi.string().example("ru"),
                }),
              }),
            })
          ),
        },
      },
    },
  },
];
