
import UserContext from "./UserContext";
import {useContext, useState} from 'react';
import PlaylistCard from "./PlaylistCard";

function Playlists({playlists, setPlaylists}) {

    const user = useContext(UserContext); 
    const [loading, setLoading] = useState(true)

    if (loading && user) {
        setPlaylists(user.playlists)
        setLoading(false)
    }

    function dropDown() {

        const options = user.playlists.map(playlist => (
            <option key={playlist.id}>{playlist.title}</option>
        ))

        return ( 
            <select onChange={selectPlaylist}>
                <option id="All">All</option>
                {options} 
            </select>
        )
    }

    function selectPlaylist(e) {
        if (e.target.value == "All") {
            setPlaylists(user.playlists)
        }
        else {
            const selected = user.playlists.filter(playlist => playlist.title == e.target.value)
            setPlaylists(selected)
        }
    }

    const playlistItems = playlists.map(playlist => (
        <PlaylistCard key={playlist.id} playlist={playlist}/>
    ))

    console.log(playlistItems)

    return (
        <div className="container">
            {user ? <h1>Your Playlists</h1> : <p>Log in to see your playlists.</p>}
            {user ? dropDown(): null}
            {playlistItems}
        </div>
    )
}

export default Playlists;