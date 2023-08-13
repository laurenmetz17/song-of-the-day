
function SongCard({song}) {

    return (
        <div>
            <img src={song.art} alt="album cover" className="album_cover"></img>
            <p className="song_title">{song.title}</p>
            <p className="song_artist">{song.artist}</p>
        </div>
    )

}

export default SongCard;