import React,{useState,useEffect} from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

const CreateUpdateCategoryPage = (props) => {
    let history = useHistory();
    let {Id } = useParams();
    const [title, setTitle] = useState("Create Category");

    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    useEffect(() => {
        if(props.mode === "edit"){
            props.service.getCategory(Id)
                .then((data) => {
                    setCategoryId(data.id);
                    setCategoryName(data.categoryName);
                });
            setTitle("Edit Category");
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.mode==='edit'){
            const data = {id:categoryId,categoryName};
            props.service.addData(data, 'category/update')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        else{
            const data = {categoryName};
            props.service.addData(data, 'category/create')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        
        history.push('/admin/categories');
    }

    const handleDelete = () => {
        
        props.service.addData(categoryId, `category/delete/${categoryId}`)
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        history.push('/admin/categories');
    }

    return(
        <div className="container mt-5">
            <h1>{title}</h1>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input type="text" className="form-control" 
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                             />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">{props.mode==="edit"?"UPDATE":"CREATE"}</button>
                        </div>
                    </form>
                    {props.mode==="edit"?
                    <div className="form-group">
                        <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
                    </div>:null}
                    <Link to="/admin/categories" >Back to list</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateUpdateCategoryPage;