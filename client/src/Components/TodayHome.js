import {React, useState, useContext} from 'react'
import SongOfTheDayCard from './SongOfTheDayCard';
import UserContext from './UserContext';


function TodayHome() {

    const user = useContext(UserContext);  
    //console.log(user.songs)
    return (
        <SongOfTheDayCard/>
    )
}

export default TodayHome;