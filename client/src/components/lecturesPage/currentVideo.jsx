import React, {useState} from 'react';
import { Player } from 'video-react';

const CurrentVideo = (props) => {
    const {title, url, posterUrl} = props.currentVideo;
    return (
        <div style={{width:"100%", height:"80wh"}}>
            <Player
                playsInline
                poster={`https://localhost:5001/${posterUrl}`}
                src={`https://localhost:5001/${url}`}
            />
            <h4 style={{marginLeft:"50px"}}>{title}</h4>
        </div>
    )
}

export default CurrentVideo;