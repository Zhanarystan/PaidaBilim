import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';

const Content = ({service}) => {
    let { topicId } = useParams();
  
    return(
        <div>{topicId}</div>
    )
}

export default Content;