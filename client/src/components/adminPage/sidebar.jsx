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
                <Link class="nav-link" to={`${url}/categories`}>Categories</Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Subcategories</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Courses</a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;