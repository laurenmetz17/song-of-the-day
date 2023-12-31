import { useState } from "react";
import SongCard from "./SongCard";

function PlaylistCard({playlist}) {

    const songItems = playlist.songs.map(song => (
        <SongCard key={song.id} song={song}/>
    ))

    return (
        <div className="playlist">
            <h3>{playlist.title}</h3>
            {songItems}
        </div>
    )
}

export default PlaylistCard;