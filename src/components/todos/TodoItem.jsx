import {Button } from 'react-bootstrap';
import './style.scss';


function TodoItem(props) {
    const todoItem = props.todo;
  return (
    <li className="todo-list__item" key={props.index}>
        <div className="todo-list__item--content">
            <p className="todo-list__item--text">
                {todoItem.title}
            </p>
            <div className="todo-list__item--action">
                <Button type="button" className="icon-button">
                    <i className="fa fa-check"></i>
                </Button>
                <Button type="button" className="icon-button">
                    <i className="fa fa-close"></i>
                </Button>
            </div>
        </div>
    </li>
  );
}

export default TodoItem;
