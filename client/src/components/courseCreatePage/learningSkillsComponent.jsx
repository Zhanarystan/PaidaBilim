import React,{useState, useEffect} from 'react';

const LearningSkillsComponent = (props) => {
    const {service, learningSkills, courseId} = props;
    const [learningSkillText, setLearningSkillText] = useState("");
    
    const handleAdding = () => {
        const data = {text:learningSkillText, courseId};
        service.addData(data,'course/create_skill')
            .then((data) => {
                setLearningSkillText("");
            });
      }

    return(
        <div>
              <div class="card">
                <div class="card-body">
                    <h4>Learning Skills</h4>
                    <div style={{height:"250px", overflowY:"auto"}}>
                        <ul className="list-group list-group-flush">
                            {learningSkills.map((item) => {
                                return <li className="list-group-item">{item.text}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <form onSubmit={handleAdding}>
                <div className="d-flex">
                    <textarea className="form-control" type="text" placeholder="Add new skill... "
                        value={learningSkillText}
                        onChange={(e) => setLearningSkillText(e.target.value)}/>
                    <button className="btn btn-success" type="submit">+</button>
                </div>
            </form>
        </div>
    )
}

export default LearningSkillsComponent;