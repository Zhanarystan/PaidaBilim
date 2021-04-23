import React,{useState,useEffect} from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

const CreateUpdateLanguagePage = (props) => {
    let history = useHistory();
    let {Id} = useParams();
    const [title, setTitle] = useState("Create Language");

    const [languageId, setLanguageId] = useState(null);
    const [languageName, setLanguageName] = useState(null);

    useEffect(() => {
        if(props.mode === "edit"){
            props.service.getLanguage(Id)
                .then((data) => {
                    setLanguageId(data.id);
                    setLanguageName(data.lang);
                });
            setTitle("Edit Language");
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.mode==='edit'){
            const data = {id:languageId,lang: languageName};
            props.service.addData(data, 'language/update')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        else{
            const data = {lang: languageName};
            props.service.addData(data, 'language/create')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        
        history.push('/admin/languages');
    }

    const handleDelete = () => {
        
        props.service.addData(languageId, `language/delete/${languageId}`)
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        history.push('/admin/languages');
    }

    return(
        <div className="container mt-5">
            <h1>{title}</h1>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Language</label>
                            <input type="text" className="form-control" 
                            value={languageName}
                            onChange={(e) => setLanguageName(e.target.value)}
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
                    <Link to="/admin/languages" >Back to list</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateUpdateLanguagePage;