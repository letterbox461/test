import * as Joi from "joi";

const makeResponsesDocs = (schema?: any) => ({
  "200": {
    description: "OK",
    schema,
  },
  "400": {
    description: "Ошибка в запросе клиента",
    schema: Joi.object({
      statusCode: Joi.number().description("Error code").example(400),
      error: Joi.string().description("Name of error").example("Bad request"),
      message: Joi.string()
        .description("Description of error")
        .example("Invalid request params input"),
    }),
  },
  "401": {
    description: "Ошибка авторизации",
    schema: Joi.object({
      statusCode: Joi.number().description("Error code").example(401),
      error: Joi.string()
        .description("Name of error")
        .example("Missing authentication"),
      message: Joi.string()
        .description("Description of error")
        .example("Missing authentication"),
    }),
  },
  "500": {
    description: "Внутренняя ошибка сервера",
    schema: Joi.object({
      statusCode: Joi.number().description("Error code").example(500),
      error: Joi.string()
        .description("Name of error")
        .example("Internal Server Error"),
      message: Joi.string()
        .description("Description of error")
        .example("An internal server error occurred"),
    }),
  },
  "501": {
    description: "Внутренняя ошибка сервера (не реализован функционал)",
    schema: Joi.object({
      statusCode: Joi.number().description("Error code").example(501),
      error: Joi.string()
        .description("Name of error")
        .example("Not Implemented"),
      message: Joi.string()
        .description("Description of error")
        .example(
          "Bad response: Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
        ),
    }),
  },
});

export default makeResponsesDocs;
