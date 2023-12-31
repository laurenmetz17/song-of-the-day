import {React, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import SongReturnCard from './SongReturnCard';
import SongOfTheDayCard from './SongOfTheDayCard';

function CreatePost({setUser, setPlaylists, playlists, todayPost, todaySong, setTodayPost, setTodaySong}) {

    //load in the todaypost
    useEffect(() => {
        if (user) {
            let todayPostFind = (user.posts.filter(post => post.date == date.toISOString().split('T')[0]))
            if (todayPostFind.length !== 0 ) {
                todayPostFind = todayPostFind[0]
                setTodayPost(todayPostFind)
                let todaySongFind = user.songs.find(song => song.id === todayPostFind.song_id)
                setTodaySong(todaySongFind)   
            }
        }   
        setLoading(false)
    },[])

    const user = useContext(UserContext); 
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const date = new Date() //get current date for date limit
    const [songError, setSongError] = useState(false)
    const [postError, setPostError] = useState(false)
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
                                setPlaylists(newPlaylists)
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
                        //update user arrays
                        const newPosts = [...user.posts, newPost]
                        const newSongs = [...user.songs, selectedSong]
                        const newPlaySongs = [...currentPlaylist.songs, selectedSong]
                        const newPlaylist = {...currentPlaylist, songs: newPlaySongs}
                        const newPlaylists = user.playlists.map(playlist => playlist.id == currentPlaylist.id ? newPlaylist : playlist)
                        const newUser = {...user, songs: newSongs, posts: newPosts, playlists: newPlaylists}
                        setUser(newUser)
                        const date = new Date()
                        const today = date.toISOString().split('T')[0]
                        if(newPost.date == today) {
                            //set today state
                            setTodayPost(newPost)
                            setTodaySong(selectedSong)
                        }
                        //reset selected song and hide comment date form
                        setSelectedSong(null)
                        //navigate to song of the day page
                        navigate('/todayHome')
                    })
                }
                else {
                    setPostError(true)
                    setTimeout(() => {
                        setPostError(false)
                    }, "3000");
                    console.log(resp)
                }
                //reset post form and inputs
                setPostForm({ date: null,song_id: null, playlist_id: null, comment: ""})
                e.target.children[0].children[1].value=""
            });
    }

    function postedToday() {
        if (todayPost) {
            return (
                <div className='container'>
                    <SongOfTheDayCard setUser={setUser} todayPost={todayPost} setTodayPost={setTodayPost} todaySong={todaySong} setTodaySong={setTodaySong}/>
                    <h1>Post for prior dates</h1>
                    {postError ? <p style={{color: "red"}} >Post for that date already exists, or comment required</p> : null}
                    {selectedSong ? null : <form className="forms" onSubmit={searchSong} >
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
                    </form>}
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
                    {postError ? <p style={{color: "red"}} >Post for that date already exists</p> : null}
                    {selectedSong ? null : <form className="forms" onSubmit={searchSong} >
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
                    </form>}
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