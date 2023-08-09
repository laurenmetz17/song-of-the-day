import {React, useState, useEffect, useContext} from 'react'
import SongOfTheDayCard from './SongOfTheDayCard';
import PostCard from './PostCard';
import UserContext from './UserContext';


function TodayHome({setUser}) {

    const date = new Date()

    const [users, setUsers] = useState([])
    const user = useContext(UserContext); 

    useEffect(() => {
        fetch("/users")
        .then(resp => {
          if (resp.ok) {
            resp.json()
            .then((allUsers) => {
                setUsers(allUsers)
            }) 
          }
          else {
            throw new Error(`HTTP error, status = ${resp.status}`);
          }
        })
        .catch(error => {
          console.error(error);
        })
    },[])

    let songsOfTheDay
    users.forEach(userItem => {
        let todayPosts = userItem.posts.filter(post => post.date == date.toISOString().split('T')[0])
        if (user) {
            todayPosts = todayPosts.filter(post => post.user_id != user.id)
        }
        if (todayPosts.length !== 0) {
            songsOfTheDay = todayPosts.map(post => (
                <PostCard key={post.id} post={post} users={users}/>
            ))
        }
    })

    return (
        <div className='container'>
            <SongOfTheDayCard setUser={setUser}/>
            <h1>Songs Of the Day</h1>
            {songsOfTheDay}
        </div>
        
    )
}

export default TodayHome;