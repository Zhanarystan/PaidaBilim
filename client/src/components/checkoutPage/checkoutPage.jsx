import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import DataFilling from './dataFilling';
import SuccessfullyPurchased from './successfullyPurchased';


const CheckoutPage = (props) => {
    let {Id} = useParams();
    const [course, setCourse] = useState({});

    const [responseCourse, setResponseCourse] = useState({});

    useEffect(() => {
        props.service.getCourse(Id)
            .then((data) => {
                setCourse(data);
            });
        
    },[]);

    

    return(
        <div className="container mt-5">
            {responseCourse.id===undefined?
            <DataFilling setResponseCourse={setResponseCourse}
                         currentUser={props.currentUser}
                         courseId={course.id}
                         coursePrice={course.price}
                         courseTitle={course.title}
                         service={props.service}/>
            :<SuccessfullyPurchased courseTitle={responseCourse.title}/>}
        </div>
    )
}

export default CheckoutPage;