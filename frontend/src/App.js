import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './routes/dashboard';
import Login from './routes/login/login';
import Register from './routes/resgister';
import { Fragment, useState, useEffect } from 'react';
import Home from './routes/home/home';
import Product from './routes/product/product';
import Cart from './routes/cart/cart';
import Orders from './routes/orders/orders';
import OrderDetail from './routes/orderDetail/orderDetail';
import Terms from "./routes/terms/terms";
import About from "./routes/about/about";
import Returns from "./routes/returns/returns";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');

  //retrive JWT token from local storage and send to server for verification
  const verifyAuth = async (/*user*/) => {
    try {
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
    } catch (err) {
      console.error(err.message);
    }
    
  };
  useEffect(() => {
    verifyAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className="appContainer">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />

            <Route exact path="/home" render={props => (<Home {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment} verifyAuth={verifyAuth}/>) } />

            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>) : (<Redirect to="/Home" />)} />

            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>) : (<Redirect to="/dashboard" />)}/>

            <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>) : (<Redirect to="/login" />)}/>

            <Route exact path={`/product:id`} render={props => (<Product {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} department={department} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>)}/>

            <Route exact path={'/cart'} render={props => (<Cart {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>)}/>

            <Route exact path={"/orders"} render={props => isAuthenticated ? (<Orders {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>) : (<Redirect to="/login" />)}/>

            <Route exact path={"/orders:id"} render={props => (<OrderDetail {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment}/>) }/>

            <Route exact path="/home" render={props => (<Home {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment}/>) } />

            <Route exact path="/cancelled" render={() => <Redirect to="/cart" />} />

            <Route exact path="/terms" render={props => (<Terms {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment}/>) } />

            <Route exact path="/about" render={props => (<About {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment}/>) } />

            <Route exact path="/returns" render={props => (<Returns {...props} isAuthenticated={isAuthenticated} setAuth={setAuth} searchTerm={searchTerm} setSearchTerm={setSearchTerm}department={department} setDepartment={setDepartment}/>) } />

          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
