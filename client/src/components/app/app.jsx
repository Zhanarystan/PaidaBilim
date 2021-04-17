import React from 'react';
import { Link, Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import AdminPage from '../adminPage';
import NavBar from '../navBar';
import ApiService from './../../service/service';
const App = () => {

  const service = new ApiService();
  

  return (
    <>
        <Router>
          <NavBar/>
          <Switch>
            <Route path='/admin' exact>
              <AdminPage service={service}/>
            </Route>
            <Route path='/' exact>
              <Link to="/admin">Admin Page CRUD</Link>
            </Route>
          </Switch>    
        </Router>
    </>
  );
}

export default App;
