import React,{useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const LanguagesContent = ({getData, changeInAdminPage}) => {
    const [languages, setLanguages] = useState([]);
    let history = useHistory();

    useEffect(() => {
        getData()
        .then((data) => {
          setLanguages(data);
        })
    },[changeInAdminPage])

    return(
        <div className="container mt-3">
            <div className="row">
                <h2 style={{flexGrow:"0.05"}}>Languages</h2>
                <button type='button' class="btn btn-primary" onClick={() => history.push('/admin/languages/create') }>
                    ADD NEW
                </button>
            </div>
            
            <div style={{marginTop:"20px"}}>
            <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Language</th>
                        <th scope="col">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                        {languages.map((lang) => {
                            return (
                                <tr>
                                    <th scope="row">{lang.id}</th>
                                    <td>{lang.lang}</td>
                                    <td><Link to={`/admin/languages/${lang.id}`}>Details</Link></td>
                                </tr>
                            )
                        } )}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
export default LanguagesContent;