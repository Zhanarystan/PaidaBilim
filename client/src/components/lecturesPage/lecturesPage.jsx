import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';


import VideoList from './videoList';
import CurrentVideo from './currentVideo';

const LecturesPage = (props) => {

    let {Id} = useParams();

    const [videos, setVideos] = useState([]);
    const [courseTitle, setCourseTitle] = useState(null);
    const [currentVideo, setCurrentVideo] = useState({id:null, title:null, url:null, posterUrl:null, courseId: null});
    
    useEffect(() => {
        props.service.getCourse(Id)
            .then((data) => {
                setCourseTitle(data.title);
                setVideos(data.videos);
                setCurrentVideo(data.videos[0]);
            });  
    },[]);

    return(
        <div>
            <h4>{courseTitle}</h4>
            <div className="row">
                <div className="col-8">
                    <CurrentVideo currentVideo={currentVideo} />
                </div>
                <div className="col-4">
                    <VideoList videos={videos} setCurrentVideo={setCurrentVideo} currentVideo={currentVideo} />
                </div>
            </div>
        </div>
        
    )
}

export default LecturesPage;