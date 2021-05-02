import React,{useState} from 'react';

const Banner = () => {

    return(
        <div style={{height:"300px"}}>
            <img src={process.env.PUBLIC_URL + '/images/banner1.png'} alt="banner"
                style={{width:"100%", height:"100%"}}
                />
        </div>
    )
}

export default Banner;