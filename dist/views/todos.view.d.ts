/// <reference types="qs" />
import { RequestHandler } from "express";
declare const todosView: {
    getTodos: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getTodo: RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
export default todosView;
//# sourceMappingURL=todos.view.d.ts.map