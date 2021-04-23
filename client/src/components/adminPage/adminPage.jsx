import React from 'react';
import { Switch, Route, useRouteMatch, IndexRoute } from 'react-router-dom';
import CreateUpdateUserPage from '../createUpdateUserPage';
import UsersContent from './usersContent';
import Sidebar from './sidebar';
import CategoriesContent from './categoriesContent';
import Content from './content';
import SubcategoriesContent from './subcategoriesContent';
import CoursesContent from './coursesContent';
import LanguagesContent from './languagesContent';

function AdminPage({service,changeInAdminPage}) {
    let match = useRouteMatch();
    
    return (
        <div className="row">
            <div className="col-3">
                <Sidebar/>
            </div>
                
                    {/* <Route path={`${path}/categories`} exact>
                        <div className="col-9">
                            <CategoriesContent getData={service.getAllCategories}/>
                        </div>
                    </Route> */}
                    <div className="col-9">
                    
                    <Switch>
                        <Route path={`${match.path}/categories`}>
                            <CategoriesContent getData={service.getAllCategories}
                            changeInAdminPage={changeInAdminPage} />                            
                        </Route>
                        <Route path={`${match.path}/languages`}>
                            <LanguagesContent getData={service.getAllLanguages}
                            changeInAdminPage={changeInAdminPage} />                            
                        </Route>
                        <Route path={`${match.path}/courses`}>
                            <CoursesContent getData={service.getAllCourses}
                            changeInAdminPage={changeInAdminPage} />                            
                        </Route>
                        <Route path={`${match.path}/subcategories`}>
                            <SubcategoriesContent 
                            getData={service.getAllSubCategories}
                            changeInAdminPage={changeInAdminPage} />                            
                        </Route>
                        <Route path={match.path}>
                            <UsersContent getData={service.getAllUsers} 
                            changeInAdminPage={changeInAdminPage}/>
                        </Route>
                    </Switch>
                    </div>

        </div>
    )
}

export default AdminPage;