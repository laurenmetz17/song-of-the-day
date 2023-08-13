
import './App.css';
import "./styles.css";
import {React, useEffect, useState} from 'react';
import {Routes, Route } from "react-router-dom";
import UserContext from './Components/UserContext';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import TodayHome from './Components/TodayHome';
import CreatePost from './Components/CreatePost';
import Playlists from './Components/Playlists';


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


  return (
    <div className='App'>
      <UserContext.Provider value={user}>
        <NavBar/>
        <div className='container'>
          <Routes>
              <Route path="/" element={<TodayHome/>}/> {/*replace with about*/}
              <Route path="/todayHome" element={<TodayHome setUser={setUser}/>}/>
              <Route path="/postToday" element={<CreatePost setUser={setUser}/>}/>
              <Route path="/playlistsPage" element={<Playlists />}/>
              <Route path="/login" element={<Login setUser={setUser}/>}/> {/* add in link to signup*/}
              <Route path="/logout" element={<Logout setUser={setUser}/>}/>
          </Routes>
        </div>
      </UserContext.Provider> 
    </div>
  );
}

export default App;
