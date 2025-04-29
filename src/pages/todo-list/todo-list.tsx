import {useState, useReducer, useEffect} from "react";
import TodoItem from "../../components/TodoItem/todo-item.tsx";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
    DEFAULT_STATE,
    todoListReducer,
    TodoItemProps,
    ActionType,
    Value, addHours,
} from "../../store/todo-store.ts";
import "./todo-list.css";

// Redux DevTools Extension Support
const devtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__.connect({name: "TodoStore"});

export default function TodoList() {
    const [state, dispatch] = useReducer(todoListReducer, DEFAULT_STATE);
    const [currentTodo, setCurrentTodo] = useState("");

    const [currentDeadline, setCurrentDeadline] = useState<Value>(addHours(1));

    // Sync with Redux DevTools
    useEffect(() => {
        if (devtools) {
            devtools.init(DEFAULT_STATE);
        }
    }, []);

    useEffect(() => {
        if (devtools) {
            devtools.send({type: "UPDATE"}, state);
        }
    }, [state]);

    function onInputChange(e) {
        setCurrentTodo(e.target.value);
    }

    function onAddTodoClick() {
        dispatch({
            type: ActionType.ADD_TODO,
            payload: {text: currentTodo, date: currentDeadline},
        });
        setCurrentTodo("");
        setCurrentDeadline(addHours(1));
    }

    function renderTodos(todos: TodoItemProps[], checked: boolean) {
        function onTodoChecked(id: string) {
            setTimeout(() => {
                dispatch({type: ActionType.MARK_TODO, payload: id});
            }, 500);

        }

        return todos
            .filter(function (todo) {
                return todo.checked === checked;
            })
            .map(function (todo) {
                return <TodoItem key={todo.id} {...todo} onTodoChecked={onTodoChecked}/>;
            });
    }

    function onInputKeyDown(e) {
        if (e.key === 'Enter' && currentTodo !== '') {
            e.preventDefault();
            onAddTodoClick();
        }
    }

    return (
        <div className="div-app">
            <section className="section-input">
                <input
                    onChange={onInputChange}
                    type="text"
                    className="input-item"
                    placeholder="Enter text..."
                    value={currentTodo}
                    onKeyDown={onInputKeyDown}
                />
                <DateTimePicker value={currentDeadline} onChange={setCurrentDeadline}/>
                <button disabled={currentTodo === ''} onClick={onAddTodoClick}>Add todo</button>
            </section>
            <label htmlFor={'id-unchecked-todos'}>New items</label>
            <section id={'id-unchecked-todos'} className="section-todolist">
                {renderTodos(state.todos, false)}
            </section>
            <br/>
            <label htmlFor={'id-checked-todos'}>Done items</label>
            <section id={'id-checked-todos'} className="section-todolist">
                {renderTodos(state.todos, true)}
            </section>
        </div>
    );
}
