import {React, useState, useEffect, useContext} from 'react'
import SongOfTheDayCard from './SongOfTheDayCard';
import UserContext from './UserContext';


function TodayHome() {

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

    const songsOfTheDay = users.forEach(userItem => {
        let todayPosts = userItem.posts.filter(post => post.date == date.toISOString().split('T')[0])
        if (user) {
            todayPosts = todayPosts.filter(post => post.user_id != user.id)
        }
        console.log(todayPosts)
    })

    
    return (
        <SongOfTheDayCard/>
    )
}

export default TodayHome;