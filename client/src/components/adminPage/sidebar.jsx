import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {
    let { path, url } = useRouteMatch();

    return(
        <div style={{
            width:"100%",
            height:"100vh",
            backgroundColor:"#403f3d"
        }}>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <Link class="nav-link" to={`/admin`}>Users</Link>
                </li>
                <li class="nav-item">
                <Link to={`${url}/categories`} class="nav-link">Categories</Link>
                </li>
                <li class="nav-item">
                    <Link to={`${url}/subcategories`} class="nav-link" href="#">Subcategories</Link>
                </li>
                <li class="nav-item">
                    <Link to={`${url}/languages`} class="nav-link" href="#">Languages</Link>
                </li>
                <li class="nav-item">
                    <Link to={`${url}/courses`} class="nav-link" href="#">Courses</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;