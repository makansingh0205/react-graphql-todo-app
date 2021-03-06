import {Button } from 'react-bootstrap';
import './style.scss';
import { DELETE_TODO , UPDATE_TODO} from '../../graphql-query/todoQueries';
import {GET_USER_DETAILS} from '../../graphql-query/userQueries';
import { useParams } from "react-router-dom";
import { useMutation } from '@apollo/client';

function TodoItem(props) {
    const params = useParams();
    const id = params.userID;

    const todoItem = props.todo;
    // delete todo from list
    const [deleteTodo] = useMutation(DELETE_TODO , {
        refetchQueries: [
          { query: GET_USER_DETAILS, variables: { id }
          }
        ]
    });

    // update the status of todo
    const [updateTodo] = useMutation(UPDATE_TODO , {
        refetchQueries: [
          { query: GET_USER_DETAILS, variables: { id }
          }
        ]
    });

  return (
    <li className="todo-list__item" key={props.index}>
        <div className="todo-list__item--content">
            <p className="todo-list__item--text">
                {todoItem.title}
            </p>
            <div className="todo-list__item--action">
                <Button type="button" className="icon-button "  onClick={e => {
                    updateTodo({ variables: { id: todoItem.id, title : todoItem.title, completed :!todoItem.completed }});
                   }}>
                    {todoItem.completed ? (
                    <i className="fa fa-check"></i>)
                    : (<i className="fa fa-check completed"></i>)
                    }
                </Button>
                <Button type="button" className="icon-button" onClick={e => {
                    deleteTodo({ variables: { id: todoItem.id} });
                   }}>
                    <i className="fa fa-close"></i>
                </Button>
            </div>
        </div>
    </li>
  );
}

export default TodoItem;
