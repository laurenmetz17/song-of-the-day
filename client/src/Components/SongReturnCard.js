
function SongReturnCard({song, setSongReturn, setSelectedSong}) {

    function selectSong(e) {
        e.preventDefault()
        //check if song already exists first
        fetch(`songs/${song.title}/${song.artist}`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => { 
                    //reset song retrun and set selected song
                    setSongReturn([])
                    setSelectedSong(data)
                })
            }
            else {
                //if song doesn't exist create it
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
                                //reset song return and set selected song
                                setSongReturn([])
                                setSelectedSong(newSong)
                            })
                        }
                        else {
                            console.log(resp)
                        }
                    });
            }
        })

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