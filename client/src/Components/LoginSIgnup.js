import {React, useState, useContext} from 'react';

function LoginSignup() {

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })


    function updateLogin(e) {

    }

    function handleLogin(e) {

    }

    return (

        <form id="login" className="forms" onSubmit={handleLogin}>
            <h1 className="headers">Login Here</h1>
            <div>
                <label>Userame</label>
                <input id="username" type="text" onChange={updateLogin}/>
            </div>
            <div className='headers'>
                <label>Password</label>
                <input id="password" type="text" onChange={updateLogin}/>
            </div>
            <input id="submit" type="submit" value="Submit"/>
        </form>
    )
}

export default LoginSignup;