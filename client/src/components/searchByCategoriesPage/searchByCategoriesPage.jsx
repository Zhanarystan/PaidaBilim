import React,{useState, useEffect} from 'react';
import FilterBoard from './filterBoard';
import {useParams} from 'react-router-dom';
import CourseList from './courseList';

const SearchByCategoriesPage = (props) => {
    let {Id} = useParams();
    const [courses, setCourses] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        props.service.getCoursesByCategory(Id)
            .then((data) => {
                setCourses(data);
            });
        
        props.service.getSubCategoriesByCategory(Id)
            .then((data) => {
                setSubCategories(data);
            });

        props.service.getAllLanguages()
            .then((data) => {
                setLanguages(data);
            });

    },[])

    const filter = (data) => {
        props.service.addData(data, 'course/filter')
            .then((data) => {
                setCourses(data);
            });
    }
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <FilterBoard subCategories={subCategories} languages={languages} categoryId={Id} filter={filter}/>
                </div>
                <div className="col-8">
                    <CourseList courses={courses}/>
                </div>
            </div>
        </div>
    )
}

export default SearchByCategoriesPage;