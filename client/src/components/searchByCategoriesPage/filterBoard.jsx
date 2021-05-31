import React,{useState, useEffect} from 'react';

const FilterBoard = (props) => {
    const {subCategories, languages} = props;

    const [subCategoryId, setSubCategoryId] = useState(0);
    const [languageId, setLanguageId] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            categoryId: props.categoryId,
            subCategoryId,
            languageId
        }
        props.filter(data);
    }
    
    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="form-group">
                        <label>Subcategory</label>
                        <select className="form-control" onChange={(e) => setSubCategoryId(e.target.value)}>
                            <option disabled selected>Select Subcategory</option>
                            {subCategories.map((item) => {
                                return <option value={item.id}>{item.subCategoryName}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Language</label>
                        <select className="form-control" onChange={(e) => setLanguageId(e.target.value)}>
                            <option disabled selected>Select Language</option>
                            {languages.map((item) => {
                                return <option value={item.id}>{item.lang}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default FilterBoard;