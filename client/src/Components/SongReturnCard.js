
function SongReturnCard({song}) {

    function selectSong() {
        
    }
    return (
        <div className="song_return">
            <img src={song.art} alt="album cover"></img>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <button onClick={selectSong}>Select This Song</button>
        </div>

    )
}

export default SongReturnCard;