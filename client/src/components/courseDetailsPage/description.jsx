import React,{useState, useEffect} from 'react';

const Description = (props) => {
    const [fullInfo, setFullInfo] = useState(false);

    return(
        <div class="mt-4">
            <h4>Description</h4>
                <div  style={fullInfo!==true?{height:'200px',overflowY:'hidden'}:null}>
                {props.description}                
            </div>
            <button className="btn btn-link" onClick={() => setFullInfo(!fullInfo)}>{fullInfo!==true?'More':'Less'}</button>
        </div>
    )
}

export default Description;