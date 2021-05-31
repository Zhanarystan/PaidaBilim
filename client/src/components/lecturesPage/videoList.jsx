import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const VideoList = (props) => {
    
    return(
        <div className="card">
            <div className="card-body">
                <div style={{height:"100vh", overflowY:"auto"}}>
                    <ul className="list-group list-group-flush">
                    {props.videos.map((item) => {
                                    return (<><li className={`list-group-item ${props.currentVideo===item?"active":null}`} style={{cursor:"pointer"}} 
                                                onClick={(e) => {props.setCurrentVideo(item)}}>
                                        <div className="row">
                                            <div className="col-1">
                                            <FontAwesomeIcon icon={faPlay} />
                                            </div>
                                            <div className="col-11">
                                                {item.title}
                                            </div>
                                        </div>
                                        </li>
                                        </>)
                                })}
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default VideoList;