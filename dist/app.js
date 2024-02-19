"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const context_1 = __importDefault(require("./context"));
const authenticator_middleware_1 = __importDefault(require("./middlewares/authenticator.middleware"));
require("./prisma/client.prisma");
const app = (0, express_1.default)();
const port = 5050;
const jsonParser = body_parser_1.default.json();
app.use(authenticator_middleware_1.default);
app.use(jsonParser);
app.use(context_1.default);
// app.use((_: Error, __: Request, res: Response, ___: NextFunction) => {
//   res.json(400);
// });
app.listen(port, () => {
    console.log(`listening ${port}`);
});
