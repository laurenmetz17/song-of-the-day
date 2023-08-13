
function SongCard({song}) {

    return (
        <div className="song_card">
            <div className="left">
                <img src={song.art} alt="album cover" className="album_cover"></img>
            </div>
            <div className="right">
                <p className="song_title">{song.title}</p>
                <p className="song_artist">{song.artist}</p>
            </div>
        </div>
    )

}

export default SongCard;