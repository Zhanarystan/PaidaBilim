import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const CourseList = (props) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        props.service.getNewestCourses()
            .then(data => {
                setCourses(data);
            });
    },[]);

    return (
        <div class="row row-cols-1 row-cols-md-4">
            {courses.map((item) => {
                return <div class="col mb-3">
                            <div class="card h-100">
                                <img src={`https://localhost:5001/${item.image}`} class="card-img-top" alt="..." style={{height:"180px"}}/>
                                <div class="card-body">
                                    <h5 class="card-title">{item.title}</h5>
                                    <p class="card-text">{item.creator.fullName}</p>
                                    <p class="card-text">${item.price}</p>
                                    <Link to={`/courses/${item.id}`}>Learn More</Link>
                                </div>
                            </div>
                        </div>
            })}
        </div>
    )

}

export default CourseList;