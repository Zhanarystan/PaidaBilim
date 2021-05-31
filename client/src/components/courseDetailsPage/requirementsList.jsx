import React from 'react';

const RequirementsList = (props) => {

    return(
        <div className="mt-4">
            <h4>Requirements</h4>
            <ul>
                {props.requirements.map((item) => {
                    return <li>{item.text}</li>
                })}
            </ul>
        </div>
    )
}

export default RequirementsList;