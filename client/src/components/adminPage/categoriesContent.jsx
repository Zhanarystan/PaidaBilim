import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const CategoriesContent = ({getData}) => {
    const [categories, setCategories] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setCategories(data);
        })
    },[])

    return(
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Categories</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/create-user') }>
                    ADD NEW
                </button>
            </div>
            
            <div style={{marginTop:"20px"}}>
            <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {categories.map((user) => {
                            return (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.categoryName}</td>
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
export default CategoriesContent;