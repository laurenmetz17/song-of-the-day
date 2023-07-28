import {React, useState, useContext} from 'react';

function Signup() {

    const [signupError, setSignupError] = useState(false)

    const [signupForm, setSignupForm] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: ""
    })

    function updateSignup(e) {
        const target = e.target.id
        setSignupForm({...signupForm, [target] : e.target.value})
        setSignupError(false)
    }

    function handleSignup(e) {
        
    }

    return (
        <div className='container'>
            <form id="signup" className="forms" onSubmit={handleSignup}>
                <h1 className="headers">Signup Here</h1>
                <div className="inputs">
                    <label>Name</label>
                    <input id="name" type="text" onChange={updateSignup}/>
                </div>
                <div className="inputs">
                    <label>Username</label>
                    <input id="username" type="text" onChange={updateSignup}/>
                </div>
                <div className='inputs'>
                    <label>Password</label>
                    <input id="password" type="text" onChange={updateSignup}/>
                </div>
                <div className='inputs'>
                    <label>Confirm Password</label>
                    <input id="password_confirmation" type="text" onChange={updateSignup}/>
                </div>
                <input id="submit" type="submit" value="Submit"/>
            </form>
            {signupError ? <p style={{color: "red"}}>Invalid Signup Info</p> : null}
        </div>  
    )
}
export default Signup;