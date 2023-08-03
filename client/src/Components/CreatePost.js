import {React, useContext, useEffect, useState} from 'react'
import UserContext from './UserContext';
import SongReturnCard from './SongReturnCard';

function CreatePost() {

    const user = useContext(UserContext); 
    const date = new Date() //get current date

    useEffect(() => {
        findPlaylist() //get current playlist for the month or create one if neede
    },[])

    const [songError, setSongError] = useState(false)
    const [songReturn, setSongReturn] = useState([])
    const [selectedSong, setSelectedSong] = useState(null)
    const [currentPlaylist, setCurrentPlaylist] = useState(null)
    const [songForm, setSongForm] = useState({
        title: "",
        artist: ""
    })
    const [postForm, setPostForm] = useState({
        date: null,
        song_id: "",
        playlist_id: "",
        comment: ""
    })

    const songReturnItems = songReturn.map(song => {
        return <SongReturnCard key={song.title} song={song} setSongReturn={setSongReturn} setSelectedSong={setSelectedSong}/>
    })


    function updateSongForm(e) {
        setSongError(false)
        const target = e.target.name
        setSongForm({...songForm, [target] : e.target.value})
    }

    function searchSong(e) {
        //figure out how to use the spotify api for cooler app
        e.preventDefault()
        fetch(`https://itunes.apple.com/search?media=music&entity=song&term=${songForm.title}`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    const songsMatch = data.results.filter(songItem => songItem.artistName == songForm.artist); //list of 50 songs in api find the one matching artist
                    const songData = songsMatch[0] //get first track in list if multiple song artist matches
                    if (songData) {
                        const songArt = songData.artworkUrl100 //grab the album art and add to the song form
                        songForm.art = songArt
                        setSongReturn([...songReturn, songForm]) //reset the song return 
                    }
                    else {
                        setSongError(true)
                    }
                })
            }
            else {
                setSongError(true)
            }
        })
        //reset song form
        setSongForm({title: "", artist: ""})
        e.target.children[2].children[1].value = ""
        e.target.children[3].children[1].value = ""
    }

    function updatePostForm(e) {
        const target = e.target.name
        setPostForm({...postForm, [target] : e.target.value, "song_id": selectedSong.id, "playlist_id": currentPlaylist.id})
    }

    function findPlaylist() {
        const playlist = `${date.toDateString().substring(4,7)}, ${date.getFullYear()}` //extract month, year for title 
        fetch(`playlists/${playlist}`) //find if playlist is in databae already 
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(currentPlaylist => { 
                    console.log(currentPlaylist)
                    setCurrentPlaylist(currentPlaylist) //get current playlist if yes

                })
            }
            else {
                //make current playlist if no
                fetch('playlists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title: playlist}),
                    })
                    .then(resp => {
                        if (resp.ok) {
                            resp.json()
                            .then((newPlaylist) => {
                                console.log(newPlaylist)
                                setCurrentPlaylist(newPlaylist)
                                //add to users playlists
                            })
                        }
                        else {
                            console.log(resp)
                        }
                    });
            }
        })
    }
    
    function submitPost(e) {
        e.preventDefault()
        console.log(postForm)
        fetch('posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postForm),
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then((newPost) => {
                        setSelectedSong(null)
                        console.log(newPost)
                    })
                }
                else {
                    console.log(resp)
                    setPostForm({song_id: null, playlist_id: null, comment: ""})
                }

                //reset post form and inputs
                setPostForm({ date: null,song_id: null, playlist_id: null, comment: ""})
                e.target.children[0].children[1].value=""
            });
            //navigate to song of the day page
    }

    //if song of the day already selected show your song of the day and post for prior dates
    //add date to form so that you can add songs for previous times 

    return (
        <div className='container'>
            <form className="forms" onSubmit={searchSong} >
                <h1 className='headers'>Select your Song of the Day</h1>
                <h3 className="headers">Search Song</h3>
                <div className="inputs">
                    <label>Title</label>
                    <input name="title" type="text" onChange={updateSongForm}/>
                </div>
                <div className='inputs'>
                    <label>Artist</label>
                    <input name="artist" type="text" onChange={updateSongForm}/>
                </div>
                <input type="submit" value="Search Song"/>
            </form>
            {songError ? <p style={{color: "red"}}>Invalid Song</p> : null}
            {songReturnItems}
            {selectedSong? 
                <div className='container'>
                    <div className='selected_song'>
                        <h4>Selected Song:</h4>
                        <p>{selectedSong.title} by {selectedSong.artist}</p>
                    </div>
                    <div className="inputs">
                        <label>Date :</label>
                        <input name="date" type="date" max={date.toISOString().split('T')[0]} onChange={updatePostForm}/>
                    </div>
                    <form className='forms' onSubmit={submitPost}>
                        <div className="inputs">
                            <label>Comment :</label>
                            <input name="comment" type="text" onChange={updatePostForm}/>
                        </div>
                        <input type="submit" value="Post Song"/>
                    </form>
                </div>
            : null}
        </div>
    )
}
export default CreatePost;