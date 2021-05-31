import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const CoursesContent = ({getData, changeInAdminPage}) => {
    const [courses, setCourses] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setCourses(data);
        })
    },[changeInAdminPage])

    return(
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Courses</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/admin/courses/create') }>
                    ADD NEW
                </button>
            </div>
            <div style={{marginTop:"20px"}}>
                    <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Creator</th>
                        <th scope="col">Student Amount</th>
                        <th scope="col">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => {
                            return (
                                <tr>
                                    <th scope="row">{course.id}</th>
                                    <td>{course.title}</td>
                                    <td>{course.price}$</td>
                                    <td>{course.creator.fullName}</td>
                                    <td>{course.studentAmount}</td>
                                    <td><Link to={`/admin/courses/${course.id}`}>Details</Link></td>
                                </tr>
                            )
                        } )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CoursesContent;