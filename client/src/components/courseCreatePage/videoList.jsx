import React, {useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Player } from 'video-react';

const VideoList = (props) => {
    const {service, videos, courseId} = props;
    const [selectedFile, setSelectedFile] = useState({});
    const [selectedFile1, setSelectedFile1] = useState({});
    const [selectedFileName, setSelectedFileName] = useState(null);

    const [title, setTitle] = useState("");
    const [percentage, setPercentage] = useState(null);

    const [modal, setModal] = useState("");
    const [displayHook, setDisplayHook] = useState("none");
    const [modalRole, setModalRole] = useState(null);

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }
    const fileSelectedHandler1 = (e) => {
        setSelectedFile1(e.target.files[0]);
    }

    const videoUploadHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        console.log(selectedFile.name);
        fd.append('file', selectedFile);
        fd.append('file1', selectedFile1);
        fd.append('title', title);
        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(percent);
                setPercentage(percent);
            }
        }
        console.log(fd);
        axios.post(`https://localhost:5001/api/upload/upload_video/${courseId}`, fd, options)
            .then(res => {
                console.log(res);
            });
        
    }
    
    
    return(
        <div>
              <div class="card mt-5">
                <div class="card-body">
                    <h4>Videos</h4>
                    <div style={{height:"250px", overflowY:"auto"}}>
                        <ul className="list-group list-group-flush">
                            {videos.map((item) => {
                                return (<><li className="list-group-item" style={{cursor:"pointer"}}>
                                    <div className="row"  data-toggle="modal" data-target={`#exampleModal${item.id}`}>
                                        <div className="col-1">
                                        <FontAwesomeIcon icon={faPlay} />
                                        </div>
                                        <div className="col-11">
                                            {item.title}
                                        </div>
                                    </div>
                                    </li>
                                    <div class="modal fade" id={`exampleModal${item.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">{item.title}</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body">
                                            
                                        <Player
                                            playsInline
                                            poster={`https://localhost:5001/${item.posterUrl}`}
                                            src={`https://localhost:5001/${item.url}`}
                                        />
                                        </div>
                                      </div>
                                    </div>
                                  </div></>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            

                <form onSubmit={videoUploadHandler}>
                    <div className="form-group">
                        <label>Upload Video</label>
                        <input  type="file" onChange={fileSelectedHandler} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Upload Poster</label>
                        <input  type="file" onChange={fileSelectedHandler1} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Video title"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={videoUploadHandler}>UPLOAD Video</button>
                    </div>
                </form>
                {(percentage!==null && percentage!==100)?
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style={{width: `${percentage}%`}} aria-valuenow={`${percentage}`} aria-valuemin="0" >{percentage}%</div>
                </div>
                :null}
                {percentage===100?
                <h3>Successfully Uploaded</h3>:null}

            </div>
            
    )
} 

export default VideoList;