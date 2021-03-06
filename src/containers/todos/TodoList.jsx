import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import TodoItem from '../../components/todos/TodoItem';
import {GET_USER_DETAILS} from '../../graphql-query/userQueries';
import './style.scss';
import { useParams } from "react-router-dom";
import { useMutation } from '@apollo/client';
import {ADD_TODO} from '../../graphql-query/todoQueries';

function TodoList(props) {   
  const [toggled, toggleAddToogle] = useState(false)
  let input;
  const params = useParams();
  const id = params.userID;
  const [addTodo] = useMutation(ADD_TODO , {
    refetchQueries: [
      { query: GET_USER_DETAILS, variables: { id } }
    ]
  });

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
        <Button type="button" className="icon-button add-todo-btn"  onClick={() => toggleAddToogle(!toggled)}>
            <i className="fa fa-plus-circle"></i>
        </Button>
      </div>
    </div>

    <div className="todo-list__content">
        <ul className="todo-list__content-list">
          {toggled && 
        <li className="todo-list__item" key={props.index}>
            <div className="todo-list__item--content">
                <Form onSubmit={e => {
                  e.preventDefault();
                  addTodo({ variables: { title: input.value, completed : false } });
                  input.value = '';
                }} className="todo-list-form">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Write your to-do's here"  ref={node => {
                    input = node;
                  }} />
                  </Form.Group>
                </Form>
            </div>
        </li>
        }
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
