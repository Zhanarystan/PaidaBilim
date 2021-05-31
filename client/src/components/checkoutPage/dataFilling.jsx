import React from 'react';

const DataFilling = (props) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: props.currentUser.id,
            courseId: props.courseId,
            price: props.coursePrice
        };

        console.log(data);
        props.service.addData(data, 'course/enroll_course')
            .then((data) => {
                props.setResponseCourse(data);
            });
    }

    return(
        <div className="row">
                <div className="col-8">
                <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Name on the card" />
        </div>
        <div className="row">
            <div className="col-6">
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Number on the card"/>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Expiration date"/>
                </div>
            </div>
            <div className="col-3">
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="CVV"/>
                </div>
            </div>
        </div>
        <div className="d-flex">
            <div style={{flexGrow:1}}> 
                <button className="btn btn-outline-primary" >Back</button>
            </div>
            
            <button className="btn btn-success" type="submit">Purchase</button>
        </div>
        </form>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            Purchasement summary
                        </div>
                        <div className="card-body">
                            <p>Course: {props.courseTitle}</p>
                            <p>Price: {props.coursePrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        
    )

}

export default DataFilling;