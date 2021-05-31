import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import CourseHeader from './courseHeader';
import Description from './description';
import LearningSkillsList from './learningSkillsList';
import RequirementsList from './requirementsList';

const CourseDetailsPage = (props) => {

    let {Id} = useParams();

    const [courseSubCategory, setCourseSubCategory] = useState({
        id:null,
        subCategoryName:null,
        category: {},
        categoryId: null
    });

    const [courseCreator, setCourseCreator] = useState({});
    const [courseLanguage, setCourseLanguage] = useState({});
    const [courseLearningSkills, setCourseLearningSkills] = useState([]);
    const [courseRequirements, setCourseRequirements] = useState([]);
    const [course, setCourse] = useState({});
    const [courseId, setCourseId] = useState(null);
    const [enroll, setEnroll] = useState({});
    useEffect(() => {
        props.service.getCourse(Id)
            .then((data) => {
                setCourse(data);
                setCourseId(data.id);
                setCourseSubCategory(data.subCategory);
                setCourseCreator(data.creator);
                setCourseLanguage(data.language);
                setCourseLearningSkills(data.learningSkills);
                setCourseRequirements(data.requirements);
                
            });

            
                const data = {
                    userId: localStorage.getItem('currentUser')!==null?JSON.parse(localStorage.getItem('currentUser')).id:null,
                    courseId: Id
                };
                console.log(props.courseTitle);
                props.service.addData(data, 'course/get_enrollment')
                    .then((response) => {
                        
                        setEnroll(response);
                        
                    })
            
    },[]);

    return(
        <>
            <CourseHeader courseId={courseId} 
                        courseTitle={course.title}
                        courseImage={course.image}
                        courseCreator={courseCreator}
                        coursePostedDate={course.postedDate}
                        courseLanguage={courseLanguage}
                        courseSubCategory={courseSubCategory}
                        enroll={enroll}
                        userId={props.currentUser.id}
                        service={props.service} />
            <div className="container mt-4">
                <LearningSkillsList learningSkills={courseLearningSkills}/>
                <div className="row">
                    <div className="col-5">
                        <RequirementsList requirements={courseRequirements}/>                        
                    </div>
                    <div className="col-7">
                        <Description description={course.description}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CourseDetailsPage;