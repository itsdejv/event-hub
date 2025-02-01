import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";

export const MongoGetAll =
  (model: Model<any>) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        req.mongoGetAll = await model.find();
      } catch (e) {
        console.error(e);
        return res.status(500).json(e);
      }

      return originalMethod.call(this, req, res, next);
    };
  };
