import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UserDetails from '../containers/users/UserDetails';
import UserListing from '../containers/users/UserListing';

class RouteComponents extends Component {

    render() {
        return (            
             <>
             <BrowserRouter>             
                    <Switch>
                        <Route exact path="/" component={UserListing} /> 
                        <Route exact path="/user/:userID" component={UserDetails} />                        
                    </Switch>             
            </BrowserRouter>
            </>
        )
    }
}

export default RouteComponents