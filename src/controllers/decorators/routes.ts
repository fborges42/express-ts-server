import "reflect-metadata";
import { verb } from "./Types";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

// factory decorators
function routeBinder(method: verb) {
  return function get(path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}

export const get = routeBinder("get");
export const put = routeBinder("put");
export const post = routeBinder("post");
export const del = routeBinder("delete");
export const patch = routeBinder("patch");
