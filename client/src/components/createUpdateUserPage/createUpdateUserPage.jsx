import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const CreateUpdateUserPage = (props) => {

    const [title, setTitle] = useState("Create User");

    const [username, setUsername] = useState("");


    useEffect(() => {
        if(props.mode === "edit"){
            //todo
        }
    },[])
    
    return(
        <div className="container mt-5">
            <h1>{title}</h1>
            <form className="mb-5">
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" onChange />
                </div>
            </form>

            <p style={{color:'red'}}>Delete</p>
            <Link to="/admin-users">Back to list</Link>
        </div>
    )
}

export default CreateUpdateUserPage;