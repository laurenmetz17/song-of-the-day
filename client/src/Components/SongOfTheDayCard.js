import UserContext from "./UserContext";
import {useContext} from 'react'

function SongOfTheDayCard() {

    const user = useContext(UserContext)

    const date = new Date()

    return (
        <div className="song_of_the_day">
            {user? <h3>Hello {user.name}!</h3> :<h3>Login to make posts</h3>}
            <p>Today is {date.toDateString().substring(4,10)}, {date.getFullYear()}</p>
        </div>
    )
}

export default SongOfTheDayCard;