import React,{useStyles, useState, useEffect} from 'react';
import Banner from './banner';
import CategoriesListNavigation from './categoriesListNavigation';
import CourseList from './courseList';
import './homePage.css';
import MyCoursesList from './myCoursesList';



const HomePage = (props) => {
    

    return(
        <div className="mt-3" style={{width:"90%",marginLeft:"auto",marginRight:"auto"}}>
            <CategoriesListNavigation service={props.service}/>
            <Banner/>
            {localStorage.getItem('currentUser')!==null?
            <>
                <h4 className="mt-5">My courses</h4>
                <MyCoursesList service={props.service}/>
            </>
            :null}
            <h4 className="mt-5">The newest courses</h4>
            <CourseList service={props.service}/>
        </div>
    )
}

export default HomePage;