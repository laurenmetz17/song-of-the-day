//import useNavigate from 'react-router-dom';
//issue with react-router-dom

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
            //navigate('/login')
        })
    }

    return (
        <div id="logout">
            <h1>See you later!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;