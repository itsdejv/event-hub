import http from "http";
import express from "express";
import "./config/logging";
import "reflect-metadata";
import { SERVER } from "./config/config";
import { loggingHandler } from "./middleware/loggingHandler";
import { corsHandler } from "./middleware/corsHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { defineRoutes } from "./modules/routes";
import MainController from "./controllers/main";
import * as mongoose from "mongoose";
import { declareHandler } from "./middleware/declareHandlers";
import EventsController from "./controllers/events";

export const app = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logging.info("Initialize Server");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  logging.info("Connect to mongoDB");
  try {
    const DATABASE_URL = process.env.DATABASE_URL || "";
    const connection = await mongoose.connect(DATABASE_URL);
    logging.info(`Connected to ${connection.connection.name} database`);
  } catch (e) {
    logging.error(e);
  }

  logging.info("Logging && Configuration");
  app.use(declareHandler);
  app.use(loggingHandler);
  app.use(corsHandler);

  logging.info("Define Controller Routing");
  defineRoutes([MainController, EventsController], app);

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
