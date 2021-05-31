import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const RegisterPage = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [validationErrors, setValidationErrors] = useState('');

    const handleSubmit = event =>{
        event.preventDefault();
        let validErrors = '';
        if(rePassword!==password){
            setValidationErrors("Passwords doesn't match");
        }
        else{
            const inputData = {email, password, fullName};
            props.service.addData(inputData,'account/register')
                .then((data) =>{
                    history.push('/login');
                })
                .catch((data) => {
                    setValidationErrors(data);
                });
        }
           
    }

    return(
        <div style={{marginTop:"120px",width:"30%", marginLeft:"auto", marginRight:"auto"}}>
            <div class="card">
                <div class="card-body">
                    <h5>Sign Up</h5>
                    {validationErrors!==''?
                    <div class="alert alert-danger" role="alert">
                        {validationErrors}
                    </div>
                    :null}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" 
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input className="form-control" 
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Password Confirmation</label>
                            <input className="form-control" 
                                    type="password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" style={{float:"right"}}>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default RegisterPage;