import { Button } from 'react-bootstrap';
import TodoItem from '../../components/todos/TodoItem';
import './style.scss';

function TodoList(props) { 
  let userTodosList = props.todoData !== undefined ? props.todoData.data : [];
  const items = userTodosList.map(function(item, index){
    return <TodoItem todo={item}  index={index} />;
  });

  let userTodosMetaData = props.todoData !== undefined ? props.todoData.meta : null;

  return (
  <div className="todo-list">
    <div className="todo-list__header">
      <h3 className="todo-list__header-title">To-do's</h3>
      <div className="todo-list__header-action">
        <Button type="button" className="icon-button add-todo-btn">
            <i className="fa fa-plus-circle"></i>
        </Button>
      </div>
    </div>

    <div className="todo-list__content">
        <ul className="todo-list__content-list">
           {items}
         </ul>
    </div>
    <div className="todo-list__footer">
      {userTodosMetaData !== null &&  userTodosList.length >= userTodosMetaData.totalCount ?
       (  <p>Showing  {userTodosMetaData.totalCount} of {userTodosMetaData.totalCount} To-do's</p>): (
        <Button variant="link">View all</Button>
       )
     }     
      
    </div>
  </div>
  );
}

export default TodoList;
