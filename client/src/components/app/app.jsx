import React,{useState, useEffect} from 'react';
import { Link, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import CreateUpdateUserPage from '../createUpdateUserPage';
import {useCookies} from 'react-cookie';
import NavBar from '../navBar';
import ApiService from './../../service/service';
import AdminPage from './../adminPage/';
import CreateUpdateCategoryPage from './../createUpdateCategoryPage/createUpdateCategoryPage';
import CreateUpdateSubcategoryPage from './../createUpdateSubcategoryPage/createUpdateSubcategoryPage';
import CreateUpdateCoursePage from './../createUpdateCoursePage/createUpdateCoursePage';
import CreateUpdateLanguagePage from './../createUpdateLanguagePage/createUpdateLanguagePage';
import HomePage from './../homePage/homePage';
import LoginPage from '../loginPage/loginPage';
import RegisterPage from '../registerPage/registerPage';
import UserContext from '../userContext';
import {BrowserRouter as Router} from 'react-router-dom';
import ProfilePage from '../profilePage/profilePage';
import MyCourses from '../myCoursesPage/myCourses';
import CreatedCourses from '../myCoursesPage/cratedCourses';
import CourseCreatePage from '../courseCreatePage/courseCreatePage';
import CourseDetailsPage from '../courseDetailsPage/courseDetailsPage';
import CheckoutPage from '../checkoutPage/checkoutPage';
import { useContext } from 'react';
import ImageUploader from '../imageUploader/imageUploader';
import LecturesPage from '../lecturesPage/lecturesPage';
import SearchByCategoriesPage from '../searchByCategoriesPage/searchByCategoriesPage';

const App = () => {

  

  const [currentUser, setCurrentUser] = useState({id:null,email:null, token:null});
  const service = new ApiService(localStorage.getItem('currentUser')!==null?JSON.parse(localStorage.getItem('currentUser')).token:null);

  const [changeInAdminPage, setChangeInAdminPage] = useState(null);
  
  useEffect(() => {
    if(localStorage.getItem('currentUser')!==null){
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      console.log("In effect");
      console.log(JSON.parse(localStorage.getItem('currentUser')));
    }
  },[changeInAdminPage]);

  return (
    <>
        <UserContext.Provider value={currentUser}>
          <Router>
            <WrapComponents service={service} setCurrentUser={setCurrentUser} changeInAdminPage={changeInAdminPage}
                            setChangeInAdminPage={setChangeInAdminPage} currentUser={currentUser}/>
          </Router>
        </UserContext.Provider>
         
        
    </>
  );
}

const WrapComponents = ({service,setCurrentUser,changeInAdminPage, setChangeInAdminPage, currentUser}) => {
    
  
    return(
      <>
       <NavBar setCurrentUser={setCurrentUser}/>
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
            <Route path='/login' exact>
              <LoginPage setChangeInAdminPage={setChangeInAdminPage} />
            </Route>
            <Route path='/register' exact>
              <RegisterPage service={service}/>
            </Route>
            <Route path='/mycourses/edit/:Id' exact>
              <CourseCreatePage service={service} mode={"edit"} setChangeInAdminPage={setChangeInAdminPage}/>
            </Route>
            <Route path='/mycourses/createcourse' exact>
              <CourseCreatePage service={service} mode={"create"} setChangeInAdminPage={setChangeInAdminPage}/>
            </Route>
            
            <Route path='/mycourses' exact>
              <MyCourses service={service} changeInAdminPage={changeInAdminPage}/>
            </Route>
            <Route path='/profile'>
              <ProfilePage service={service}/>
            </Route>
            <Route path='/courses/:Id'>
              <CourseDetailsPage service={service} currentUser={currentUser} setChangeInAdminPage={setChangeInAdminPage}/>
            </Route>
            <Route path='/lectures/:Id' exact>
              <LecturesPage service={service} currentUser={currentUser}/>
            </Route>
            <Route path='/categories/:Id' exact>
              
              <SearchByCategoriesPage service={service} currentUser={currentUser}/>
            </Route>
            <PrivateRoute path='/checkout/:Id' exact>
                <CheckoutPage service={service} currentUser={currentUser}/>
            </PrivateRoute>
            <Route path='/' exact>
              {/* <ImageUploader setChangeInAdminPage={setChangeInAdminPage}/> */}
              <HomePage service={service}/>
            </Route>
          </Switch>    
      </>
    )
}



const PrivateRoute = ({children, ...rest}) => {
  return(
    <UserContext.Consumer>
        {
            (value) => {
                return <Route
                {...rest}
                render={({location}) => 
                value.email!==null?(
                  children
                ):(
                  <Redirect
                    to = {{
                      pathname:"/login",
                      state: {from:location}
                    }}
                  />
                )
              } 
              />
            }
        }
    </UserContext.Consumer>
)
  
}

export default App;
