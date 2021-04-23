import React,{useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import CreateUpdateCategoryPage from './../createUpdateCategoryPage/createUpdateCategoryPage';
import LearningSkillsComponent from './learningSkillsComponent';
import RequirementsComponent from './requirementsComponent';

const CreateUpdateCoursePage = (props) => {
    let history = useHistory();
    let {Id} = useParams();
    const [title, setTitle] = useState("Create Course");

    const [learningSkills, setLearningSkills] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [change, setChange] = useState(null);

    const [creator, setCreator] = useState({});
    const [language, setLanguage] = useState({});
    const [creatorId, setCreatorId] = useState(null); //only in creating
    const [languageId, setLanguageId] = useState(null);

    const [users, setUsers] = useState([]);
    const [languages,setLanguages] = useState([]);


    const [studentAmount, setStudentAmount] = useState(null);
    const [courseTitle,setCourseTitle] = useState(null);
    const [courseId,setCourseId] = useState(null);
    const [coursePrice, setCoursePrice] = useState(null);
    const [courseImage, setCourseImage] = useState(null);
    const [courseDescription, setCourseDescription] = useState(null);
  

    useEffect(() => {
        props.service.getAllLanguages()
                .then((data) => {
                    setLanguages(data);
                });
        if(props.mode==="edit"){
            props.service.getCourse(Id)
                .then((data) => {
                    setCourseId(data.id);
                    setCourseTitle(data.title);
                    setCoursePrice(data.price);
                    setCourseImage(data.image);
                    setCreator(data.creator);
                    setLanguage(data.language);
                    setStudentAmount(data.studentAmount);
                    setCourseDescription(data.description);
                    setLearningSkills(data.learningSkills);
                    setRequirements(data.requirements);
                });
                setTitle("Edit Course");
            }
        else{
            props.service.getAllUsers()
                .then((data) => {
                    setUsers(data);
                });
        }
        },[change])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("testse");
        console.log(languageId);
        if(props.mode==='edit'){
            const data = {
                id:courseId,
                title:courseTitle,
                image:courseImage,
                price:coursePrice,
                studentAmount: studentAmount,
                creator,
                creatorId: creator["id"],
                language,
                languageId: language["id"],
                learningSkills,
                requirements,
                description:courseDescription
                };
            props.service.addData(data, 'course/update')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        else{
            const data = {
                title:courseTitle,
                image:courseImage,
                price:coursePrice,
                creatorId,
                languageId,
                learningSkills,
                requirements,
                description:courseDescription
                };
            props.service.addData(data, 'course/create')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        
        history.push('/admin/courses');
    }

    const handleDelete = () => {
        props.service.addData(courseId, `course/delete/${courseId}`)
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        history.push('/admin/courses');
    }

    const handleDescriptionChange = (e) => {
        console.log(e.target.value);
        setCourseDescription(e.target.value);
    }

    

    return(
        <div className="container mt-5">
            <h1>{title}</h1>
            <div className="row">
                <div className="col-7">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                className="form-control"
                                type="text"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}    
                            />
                        </div>
                        
                        <div className="form-group">
                        <label>Creator Id</label>
                        {props.mode==="edit"?<>
                            
                            <input className="form-control" value={creator["userName"]} disabled />
                            </>:
                            <>
                            <input className="form-control" list="found_users" onChange={(e) => {
                                setCreatorId(e.target.value);
                            }} />
                            <datalist id="found_users" >
                                {users.map((user) => {
                                    return <option value={user.id}>{user.userName}</option>
                                })}
                            </datalist>
                            </>
                            }
                        </div>
                        <div className="form-group">
                            <label>Language</label>
                            <select className="form-control"
                                defaultValue={languageId}
                                onChange={(e) => setLanguageId(e.target.value)}
                            >
                                {props.mode==="edit"?
                                <option value={language.id} selected>{language.lang}</option>
                                :<option selected disabled>Choose language</option>
                                }
                                {languages.map((l) => {
                                    if(l.id === language.id){
                                        return;
                                    }
                                    return <option value={l.id}>{l.lang}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input 
                                className="form-control"
                                type="number"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}    
                            />
                        </div>
                        <div className="form-group">
                            {props.mode==="edit"?
                            <div style={{width:"300px", height:"150px",marginTop:"30px", marginBottom:"30px"}}>
                                <img src={courseImage} style={{width: "100%"}} alt="igm" />
                            </div>
                            :null}
                            <label>Image</label>
                            <input 
                                className="form-control"
                                type="text"
                                value={courseImage}
                                onChange={(e) => setCourseImage(e.target.value)}    
                            />
                        </div>
                        {props.mode==="edit"?
                        <div className="form-group">
                            <label>Student Amount: {studentAmount}</label>
                        </div>:null}
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                style={{height:"200px"}}
                                className="form-control"
                                value={courseDescription}
                                onChange={handleDescriptionChange}/>
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
                    <Link to="/admin/courses" >Back to list</Link>
                </div>
                {props.mode==="edit"?
                <div className="col-5">
                    <LearningSkillsComponent service={props.service}
                                            learningSkills={learningSkills} 
                                            setChange={setChange}
                                            courseId={Id} />
                                            <br/><br/>
                    <RequirementsComponent service={props.service}
                                            requirements={requirements} 
                                            setChange={setChange}
                                            courseId={Id} />
                </div>
                :null}
            </div>
        </div>
    )
}

export default CreateUpdateCoursePage;