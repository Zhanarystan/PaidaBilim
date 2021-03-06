import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const CategoriesContent = ({getData, changeInAdminPage}) => {
    const [categories, setCategories] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setCategories(data);
        })
    },[changeInAdminPage])

    return(
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Categories</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/admin/categories/create') }>
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
                        {categories.map((category) => {
                            return (
                                <tr>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.categoryName}</td>
                                    <td><Link to={`/admin/categories/${category.id}`}>Details</Link></td>
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