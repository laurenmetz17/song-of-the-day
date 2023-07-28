import {React, useState, useContext} from 'react';

function Login({setUser}) {

    const [logError,setLogError] = useState(false)

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    function updateLogin(e) {
        const target = e.target.id
        setLoginForm({...loginForm, [target] : e.target.value})
        setLogError(false)
    }

    function handleLogin(e) {
        e.preventDefault();
        //post to login
        fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginForm),
        })
        .then(resp => {
            //if response okay set the user and navigate to the song of the day form
            if (resp.ok) {
                resp.json()
                .then((userInput) => {
                    console.log(userInput)
                    setUser(userInput)
                    //navigate('/songOfThePage')
                }) 
            }
            //else return unauthorized response
            else {
                
                setLogError(true)
                throw new Error(`HTTP error, status = ${resp.status}`);
            }
        })
        .catch(error => {
            console.error(error);
        })
        //reset form after submit
        setLoginForm({username: "", password: ""})
        e.target.children[1].children[1].value = ""
        e.target.children[2].children[1].value = ""
    }

    return (
        <div className='container'>
            <form id="login" className="forms" onSubmit={handleLogin}>
                <h1 className="headers">Login Here</h1>
                <div className="inputs">
                    <label>Username</label>
                    <input id="username" type="text" onChange={updateLogin}/>
                </div>
                <div className='inputs'>
                    <label>Password</label>
                    <input id="password" type="text" onChange={updateLogin}/>
                </div>
                <input id="submit" type="submit" value="Submit"/>
            </form>
            {logError ? <p style={{color: "red"}}>Invalid Username or Password</p> : null}
        </div>
    )
}

export default Login;