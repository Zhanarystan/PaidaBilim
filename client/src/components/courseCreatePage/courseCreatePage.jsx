import React,{useState, useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import UserContext from '../userContext';
import ImageUploader from './imageUploader';
import LearningSkillsComponent from './learningSkillsComponent';
import RequirementsComponent from './requirementsComponent';
import VideoList from './videoList';

const CourseCreatePage = (props) => {
    return(
        <UserContext.Consumer>
            {
                (value) => {
                    return <CourseCreate currentUser={value.email} service={props.service} mode={props.mode} 
                                         setChangeInAdminPage={props.setChangeInAdminPage}/>
                }
            }
        </UserContext.Consumer>
  )
}

const CourseCreate = (props) => {
    let history = useHistory();
    let {Id} = useParams();
    const [title, setTitle] = useState("Create Course");

    const [learningSkills, setLearningSkills] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [videos, setVideos] = useState([]);
    const [change, setChange] = useState(null);

    const [creator, setCreator] = useState();
    const [language, setLanguage] = useState({});
    const [category, setCategory] = useState({});
    const [subCategory, setSubCategory] = useState({});
    const [creatorId, setCreatorId] = useState(null); //only in creating
    const [languageId, setLanguageId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [subCategoryId, setSubCategoryId] = useState(null);

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
                props.service.getUserByEmail(props.currentUser)
                .then((data) => {
                    
                    setCreator(data);
                    setCreatorId(data.id);
                });
        if(props.mode==="edit"){
            props.service.getCourse(Id)
                .then((data) => {
                    setCourseId(data.id);
                    setCourseTitle(data.title);
                    setCoursePrice(data.price);
                    setCourseImage(data.image);
                    setCreator(data.creator);
                    setCreatorId(data.creatorId);
                    setLanguage(data.language);
                    setSubCategory(data.subCategory)
                    setStudentAmount(data.studentAmount);
                    setCourseDescription(data.description);
                    setLearningSkills(data.learningSkills);
                    setRequirements(data.requirements);
                    setVideos(data.videos);
                    console.log(data.category);
                });
                setTitle("Edit Course");
            }
        
        },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(props.mode==='edit'){
            const data = {
                id:courseId,
                title:courseTitle,
                image:courseImage,
                price:coursePrice,
                studentAmount: studentAmount,
                creator: creator,
                creatorId: creator["id"],
                language,
                languageId: language["id"],
                subCategory,
                subCategoryId: subCategory["id"],
                learningSkills,
                requirements,
                videos,
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
                videos,
                description:courseDescription
                };
            props.service.addData(data, 'course/create')
                .then((response) => {
                    props.setChangeInAdminPage(response);
                })
        }
        
        console.log(creator);
        console.log(creatorId);
        history.push('/mycourses');
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
            <h1>{props.currentUser}</h1>
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
                        {props.mode==="edit"?
                        <ImageUploader courseImage={courseImage}
                                       courseId={courseId}
                                       setChangeInAdminPage={props.setChangeInAdminPage}/>
                        :null}
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
                    <VideoList service={props.service}
                               courseId={Id}
                               videos={videos}
                               
                               />
                </div>
                :null}
            </div>
        </div>
    )
}

export default CourseCreatePage;