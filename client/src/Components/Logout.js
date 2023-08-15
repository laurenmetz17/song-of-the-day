import {React} from 'react'
import {useNavigate} from 'react-router-dom'

function Logout({setUser, setTodayPost, setTodaySong, setPlaylists}) {

    const navigate = useNavigate()

    function handleLogout(e) {
        //logout and navigate to home page
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
            //reset states
            setUser(null)
            setPlaylists([])
            setTodayPost(null)
            setTodaySong(null)
            navigate('/todayHome')
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