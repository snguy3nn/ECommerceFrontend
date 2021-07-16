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
//BUT since NavBar is on App component, NavBar does NOT re-render on login. Requires refresh to pass new 'user' prop and render accordingly.
//Likewise, logging OUT does NOT trigger re-render of LandingPage. Requires refresh after logout in order to show appropriate landing page.

//**Just redirect all logged-out users to a login page with a link to register!!** Avoids conditional rendering for logged in/out

export default function App(){

    const [user, setUser] = useState(null);

   useEffect(() => {getToken()}, []);

    const getToken = () => {
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            setUser(user);
            }
        catch{} 
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <div>
            <NavBar user={user} logout={logout}/>
            <Switch>
                <Route path="/" exact render={(props) => (<LandingPage {...props} user={user}/>)} />
                <Route path="/login" render={(props) => (<Login {...props} getToken={getToken}/>)} />
                <Route path="/register" component={Register} />
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