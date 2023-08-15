import UserContext from "./UserContext";
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SongCard from "./SongCard";

function SongOfTheDayCard({setUser, todayPost, setTodayPost, todaySong, setTodaySong}) {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [showEdit,setShowEdit] = useState(false)
    const [editComment, setEditComment] = useState(null)
    const date = new Date()
    //need to update both songs of the day on create post too 

    //if the user has as post today get that post and song
    useEffect(() => {
        if (user) {
            let todayPostFind = (user.posts.filter(post => post.date == date.toISOString().split('T')[0]))
            console.log(todayPostFind)
            if (todayPostFind.length !== 0 ) {
                todayPostFind = todayPostFind[0]
                setTodayPost(todayPostFind)
                let todaySongFind = user.songs.find(song => song.id === todayPostFind.song_id)
                setTodaySong(todaySongFind)   
            }
        }   
        setLoading(false)
    },[])

    function buttonRender() {
        console.log(user)
        if (user) {
            return <button onClick={() => {navigate('/postToday')}}>Choose Your Song Of The Day</button>
        }
    }

    function showForm() {
        return (
            <form onSubmit={handleEdit}>
                <input type="text" name="comment_edit" value={editComment} onChange={updateComment}/>
                <input type="submit" value="Edit Comment" />
            </form>
        )
    }

    function updateComment(e) {
        e.preventDefault()
        setEditComment(e.target.value)
    }

    function handleEdit(e) {
        e.preventDefault();
        e.target.children[0].value = ''
        fetch(`/posts/${todayPost.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment: editComment}), 
        }).then(resp => {
            if (resp.ok) {
                resp.json()
                .then((newPost) => {
                    const newPosts = user.posts.map(post => post.id == newPost.id? newPost : post)
                    const newUser = {...user, posts: newPosts}
                    setTodayPost(newPost)
                    setUser(newUser)
                    setShowEdit(false)
                })

            }
            else {
                console.log("bad edit")
            }
        })

    }

    function handleDelete(e) {
        e.preventDefault();
        fetch(`posts/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(null), 
        })
        .then(resp => console.log(resp))
        .then(() => {
            console.log(todayPost)
            const newPosts = user.posts.filter(post => post.id != todayPost.id)
            const newUser = {...user, posts: newPosts}
            setUser(newUser)
            setTodayPost(null)
            setTodaySong(null)
            //update playlists
        })
    }

    return (
        <div>
            {loading ? <p>loading...</p>: <div className="song_of_the_day_card">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <h4 className="date">{date.toDateString().substring(4,10)}, {date.getFullYear()}</h4>
            {todayPost && todaySong ? 
                <div className="post_card">
                    <h1>Today's Song</h1>
                    <SongCard song={todaySong}/>
                    <p className="post_comment">{todayPost.comment}</p>
                    {showEdit ? showForm(): <button onClick={() => {
                        setEditComment(todayPost.comment)
                        setShowEdit(true)
                    }}>Edit Comment</button>}
                    <button id={todayPost.id} onClick={handleDelete}>Delete Post</button>
                </div> : 
                buttonRender()}
            </div>}
        </div>
        )
}

export default SongOfTheDayCard;