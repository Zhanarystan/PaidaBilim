import React,{useState,useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import CreateUpdateCategoryPage from './../createUpdateCategoryPage/createUpdateCategoryPage';

const CreateUpdateSubcategoryPage = (props) => {
    let history = useHistory();
    let {Id} = useParams();
    const [title, setTitle] = useState("Create Subcategory");

    const [categories, setCategories] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [subcategoryName,setSubcategoryName] = useState(null);
    const [subcategoryId,setSubcategoryId] = useState(null);

    useEffect(() => {
        props.service.getAllCategories()
            .then((data) => {
                setCategories(data);
            });

        if(props.mode==="edit"){
            props.service.getSubcategory(Id)
                .then((data) => {
                    setSubcategoryId(data.id);
                    setSubcategoryName(data.subCategoryName);
                    setSelectedCategoryId(data.categoryId);
                });
            setTitle("Edit Subcategory");
        }
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.mode==='edit'){
            const data = {id:subcategoryId,subCategoryName:subcategoryName,categoryId:selectedCategoryId};
            props.service.addData(data, 'subcategory/update')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        else{
            const data = {subCategoryName:subcategoryName, categoryId:selectedCategoryId};
            props.service.addData(data, 'subcategory/create')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        
        history.push('/admin/subcategories');
    }

    const handleDelete = () => {
        
        props.service.addData(subcategoryId, `subcategory/delete/${subcategoryId}`)
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        history.push('/admin/subcategories');
    }

    return(
        <div className="container mt-5">
            <h1>{title}</h1>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Subcategory Name</label>
                            <input className="form-control" type="text" 
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className="form-control" value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}>
                                {props.mode==="create"?<option disabled selected>Select Category</option>:null}
                                {categories.map((category) => {
                                    return <option value={category.id}>{category.categoryName}</option>
                                })}
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">{props.mode==="edit"?"UPDATE":"CREATE"}</button>
                        </div>
                    </form>
                    {props.mode==="edit"?
                    <div className="form-group">
                        <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
                    </div>
                    :null}

                <Link to="/admin/subcategories" >Back to list</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateUpdateSubcategoryPage;