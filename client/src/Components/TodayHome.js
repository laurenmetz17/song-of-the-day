import {React, useState, useContext} from 'react'
import UserContext from './UserContext';

function TodayHome() {

    const user = useContext(UserContext);  
    //console.log(user.songs)
    return (
        <p>song</p>
    )
}

export default TodayHome;