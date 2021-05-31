import React,{useEffect, useState} from 'react';
import {useRouteMatch, Link} from 'react-router-dom';

const CreatedCourses = (props) => {
    let { path, url } = useRouteMatch();
    const [coursesPostedByMe, setCoursesPostedByMe] = useState([]);

    useEffect(()=>{
        props.service.getMyPostedCourses(props.currentUser.email)
            .then((data) => {
                setCoursesPostedByMe(data);
            });
    },[]);
    return(
        <>
            <h4>Courses Posted By Me</h4>
            <Link to={`/mycourses/createcourse`} className="btn btn-primary">Create New</Link>
            <div class="row row-cols-1 row-cols-md-3 mt-3">
                {coursesPostedByMe.length!==0?
                coursesPostedByMe.map((item) => {
                    return <div class="col mb-4">
                                <div class="card h-100">
                                    <img src={`https://localhost:5001/${item.image}`} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">{item.title}</h5>
                                        <p class="card-text">{item.creator.fullName}</p>
                                        <Link to={`/mycourses/edit/${item.id}`}>Edit course</Link>
                                    </div>
                                </div>
                            </div>
                })
                :<h5>You didn't posted any course</h5>}
            </div>
        </>
    )
}

export default CreatedCourses;