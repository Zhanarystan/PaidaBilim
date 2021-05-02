import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const CategoriesListNavigation = (props) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        props.service.getAllCategories()
            .then((data) => {
                setCategories(data);
            });
    },[]);

    return(
        <div>
            <ul class="nav justify-content-center">
                {categories.map((item) => {
                    return <li class="nav-item">
                                <Link className="nav-link" to={`/categories/${item.id}`}>{item.categoryName}</Link>
                            </li>
                })}
                
            </ul>
        </div>
    )
}

export default CategoriesListNavigation;