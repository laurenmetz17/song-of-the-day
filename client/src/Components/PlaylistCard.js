//song card inpmoirt

function PlaylistCard({playlist}) {
    const songItems = playlist.songs.map(song => (
        <p>{song.title}</p>

    ))
    

    return (
        <div>
            <h3>{playlist.title}</h3>
            {songItems}
        </div>
       
    )
}

export default PlaylistCard;