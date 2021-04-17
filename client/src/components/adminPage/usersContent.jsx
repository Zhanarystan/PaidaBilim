import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const UsersContent = ({getData}) => {

    const [users, setUsers] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setUsers(data);
        })
    },[])
    

    return (
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Users</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/create-user') }>
                    ADD NEW
                </button>
            </div>
            
            <div style={{marginTop:"20px"}}>
            <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.userName}</td>
                                    <td><a href="#">Details</a></td>
                                </tr>
                            )
                        } )}
                    
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default UsersContent;