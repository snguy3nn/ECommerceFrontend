import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/register';

class App extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} /> 
                </Switch>
            </div>
         );
    }
}
 
export default App;