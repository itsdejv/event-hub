import http from "http";
import express from "express";
import "./config/logging";
import { SERVER } from "./config/config";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logging.info("Initialize Server");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  logging.info("Logging && Configuration");
  app.use(loggingHandler);
  app.use(corsHandler);

  logging.info("Define Controller Routing");

  logging.info("Define Controller Routing");
  app.use(routeNotFound);

  logging.info("Start Server");
  httpServer = http.createServer(app);
  httpServer.listen(SERVER.SERVER_PORT, () => {
    logging.info(
      `Server is running at ${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`,
    );
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
