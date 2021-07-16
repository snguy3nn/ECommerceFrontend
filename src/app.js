import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/login';
import Register from './components/Register/register';
import LandingPage from './components/LandingPage/landingPage';
import jwtDecode from 'jwt-decode';
import NewListing from './components/NewListing/newListing';
import NavBar from './components/NavBar/navBar';

//NOTES Friday July 16
//User login triggers redirect to LandingPage. LandingPage checks for token; renders appropriate page. 
//Since NavBar is on App component, NavBar does NOT re-render on login. Requires refresh to pass new 'user' prop and render accordingly.
//Likewise, logging OUT does NOT trigger re-render of LandingPage. Requires refresh after logout. 

export default function App(){

    const [user, setUser] = useState(null);

   useEffect(() => {
    const jwt = localStorage.getItem('token');
    try{
        const user = jwtDecode(jwt);
        setUser(user);
        }
    catch{}
    }, []);

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <div>
            <NavBar user={user} logout={logout}/>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} /> 
                {/* ^redirect if logged in? */}
                <Route 
                    path='/newListing' 
                    render={props => {
                        if (!user){
                            return <Redirect to="/" />;
                        }
                        else{
                            return <NewListing {...props} user={user}/>
                        }
                    }} />
            </Switch>
        </div>
        );
    
}