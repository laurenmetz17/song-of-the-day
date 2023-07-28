
import './App.css';
import {React, useEffect, useState,useContext, createContext} from 'react';
import UserContext from './Components/UserContext';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import SongOfTheDay from './Components/SongOfTheDay';
import CreatePost from './Components/CreatePost';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me")
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then((currentUser) => {
            setUser(currentUser)
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

  //when creating a post the user will first search a song in top of form
  //then it will return that song and create it in the system if it doesnt already exist
  //then attatch song id to the post 
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar/>
        <Login setUser={setUser}/>
        <Signup/>
        <Logout setUser={setUser}/>
        <SongOfTheDay/>
        <CreatePost/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
