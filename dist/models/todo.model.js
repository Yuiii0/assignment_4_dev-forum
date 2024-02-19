"use strict";
//데이터 정의 관리
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TodoModel {
    static findMany() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://jsonplaceholder.typicode.com/todos";
            const todos = yield fetch(url).then((res) => res.json());
            return todos;
        });
    }
    static findUnique(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://jsonplaceholder.typicode.com/todo/${todoId}`;
            const todo = yield fetch(url).then((res) => res.json());
            return todo;
        });
    }
}
exports.default = TodoModel;
