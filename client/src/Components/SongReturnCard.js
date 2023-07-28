
function SongReturnCard({song, setSongReturn}) {

    function selectSong(e) {
        e.preventDefault()
        //check if song already exists first

        //get all songs in the biggining useEffect then query by title artist match 

        //search for individual song in the database 

        //if not post to the backend
        console.log(song)
        fetch('songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(song),
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then((newSong) => {
                        console.log(newSong)
                        setSongReturn([])
                    })
                }
                else {
                    console.log(resp)
                }
            });

    }

    return (
        <div className="song_return">
            <img src={song.art} alt="album cover"></img>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <button song={song} onClick={selectSong}>Select This Song</button>
        </div>

    )
}

export default SongReturnCard;