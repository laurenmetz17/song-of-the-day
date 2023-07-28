import {React, useState, useContext} from 'react';

function Signup() {

    const [signupError, setSignupError] = useState(false)
    const [signupMessage, setSignupMessage] =  useState(false)

    const [signupForm, setSignupForm] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: ""
    })

    function updateSignup(e) {
        const target = e.target.name
        setSignupForm({...signupForm, [target] : e.target.value})
        setSignupError(false)
    }

    function handleSignup(e) {
        e.preventDefault();      
        fetch('users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(signupForm),
        })
        //if response okay show Now Login message
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then((newUser) => {
                    setSignupMessage(true)
                }) 
            }
            //else return unporcessable entity response and show error
            else {
                setSignupError(true)
                throw new Error(`HTTP error, status = ${resp.status}`);
            }
        })
        .catch(error => {
            console.error(error);
        })
        //reset signup form after submit
        setSignupForm({name: "", username: "", password: "", password_confirmation:""})
        e.target.children[1].children[1].value = ""
        e.target.children[2].children[1].value = ""
        e.target.children[3].children[1].value = ""
        e.target.children[4].children[1].value = ""

    }

    return (
        <div className='container'>
            <form id="signup" className="forms" onSubmit={handleSignup}>
                <h1 className="headers">Signup Here</h1>
                <div className="inputs">
                    <label>Name</label>
                    <input name="name" type="text" onChange={updateSignup}/>
                </div>
                <div className="inputs">
                    <label>Username</label>
                    <input name="username" type="text" onChange={updateSignup}/>
                </div>
                <div className='inputs'>
                    <label>Password</label>
                    <input name="password" type="text" onChange={updateSignup}/>
                </div>
                <div className='inputs'>
                    <label>Confirm Password</label>
                    <input name="password_confirmation" type="text" onChange={updateSignup}/>
                </div>
                <input name="submit" type="submit" value="Submit"/>
            </form>
            {signupError ? <p style={{color: "red"}}>Invalid Signup Info</p> : null}
            {signupMessage ? <p style={{color: "green"}}>Signup Complete! Login Above</p> : null}
        </div>  
    )
}
export default Signup;