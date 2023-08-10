
function SongCard({song}) {

    return (
        <div>
            <img src={song.art} alt="album cover"></img>
            <p>{song.title}</p>
            <p>{song.artist}</p>
        </div>
    )

}

export default SongCard;