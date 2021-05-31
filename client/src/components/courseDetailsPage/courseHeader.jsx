import React,{useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

const CourseHeader = (props) => {
    let history = useHistory();
    
    

    const updatedDate = () => {
        let str = props.coursePostedDate+"";
        let date = str.split("T")[0];

        let dateArr = date.split("-")
        let normalFormat = `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;

        return normalFormat;
    }


    return (
        <div style={{backgroundColor:'#201c1c', padding:"30px", color:'white'}}>
            <div className="container">
                <div className="row">
                    <div className="col-8"> 
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb" style={{backgroundColor:"#201c1c"}}>
                                <li class="breadcrumb-item"><Link to="#">{props.courseSubCategory.category.categoryName}</Link></li>
                                <li class="breadcrumb-item"><Link to="#">{props.courseSubCategory.subCategoryName}</Link></li>
                            </ol>
                        </nav>
                        <h3>{props.courseTitle}</h3>
                        <br/>
                        <p>Created by <Link>{props.courseCreator.fullName}</Link></p>
                        <div className="d-flex">
                            <p style={{flexGrow:0.03}}>Last updated {updatedDate()}</p>
                            <p>Language: {props.courseLanguage.lang}</p>
                        </div>
                    </div>
                    <div className="col-4">
                        <img src={`https://localhost:5001/${props.courseImage}`} alt="img"
                            style={{width:"100%"}}
                        />
                        {props.enroll!==null?<button className="btn btn-primary mt-3" style={{width:"100%"}}
                                onClick={() => {
                                    history.push(`/lectures/${props.courseId}`);
                                }}
                            >
                            Go To Course
                        </button>:
                        <button className="btn btn-primary mt-3" style={{width:"100%"}}
                            onClick={() => {
                                history.push(`/checkout/${props.courseId}`)
                            }}
                        >PURCHASE</button>
                        }
                    </div>
                </div>
            
                
            </div>
        </div>
    )
}

export default CourseHeader;