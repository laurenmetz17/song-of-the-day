import UserContext from "./UserContext";
import {useContext} from 'react';
import PlaylistCard from "./PlaylistCard";

function Playlists() {

    const user = useContext(UserContext)

    let playlistItems
    if (user) {
        playlistItems = user.playlists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist}/>
        ))
        console.log(user.playlists)
    }

    return (
        <div className="container">
            {user ? <h1>Your Playlists</h1> : <p>Log in to see your playlists.</p>}
            {playlistItems}
        </div>
    )
}

export default Playlists;