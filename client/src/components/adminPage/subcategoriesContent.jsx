import React,{useState,useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';

const SubcategoriesContent = ({getData, changeInAdminPage}) => {
    const [subcategories, setSubcategories] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setSubcategories(data);
        })
    },[changeInAdminPage])

    return(
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Subcategories</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/admin/subcategories/create') }>
                    ADD NEW
                </button>
            </div>
            <div style={{marginTop:"20px"}}>
            <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Subcategory</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {subcategories.map((subcategory) => {
                            return (
                                <tr>
                                    <th scope="row">{subcategory.id}</th>
                                    <td>{subcategory.subCategoryName}</td>
                                    <td>{subcategory.category.categoryName}</td>
                                    <td><Link to={`/admin/subcategories/${subcategory.id}`}>Details</Link></td>
                                </tr>
                            )
                        } )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubcategoriesContent;