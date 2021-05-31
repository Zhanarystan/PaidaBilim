
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Player } from 'video-react';
const ImageUploader = (props) => {

    
    const [selectedFile, setSelectedFile] = useState({});
    const [selectedFileName, setSelectedFileName] = useState(null);
    const {mainPictureUrl,carId} = props;

    const [title, setTitle] = useState("");
    const [percentage, setPercentage] = useState(null);
    
    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        console.log(selectedFile.name);
        fd.append('file', selectedFile);
        axios.post(`https://localhost:5001/api/upload/upload_image/3`, fd)
            .then(res => {
                console.log(res);
                props.setChangeInAdminPage(res);
            });
        
    }

    const videoUploadHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        console.log(selectedFile.name);
        fd.append('file', selectedFile);
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
        axios.post(`https://localhost:5001/api/upload/upload_video/100`, fd, options)
            .then(res => {
                console.log(res);
                props.setChangeInAdminPage(res);
            });
        
    }
    return( 
        <div>
            <div className="form-group">
                <img src={`https://localhost:5001/Resources/Images/img12.jpg`} alt="pic" style={{width:"60%",height:"200px"}}/>
                <div style={{width:"400px", height:"300px"}}>

                <Player
                    playsInline
                    poster="/assets/poster.png"
                    src={`https://localhost:5001/Resources/Images/WIN_20210522_15_44_07_Pro.mp4`}
                    />
                </div>
                
                
            </div>
            <form onSubmit={fileUploadHandler}>
                <div className="form-group">
                    <input  type="file" onChange={fileSelectedHandler} />
                </div>
                <div className="form-group">
                    <button className="btn btn-success" onClick={fileUploadHandler}>UPLOAD MAIN PICTURE</button>
                </div>
            </form>

            <form onSubmit={videoUploadHandler}>
                <div className="form-group">
                    <input  type="file" onChange={fileSelectedHandler} />
                </div>
                <div className="form-group">
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
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

export default ImageUploader;