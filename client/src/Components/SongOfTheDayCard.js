import UserContext from "./UserContext";
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

function SongOfTheDayCard() {

    const user = useContext(UserContext)
    const navigate = useNavigate()
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

    function postMade() {
        //if there is a post today render the post, if not render a button to go the create post page
        if (todayPost.length == 0) {
            return <button onClick={() => {navigate('/postToday')}}>Choose Your Song Of The Day</button>
        }
        else {
            return (
                <div>
                    <h1>Today's Song</h1>
                    <img src={todaySong.art} alt="album cover"></img>
                    <p>{todaySong.title}</p>
                    <p>{todaySong.artist}</p>
                    <p>{todayPost.comment}</p>
                </div>
            )
        }
    }


    return (
        <div className="song_of_the_day">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <h4 className="date">{date.toDateString().substring(4,10)}, {date.getFullYear()}</h4>
            {user ? postMade() : null}
        </div>
    )
}

export default SongOfTheDayCard;