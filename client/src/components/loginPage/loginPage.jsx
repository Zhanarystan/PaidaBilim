import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const LoginPage = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event =>{
        event.preventDefault();
        const inputData = {email, password};
        auth(inputData);
    }

    async function auth(data){
        
        const response = await fetch("https://localhost:5001/api/account/login", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });

        if(response.status===200){
            let jwt = await response.json();
            
            props.setCookieJWT('jwt', jwt.token);
            props.setCurrentUser()
            history.push("/");
            setEmail('');
            setPassword('');
        }

    }

    return(
        <div style={{marginTop:"120px",width:"30%", marginLeft:"auto", marginRight:"auto"}}>
            <div class="card">
                <div class="card-body">
                    <h5>Login</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" 
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
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

export default LoginPage;