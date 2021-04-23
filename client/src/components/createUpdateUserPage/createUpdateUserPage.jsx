import React,{useState, useEffect} from 'react';
import {Link, useHistory, Redirect} from 'react-router-dom';

const CreateUpdateUserPage = (props) => {
    const history = useHistory();
    const [title, setTitle] = useState("Create User");

    const [username, setUsername] = useState("");


    useEffect(() => {
        if(props.mode === "edit"){
            setTitle("Edit User");
        }
    },[])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {userName: username};
        props.service.addData(data, 'users/create')
            .then((response) => {
                props.setChangeInAdminPage(response);
            })
        history.push('/admin');
    }
    return(
    <>
        <div className="container mt-5">
            <h1>{title}</h1>
            <form className="mb-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" onChange={(e) => {setUsername(e.target.value)}} />
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Create User</button>
                </div>
            </form>
            {props.mode==="edit"?
            <div className="form-group">
                <button className="btn btn-danger">DELETE</button>
            </div>
            :null}
            
            
            <Link to="/admin" >Back to list</Link>
        </div>
        </>
    )
}

export default CreateUpdateUserPage;