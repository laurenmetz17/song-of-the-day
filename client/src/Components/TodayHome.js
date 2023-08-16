import {React, useState, useEffect, useContext} from 'react'
import SongOfTheDayCard from './SongOfTheDayCard';
import PostCard from './PostCard';
import UserContext from './UserContext';


//use of toISO string throws off date
function TodayHome({setUser, todayPost, todaySong, setTodayPost, setTodaySong}) {

    const date = new Date()

    const [users, setUsers] = useState([])
    const user = useContext(UserContext); 

    useEffect(() => {
        //get all users
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


    //get song of the day for each user and render a post for each 
    let songsOfTheDay = []
    users.forEach(userItem => {
        let songOfTheDay
        let todayPosts = userItem.posts.filter(post => post.date == date.toISOString().split('T')[0])
        if (user) {
            todayPosts = todayPosts.filter(post => post.user_id != user.id)
        }
        if (todayPosts.length !== 0) {
            songOfTheDay = todayPosts.map(post => (
                <PostCard key={post.id} post={post} users={users}/>
            ))
        }
        songsOfTheDay.push(songOfTheDay)
    })

    return (
        <div className='container'>
            <SongOfTheDayCard setUser={setUser} todayPost={todayPost} setTodayPost={setTodayPost} todaySong={todaySong} setTodaySong={setTodaySong}/>
            <h1 className='headers'>Songs Of the Day</h1>
            {songsOfTheDay}
        </div>
        
    )
}

export default TodayHome;