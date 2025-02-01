import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      mongoGetAll: Document[];
      mongoGetOne: Document | undefined;
      mongoCreate: Document | undefined;
      mongoUpdate: Document | undefined;
      mongoQuery: Document[];
    }
  }
}

export const declareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.mongoGetAll = [];
  req.mongoGetOne = undefined;
  req.mongoCreate = undefined;
  req.mongoUpdate = undefined;
  req.mongoQuery = [];

  next();
};
