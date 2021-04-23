import React,{useState} from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateUpdateUserPage from '../createUpdateUserPage';

import NavBar from '../navBar';
import ApiService from './../../service/service';
import AdminPage from './../adminPage/';
import CreateUpdateCategoryPage from './../createUpdateCategoryPage/createUpdateCategoryPage';
import CreateUpdateSubcategoryPage from './../createUpdateSubcategoryPage/createUpdateSubcategoryPage';
import CreateUpdateCoursePage from './../createUpdateCoursePage/createUpdateCoursePage';
import CreateUpdateLanguagePage from './../createUpdateLanguagePage/createUpdateLanguagePage';
const App = () => {

  const service = new ApiService();

  const [changeInAdminPage, setChangeInAdminPage] = useState(null);
  
  return (
    <>
        
          <NavBar/>
          <Switch>
            <Route path='/admin/languages/create' exact>
              <CreateUpdateLanguagePage mode={"create"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/languages/:Id' exact>
              <CreateUpdateLanguagePage mode={"edit"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/subcategories/create' exact>
              <CreateUpdateSubcategoryPage mode={"create"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/subcategories/:Id' exact>
              <CreateUpdateSubcategoryPage mode={"edit"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/categories/create' exact>
              <CreateUpdateCategoryPage mode={"create"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/categories/:Id' exact>
              <CreateUpdateCategoryPage mode={"edit"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/courses/create' exact>
              <CreateUpdateCoursePage mode={"create"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin/courses/:Id' exact>
              <CreateUpdateCoursePage mode={"edit"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>

            <Route path='/admin/users/create'>
              <CreateUpdateUserPage mode={"create"} service={service}
               setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/admin'>
              <AdminPage service={service} changeInAdminPage={changeInAdminPage}/>
            </Route>
            
            <Route path='/'>
              <Link to="/admin">Admin Page CRUD</Link>
            </Route>
          </Switch>    
        
    </>
  );
}

export default App;
