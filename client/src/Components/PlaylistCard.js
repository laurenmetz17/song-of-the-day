import SongCard from "./SongCard";

function PlaylistCard({playlist}) {

    console.log(playlist.songs)

    const songItems = playlist.songs.map(song => (
        <SongCard key={song.id} song={song}/>

    ))

    

    return (
        <div>
            <h3>{playlist.title}</h3>
            {songItems}
        </div>
       
    )
}

export default PlaylistCard;