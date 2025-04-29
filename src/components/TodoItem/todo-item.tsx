import { TodoItemProps } from "../../store/todo-store";
import "./todo-item.css";

interface TodoItemComponentProps extends TodoItemProps {
    onTodoChecked: any;
}

export default function TodoItem(props: TodoItemComponentProps) {
    const { id, text, date, onTodoChecked, checked } = props;

    function onCheckboxClick(e) {
        onTodoChecked(id);
    }
    return (
        <div className="div-todo-item">
            <div className="div-left">
                <input type="checkbox" onChange={onCheckboxClick} checked={checked} />
                <span className={`span-text ${checked ? 'strikethrough' : ''} `}>{text}</span>
            </div>
            <span className={`span-date ${checked ? 'strikethrough' : ''} `}>{date?.toLocaleString()}</span>
        </div>
    );
}
