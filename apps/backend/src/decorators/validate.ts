import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const Validate =
  (schema: Joi.ObjectSchema) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        await schema.validateAsync(req.body);
      } catch (e) {
        logging.log(e);

        return res.status(422).json(e);
      }
      return originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
