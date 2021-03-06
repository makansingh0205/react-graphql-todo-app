import gql from 'graphql-tag';

export const GET_USER_LIST = gql `
query UsersPage {
    users {
     data {
        id
        name
        username
        email
        address {
            city
        }
        company {
            name
        }
        phone
        website
        }
    }    
  }
`

export const GET_USER_DETAILS = gql`
  query User($id: ID!) {
    user(id: $id) {
        id
        name
        username
        email
        website,
        phone
        address {
          street
          suite
          city
          zipcode
        }
      todos(options:{paginate:{ page : 1, limit:20}}) {
        data {
          id
          title
          completed
        }
        meta {
          totalCount
        }
      }
    }
  }
`;