import { Request, Response, NextFunction } from "express";
import { Controller } from "../decorators/controller";
import { Route } from "../decorators/route";
import { MongoGetAll } from "../decorators/mongoose/getAll";
import { Event } from "../models/event";

@Controller("/events")
class EventsController {
  @Route("get", "/")
  @MongoGetAll(Event)
  getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoGetAll);
  }

  @Route("get", "/:id")
  getOneById(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoGetOne);
  }

  @Route("post", "/")
  create(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoCreate);
  }

  @Route("post", "query/")
  query(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoQuery);
  }

  @Route("patch", "/:id")
  update(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoUpdate);
  }

  @Route("delete", "/:id")
  delete(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: "Deleted" });
  }
}

export default EventsController;
