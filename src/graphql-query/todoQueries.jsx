import gql from 'graphql-tag';

export const ADD_TODO = gql`
  mutation Todo($title: String! $completed: Boolean!) {
  createTodo(input:{ title: $title, completed: $completed }) {
    title
    id
    completed
    user {
      id
    }
  }
}
`;
export const DELETE_TODO = gql`
  mutation Todo($id : ID!) {
    deleteTodo(id : $id)
  }
`;

export const UPDATE_TODO = gql`
  mutation Todo($id : ID!, $title : String!, $completed: Boolean!) {
    updateTodo(id : $id, input:{title : $title, completed: $completed}) {
      id
      title
      completed
    }
  }
`;


