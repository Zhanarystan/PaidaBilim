import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Content ({service}) {
    let { topicId } = useParams();
  
    return(
        <div>
            <div>dasdsa</div>
            <div>{topicId}</div>
        </div>
        
    )
}

export default Content;