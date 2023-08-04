import UserContext from "./UserContext";
import {useContext} from 'react'

function SongOfTheDayCard() {

    const user = useContext(UserContext)
    const date = new Date()
    let todayPost
    if (user) {
        console.log(user.posts)
        console.log(date.toISOString().split('T')[0])
        todayPost = (user.posts.filter(post => post.date == date.toISOString().split('T')[0]))
        console.log(todayPost)

    }
    //if the user has as post today get that song


    return (
        <div className="song_of_the_day">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <h4 className="date">{date.toDateString().substring(4,10)}, {date.getFullYear()}</h4>
            {todayPost ? <p>{todayPost.comment}</p> : null}

        </div>
    )
}

export default SongOfTheDayCard;