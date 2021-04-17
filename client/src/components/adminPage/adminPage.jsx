import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateUpdateUserPage from '../createUpdateUserPage';
import UsersContent from './usersContent';
import Sidebar from './sidebar';
import CategoriesContent from './categoriesContent';
import Content from './content';

const AdminPage = ({service}) => {
    let match = useRouteMatch();
    
    return (
        <div className="row">
            <div className="col-3">
                <Sidebar/>
            </div>
                <Switch>
                    {/* <Route path={`${path}/categories`} exact>
                        <div className="col-9">
                            <CategoriesContent getData={service.getAllCategories}/>
                        </div>
                    </Route> */}
                    <div className="col-9">

                        <Route path={`${match.path}/:topicId`}>
                            <Content/>
                        </Route>
                        <Route path={`${match.path}`}>
                            <UsersContent getData={service.getAllUsers}/>
                        </Route>
                    </div>
                </Switch>
            
        </div>
    )
}

export default AdminPage;