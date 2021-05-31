import React,{useState, useEffect} from 'react';
import axios from 'axios';

const ImageUploader = (props) => {

    const [selectedFile, setSelectedFile] = useState({});
    const [selectedFileName, setSelectedFileName] = useState(null);
    const {mainPictureUrl,carId} = props;

    
    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const fileUploadHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        console.log(selectedFile.name);
        fd.append('file', selectedFile);
        axios.post(`https://localhost:5001/api/upload/upload_image/${props.courseId}`, fd)
            .then(res => {
                props.setChangeInAdminPage(res);
            });
        
    }

    return(
        <div>
            <div className="form-group">
                
                <div style={{width:"300px", height:"150px",marginTop:"30px", marginBottom:"30px"}}>
                {props.image===null?
                    <img src={`https://localhost:5001/Resources/Images/img12.jpg`} alt="pic" style={{width:"100%",height:"100%"}}/>
                    :
                    <img src={`https://localhost:5001/${props.courseImage}`} alt="pic" style={{width:"100%",height:"100%"}}/>
                }
                </div>
                
                
                
                 <form onSubmit={fileUploadHandler}>
                    <div className="form-group">
                        <input  type="file" onChange={fileSelectedHandler} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success" onClick={fileUploadHandler}>UPLOAD PICTURE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ImageUploader;