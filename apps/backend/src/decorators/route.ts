import { Express, RequestHandler } from "express";

export const Route = (
  method: keyof Express,
  path: string = "",
  ...middleware: RequestHandler[]
) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const routeHandlers =
      Reflect.getMetadata("routeHandlers", target) || new Map();

    if (!routeHandlers.has(method)) {
      routeHandlers.set(method, new Map());
    }

    routeHandlers.get(method).set(path, [...middleware, descriptor.value]);

    Reflect.defineMetadata("routeHandlers", routeHandlers, target);
  };
};
