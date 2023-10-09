"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
// factory decorators
function routeBinder(method) {
    return function get(path) {
        return function (target, key, desc) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", method, target, key);
        };
    };
}
exports.get = routeBinder("get");
exports.put = routeBinder("put");
exports.post = routeBinder("post");
exports.del = routeBinder("delete");
exports.patch = routeBinder("patch");
