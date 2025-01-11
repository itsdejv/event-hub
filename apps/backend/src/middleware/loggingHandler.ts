import { NextFunction, Request, Response } from "express";

export function loggingHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logging.log(
    `INCOMING - METHOD [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}]`,
  );

  res.on("finish", () =>
    logging.log(
      `OUTGOING - METHOD [${req.method}] - URL [${req.url}] - IP [${req.socket.remoteAddress}] - STATUS [${res.statusCode}]`,
    ),
  );

  next();
}
