import {useContext} from 'react'
//import {useNavigate} from 'react-router-dom'
//issue with useNavigate here but works in other components

function Logout({setUser}) {

    //const navigate = useNavigate()

    function handleLogout(e) {
        e.preventDefault();

        fetch('logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(null), 
        })
        .then(resp => {
            console.log(resp)
        })
        .then(() => {
            setUser(null)
        })
        //navigate('/todayHome')
    }

    return (
        <div id="logout">
            <h1>See you later!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;