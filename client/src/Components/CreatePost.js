import {React, useContext, useState} from 'react'
import UserContext from './UserContext';
import SongReturnCard from './SongReturnCard';

function CreatePost() {

    const user = useContext(UserContext); 

    const [songError, setSongError] = useState(false)
    const [songReturn, setSongReturn] = useState([])
    const [selectedSong, setSelectedSong] = useState(null)
    const [songForm, setSongForm] = useState({
        title: "",
        artist: ""
    })
    const [postForm, setPostForm] = useState({
        song_id: "",
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
                    const songsMatch = data.results.filter(songItem => songItem.artistName == songForm.artist);
                    const songData = songsMatch[0]
                    if (songData) {
                        const songArt = songData.artworkUrl100
                        console.log(songData)
                        console.log(songArt)
                        songForm.art = songArt
                        setSongReturn([...songReturn, songForm])
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
        setSongForm({title: "", artist: ""})
        e.target.children[2].children[1].value = ""
        e.target.children[3].children[1].value = ""
    }

    function updatePostForm(e) {
        const target = e.target.name
        setPostForm({...postForm, [target] : e.target.value, "song_id": selectedSong.id})
    }
    
    function submitPost(e) {
        e.preventDefault()
        //post to posts
    }

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