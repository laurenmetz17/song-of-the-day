
function SongReturnCard({song}) {
    return (
        <div className="song_return">
            <img src={song.art} alt="album cover"></img>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <button>Select This Song</button>
        </div>

    )
}

export default SongReturnCard;