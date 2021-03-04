import React from 'react';
import ReactDOM from 'react-dom';
// global style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./static/css/font-awesome.css";
import './index.scss';

import RouteComponents from './routes/Route';
import reportWebVitals from './reportWebVitals';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';

const httpLink = createHttpLink({
  // TODO later the url will be updated by the env variable
  uri: 'https://graphqlzero.almansi.me/api'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client} >
    <RouteComponents />
</ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
