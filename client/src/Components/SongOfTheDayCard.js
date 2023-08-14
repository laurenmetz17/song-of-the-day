import UserContext from "./UserContext";
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SongCard from "./SongCard";

function SongOfTheDayCard({setUser}) {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [showEdit,setShowEdit] = useState(false)
    const [editComment, setEditComment] = useState("")
    const date = new Date()

    console.log(setUser)

    //if the user has as post today get that post and song
    let todayPost
    let todaySong
    if (user) {
        todayPost = (user.posts.filter(post => post.date == date.toISOString().split('T')[0]))
        if (todayPost.length !== 0 ) {
            todayPost = todayPost[0]
            todaySong = user.songs.find(song => song.id === todayPost.song_id)
        }
    }
    

    function postMade() {
        //if there is a post today render the post, if not render a button to go the create post page
        if (todayPost.length == 0) {
            return <button onClick={() => {navigate('/postToday')}}>Choose Your Song Of The Day</button>
        }
        else {
            return (
                <div className="post_card">
                    <h1>Today's Song</h1>
                    <SongCard song={todaySong}/>
                    <p className="post_comment">{todayPost.comment}</p>
                    {showEdit ? showForm(): <button onClick={() => setShowEdit(true)}>Edit Comment</button>}
                </div>
            )
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
                    setUser(newUser)
                })

            }
            else {
                console.log("bad edit")
            }
        })

    }
    //when hit edit comment try to preload comment still
    


    return (
        <div className="song_of_the_day_card">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <h4 className="date">{date.toDateString().substring(4,10)}, {date.getFullYear()}</h4>
            {user ? postMade() : null}
        </div>
    )
}

export default SongOfTheDayCard;