import React,{useState, useEffect} from 'react';

const LearningSkillsList = (props) => {

    return(
        <div class="card">
            <div class="card-body">
                <h4>What you'll learn </h4>
                <div style={{columnWidth:"400px"}}>
                    {props.learningSkills.map((item) => {
                        return <p>* {item.text}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default LearningSkillsList;