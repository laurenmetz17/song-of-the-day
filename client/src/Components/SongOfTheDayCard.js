import UserContext from "./UserContext";
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function SongOfTheDayCard() {

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [showEdit,setShowEdit] = useState(false)
    const date = new Date()

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

    function showForm() {

        return (
            <form>
                <input type="text" name="comment_edit"/>
                <input type="submit"/>
            </form>
        )
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
                    <img src={todaySong.art} alt="album cover"></img>
                    <p>{todaySong.title}</p>
                    <p>{todaySong.artist}</p>
                    <p>{todayPost.comment}</p>
                    <button onClick={() => setShowEdit(true)}>Edit Comment</button>
                    {showEdit ? showForm(): null}
                </div>
            )
        }
    }

    //add in ability to edit the comment od the post


    return (
        <div className="song_of_the_day_card">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <h4 className="date">{date.toDateString().substring(4,10)}, {date.getFullYear()}</h4>
            {user ? postMade() : null}
        </div>
    )
}

export default SongOfTheDayCard;