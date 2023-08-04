import UserContext from "./UserContext";
import {useContext} from 'react';

function Playlists() {

    //doesnt currently have songs nested in returned object 

    const user = useContext(UserContext)
    if (user) {
        console.log(user.playlists)
        console.log(user.songs)
        console.log(user.posts)
    }

    return (
        <div className="container">
            {user ? <p>user playlists</p> : <p>Log in to see your playlists.</p>}
        </div>
    )
}

export default Playlists;