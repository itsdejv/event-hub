import { NextFunction, Request, Response } from "express";

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);

  logging.log(error);
  res.status(404).json({ message: error.message });
  return;
};
