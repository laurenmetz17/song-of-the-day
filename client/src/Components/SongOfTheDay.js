import {React, useState, useContext} from 'react'
import UserContext from './UserContext';

function SongOfTheDay() {

    const user = useContext(UserContext);  
    console.log(user)
    return (
        <p>song</p>
    )
}

export default SongOfTheDay;