export default class TodoModel {
    static findMany(): Promise<Todo[]>;
    static findUnique(todoId: number): Promise<Todo>;
}
type Todo = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};
export {};
//# sourceMappingURL=todo.model.d.ts.map