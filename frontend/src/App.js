import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './routes/dashboard';
import Login from './routes/login';
import Register from './routes/resgister';
import { Fragment, useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  };

  //retrive JWT token from local storage and send to server for verification
  useEffect(() => {
    
    const verifyAuth = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/auth/is-verify", {
                  method: "GET",
                  headers: {
                    "content-type" : "application/json;charset=UTF-8",
                    "token" : token,
                  },
                  mode: 'cors',
              });

              const parseRes = await response.json();
              // set auth state true if server successfully verifies JWT
              if(parseRes === true){
                setAuth(true);
              }
    };
    verifyAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}/>) : (<Redirect to="/dashboard" />)} />
            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth}/>) : (<Redirect to="/dashboard" />)}/>
            <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth}/>) : (<Redirect to="/login" />)}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
