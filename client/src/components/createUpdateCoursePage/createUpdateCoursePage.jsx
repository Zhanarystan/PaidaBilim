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
    const [category, setCategory] = useState({});
    const [subCategory, setSubCategory] = useState({});
    const [creatorId, setCreatorId] = useState(null); //only in creating
    const [languageId, setLanguageId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);

    const [users, setUsers] = useState([]);
    const [languages,setLanguages] = useState([]);
    const [categories,setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);


    const [studentAmount, setStudentAmount] = useState(null);
    const [courseTitle,setCourseTitle] = useState(null);
    const [courseId,setCourseId] = useState(null);
    const [coursePrice, setCoursePrice] = useState(null);
    const [courseImage, setCourseImage] = useState(null);
    const [courseDescription, setCourseDescription] = useState(null);
    const [subcategoryFieldDisabled, setSubcategoryFieldDisabled] = useState(true);

    useEffect(() => {
        props.service.getAllLanguages()
                .then((data) => {
                    setLanguages(data);
                });
        props.service.getAllCategories()
                .then((data) => {
                    setCategories(data);
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
                    setSubCategory(data.subCategory)
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
        console.log(creatorId);
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
                subCategory,
                subCategoryId: subCategory["id"],
                learningSkills,
                requirements,
                description:courseDescription
                };
                console.log(data);
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
                subCategoryId,
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

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        
        props.service.getSubCategoriesByCategory(e.target.value)
            .then((data) => {
                setSubcategories(data);
            });

        setSubcategoryFieldDisabled(false);
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
                            
                            <input className="form-control" value={creator["email"]} disabled />
                            </>:
                            <>
                            <select className="form-control"  onChange={(e) => {
                                setCreatorId(e.target.value)}}>
                                    <option selected disabled>Select user</option>
                                {users.map((user) => {
                                    return <option value={user.id}>{user.email}</option>
                                })}
                            </select>
                            </>
                            }
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className="form-control"
                                defaultValue={categoryId}
                                onChange={handleCategoryChange}
                            >
                                {props.mode==="edit"?
                                <option value={category.id} selected>{category.categoryName}</option>
                                :<option selected disabled>Choose Category</option>
                                }
                                {categories.map((item) => {
                                    if(item.id === category.id){
                                        return;
                                    }
                                    return <option value={item.id}>{item.categoryName}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                        <label>Subcategory</label>
                            <select className="form-control"
                            defaultValue={subCategoryId}
                            disabled={subcategoryFieldDisabled} 
                                onChange={(e) => setSubCategoryId(e.target.value)}
                            >
                                {props.mode==="edit"?
                                <option value={subCategory.id} selected>{subCategory.subCategoryName}</option>
                                :<option selected disabled>Choose model</option>
                                }
                                {subcategories.map((item) => {
                                    if(subCategory.id===item.id){
                                        return;
                                    }
                                    return <option value={item.id}>{item.subCategoryName}</option>
                                })}
                            </select>
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
                                <img src={courseImage} style={{width: "100%", height:"100%"}} alt="igm" />
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