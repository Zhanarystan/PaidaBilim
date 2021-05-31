import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../userContext';
import CreatedCourses from './cratedCourses';

const MyCourses = (props) => {
    return(
        <UserContext.Consumer>
            {
                (value) => {
                    return <MyCoursesInner currentUser={value}  
                                            service={props.service}/>
                }
            }
        </UserContext.Consumer>
  )
    
}

const MyCoursesInner = (props) => {
    return(
        <>
            <div className="container mt-5">
                <CreatedCourses service={props.service} currentUser={props.currentUser}/>
            </div>
        </>
    )
}

export default MyCourses;