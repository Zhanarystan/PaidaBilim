import React,{useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import UserContext from '../userContext';

const ProfilePage = (props) => {

    return(
        <UserContext.Consumer>
            {
                (value) => {
                    return <Profile currentUser={value}/>
                }
            }
        </UserContext.Consumer>
  )
}

const Profile = ({currentUser}) => {
    let { url } = useRouteMatch();

    return(
        <Link to={`${url}/mycourses`}>My Courses</Link>
    )
}

export default ProfilePage;