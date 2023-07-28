
import './App.css';
import {React, useEffect, useState,useContext, createContext} from 'react';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const UserContext = createContext()
  const [user, setUser] = useState(null)

  

  //when creating a post the user will first search a song in top of form
  //then it will return that song and create it in the system if it doesnt already exist
  //then attatch song id to the post 
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar/>
        <Login setUser={setUser}/>
        <Signup/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
