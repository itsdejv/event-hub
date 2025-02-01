import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import Joi from "joi";
import { Validate } from "../decorators/validate";

const postHealthCheckValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

@Controller()
class MainController {
  @Route("get", "/healthcheck")
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    logging.info("Health check endpoint called");
    return res.status(200).json({ message: "Health check passed" });
  }

  @Route("post", "/healthcheck")
  @Validate(postHealthCheckValidation)
  postHealthCheck(req: Request, res: Response, next: NextFunction) {
    logging.info("Health check endpoint called");
    return res.status(200).json({ message: "Health check passed" });
  }
}

export default MainController;
