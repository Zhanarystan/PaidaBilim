import React from 'react';

const SuccessfullyPurchased = (props) => {

    return(
        <div>
            <h3>Congratulations! {props.courseTitle} successfully purchased</h3>
            <button className="btn btn-success">Go to course</button>
        </div>
    )
}

export default SuccessfullyPurchased;