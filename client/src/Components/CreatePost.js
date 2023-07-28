import {React, useContext, useState} from 'react'
import UserContext from './UserContext';

function CreatePost() {

    const user = useContext(UserContext); 

    const [songError, setSongError] = useState(false)
    const [songForm, setSongForm] = useState({
        title: "",
        artist: ""
    })

    function updateSongForm(e) {
        setSongError(false)
        const target = e.target.name
        setSongForm({...songForm, [target] : e.target.value})
    }

    function searchSong(e) {
        e.preventDefault()
        //figure out how to use the spotify api for cooler app
        fetch(`https://itunes.apple.com/search?media=music&entity=song&term=${songForm.title}`)
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    const songsMatch = data.results.filter(songItem => songItem.artistName == songForm.artist);
                    const songData = songsMatch[0]
                    if (songData) {
                        const songArt = songData.artworkUrl100
                        console.log(songData)
                        console.log(songArt)
                    }
                    else {
                        setSongError(true)
                    }
                    //could match song by track id

                })
            }
            else {
                setSongError(true)
            }
        })
        setSongForm({title: "", artist: ""})
        e.target.children[1].children[1].value = ""
        e.target.children[2].children[1].value = ""

    }

    return (
        <div className='container'>
            <form className="forms" onSubmit={searchSong} >
                <h1 className="headers">Search Song</h1>
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
        </div>
    )
}
export default CreatePost;