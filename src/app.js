import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/register';
import LandingPage from './components/LandingPage/landingPage';

class App extends Component {
    state = { 
        user: null,
     }

    componentDidMount(){
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            this.setState(user);
        }
        catch{}
    }

    render() { 
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} /> 
                    {/* ^redirect if logged in? */}
                    <Route path='/newListing' 
                    render={props => {
                        if (!this.user){
                            return <Redirect to="/" />;
                        }
                        else{
                            return <NewListing {...props} user={this.user}/>
                        }
                    }} />
                </Switch>
            </div>
         );
    }
}
 
export default App;