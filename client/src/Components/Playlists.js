import UserContext from "./UserContext";
import {useContext} from 'react';
import PlaylistCard from "./PlaylistCard";

function Playlists() {

    const user = useContext(UserContext)
    if (user) {
        console.log(user.playlists)
    }

    return (
        <div className="container">
            {user ? <p>user playlists</p> : <p>Log in to see your playlists.</p>}
            <PlaylistCard/>
        </div>
    )
}

export default Playlists;