import React,{useState} from 'react';
import {Link} from 'react-router-dom';
const CourseList = (props) => {

  

    return(
        <div>
            {props.courses!==null?props.courses.map((item) => {
                    return <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-md-3">
                      <img src={`https://localhost:5001/${item.image}`}
                         class="card-img" alt="..." 
                         style={{height:"170px"}}
                         />
                         
                      </div>
                      <div class="col-md-9">
                        <div class="card-body"  style={{height:"80%"}}>
                          <div className="d-flex">
                            <Link to={`/courses/${item.id}`} style={{flexGrow: 1}}><h5 className="card-title" >{item.title}</h5></Link>
                            <p>{item.price} KZT</p>
                          </div>
                            <p class="card-text" style={{overflowY:"hidden", height:"100px"}}>{item.description}</p>
                            
                        </div>
                        
                      </div>
                      
                    </div>
                  </div>
                }):null}
        </div>
        
    )
}

export default CourseList;