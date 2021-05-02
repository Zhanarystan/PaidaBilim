import React,{useStyles, useState, useEffect} from 'react';
import Banner from './banner';
import CategoriesListNavigation from './categoriesListNavigation';
import './homePage.css';



const HomePage = (props) => {
    

    return(
        <div className="mt-3" style={{width:"90%",marginLeft:"auto",marginRight:"auto"}}>
            <CategoriesListNavigation service={props.service}/>
            <Banner/>
        </div>
    )
}

export default HomePage;