import {React, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import SongReturnCard from './SongReturnCard';
import SongOfTheDayCard from './SongOfTheDayCard';

function CreatePost({setUser}) {

    //hide song select after song is selected 

    const user = useContext(UserContext); 
    const navigate = useNavigate()
    const date = new Date() //get current date for date limit

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

    function updateDate(e) {
        const dateInput = new Date(e.target.value.replaceAll('-','/')).toDateString() //get date from input replace dashes with slashes
        const playlistInput = `${dateInput.substring(4,7)}, ${dateInput.substring(11,15)}` //turn into mon, year syntax
        findPlaylist(playlistInput) //find this playlist in database or create it 
        const target = e.target.name
        setPostForm({...postForm, [target] : e.target.value, "song_id": selectedSong.id}) //update date in form 
    }

    function updatePostForm(e) {
        const target = e.target.name
        setPostForm({...postForm, [target] : e.target.value, "song_id": selectedSong.id, "playlist_id": currentPlaylist.id})
    }

    function findPlaylist(playlistInput) {
        //this creates a playlist whenever a new date is selected consider changing
        fetch(`playlists/${playlistInput}`) //find if playlist is in database already 
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(currentPlaylist => { 
                    setCurrentPlaylist(currentPlaylist) //get current playlist if yes
                    console.log(currentPlaylist)
                })
            }
            else {
                //make current playlist if no
                fetch('playlists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({title: playlistInput}),
                    })
                    .then(resp => {
                        if (resp.ok) {
                            resp.json()
                            .then((newPlaylist) => {
                                setCurrentPlaylist(newPlaylist)
                                console.log(newPlaylist)
                                //add to user object
                                const newPlaylists = [...user.playlists, newPlaylist]
                                const newUser = {...user, playlists: newPlaylists}
                                setUser(newUser)
                                //update the playlist
                                //console.log(playlists.filter(playlist => playlist.id == currentPlaylist.id))
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
        //post to posts 
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
                        //reset selected song and hide comment date form
                        setSelectedSong(null)
                        //update user post and song arrays in user
                        const newPosts = [...user.posts, newPost]
                        const newSongs = [...user.songs, selectedSong]
                        const newUser = {...user, songs: newSongs, posts: newPosts}
                        setUser(newUser)
                    })
                }
                else {
                    console.log(resp)
                }
                //reset post form and inputs
                setPostForm({ date: null,song_id: null, playlist_id: null, comment: ""})
                e.target.children[0].children[1].value=""
            });
            //navigate to song of the day page
            navigate('/todayHome')
    }

    function postedToday() {
        let todayPost = (user.posts.filter(post => post.date == date.toISOString().split('T')[0]))
        if (todayPost.length > 0) {
            return (
                <div className='container'>
                    <SongOfTheDayCard setUser={setUser}/>
                    <h1>Post for prior dates</h1>
                    <form className="forms" onSubmit={searchSong} >
                        <h1 className='headers'>Select your Song</h1>
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
                                <input name="date" type="date" max={date.toISOString().split('T')[0]} onChange={updateDate}/>
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
        else {
            return (
                <div className='container'>
                    <h1>You haven't posted Today</h1>
                    <form className="forms" onSubmit={searchSong} >
                        <h1 className='headers'>Select your Song</h1>
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
                                <input name="date" type="date" max={date.toISOString().split('T')[0]} onChange={updateDate}/>
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
    }

    //validate date not more than present on backend

    return (
        <div className='container'>
            {user ? postedToday() : <h2>Log in to Post</h2>}
        </div>
    )
}
export default CreatePost;