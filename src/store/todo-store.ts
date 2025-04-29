import {v4 as uuidv4} from "uuid";

export type ValuePiece = Date | null;
export type Value = ValuePiece; // | [ValuePiece, ValuePiece];

export class TodoItemProps {
    id: string;
    text: string;
    date: Value;
    checked: boolean;

    constructor(text: string, date: Value) {
        this.text = text;
        this.id = uuidv4();
        this.date = date;
        this.checked = false;
    }
}

export type TodoAppState = {
    todos: TodoItemProps[];
};

export const DEFAULT_STATE: TodoAppState = {
    todos: [],
};

export enum ActionType {
    ADD_TODO,
    MARK_TODO,
}

type AddTodoAction = {
    type: ActionType.ADD_TODO;
    payload: { text: string; date: Value };
};

type RemoveTodoAction = {
    type: ActionType.MARK_TODO;
    payload: string;
};

type TodoListAction = AddTodoAction | RemoveTodoAction;

function sortTodos(a: TodoItemProps, b: TodoItemProps) {
    if (!a || !b || !a.date || !b.date) {
        return 0;
    }
    return a.date.getTime() - b.date.getTime();
}

function markTodos(todo: TodoItemProps, id: string) {
    if (todo.id === id) {
        return {
            ...todo,
            date: todo.checked ? addHours(1) : todo.date,
            checked: !todo.checked,
        };
    } else {
        return todo;
    }
}

export function addHours(hours: number): Date {
    const now = new Date();
    const result = new Date(now);
    result.setHours(now.getHours() + hours);
    return result;
}

export function todoListReducer(state: TodoAppState, action: TodoListAction) {
    switch (action.type) {
        case ActionType.ADD_TODO: {
            const {text, date} = action.payload;
            const newTodo = new TodoItemProps(text, date);
            const updatedTodos = [...state.todos, newTodo].sort(sortTodos);
            return {
                ...state,
                todos: updatedTodos,
            };
        }
        case ActionType.MARK_TODO: {
            const updatedTodosMark = state.todos.map((todo: TodoItemProps) =>
                markTodos(todo, action.payload)
            );

            return {
                ...state,
                todos: updatedTodosMark,
            };
        }
        default:
            throw new Error("Unknown action");
    }
}
