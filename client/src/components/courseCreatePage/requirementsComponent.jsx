import React,{useState} from 'react';

const RequirementsComponent = (props) => {
    const {service, requirements, courseId} = props;
    const [requirementText, setRequirementText] = useState("");
    
    const handleAdding = () => {
        const data = {text:requirementText, courseId};
        service.addData(data,'course/create_requirement')
            .then((data) => {
                setRequirementText("");
            });
      }

    return(
        <div>
              <div class="card">
                <div class="card-body">
                    <h4>Requirements</h4>
                    <div style={{height:"250px", overflowY:"auto"}}>
                        <ul className="list-group list-group-flush">
                            {requirements.map((item) => {
                                return <li className="list-group-item">{item.text}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
                <form onSubmit={handleAdding}>
                        <div className="d-flex">
                            <textarea className="form-control" type="text" placeholder="Add new requirement... "
                                value={requirementText}
                                onChange={(e) => setRequirementText(e.target.value)}/>
                            <button className="btn btn-success" type="sumbit">+</button>
                        </div>
                </form>

            </div>
    )
}

export default RequirementsComponent;