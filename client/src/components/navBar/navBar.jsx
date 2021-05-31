import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../userContext';

const NavBar = (props) => {
    return(
        <UserContext.Consumer>
            {
                (value) => {
                    return <Nav currentUser={value}  
                    setCurrentUser={props.setCurrentUser}/>
                }
            }
        </UserContext.Consumer>
  )
}

const Nav = ({currentUser, removeCookieJWT, setCurrentUser}) => {
    let history =  useHistory();

    const Online = () => {
    
        return(
            <>
                <Link to='/mycourses' color='inherit' class="nav-link">{currentUser.email}</Link>
                <Link href='#' color='inherit' class="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('currentUser');
                  setCurrentUser({id:null,email:null,token:null});
                  history.push("/");
                  }}
                >Logout</Link>
            </>
        )
      }
    
      const Offline = () => {
        return(
            <>
                <Link to='/login' color='inherit' class="nav-link">Login</Link>
                <Link to='/register' color='inherit' class="nav-link">Registration</Link>
            </>
        )
      }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">PaidaBilim</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="about_us">About Us</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Models
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/admin/users">Users</Link>
                    <Link className="dropdown-item" to="/admin/categories">Categories</Link>
                    <Link className="dropdown-item" to="/admin/subcategories">Subcategories</Link>
                    <Link className="dropdown-item" to="/admin/languages">Languages</Link>
                    <Link className="dropdown-item" to="/admin/courses">Courses</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">Something else here</Link>
                    </div>
                </li>
                
                </ul>
                {currentUser.email!==null?<Online/>:<Offline/>}
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar;