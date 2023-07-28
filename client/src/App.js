
import './App.css';
import NavBar from './Components/NavBar';
import LoginSignup from './Components/LoginSIgnup';


function App() {

  //when creating a post the user will first search a song in top of form
  //then it will return that song and create it in the system if it doesnt already exist
  //then attatch song id to the post 
  return (
    <div className="App">
      <NavBar/>
      <LoginSignup/>
    </div>
  );
}

export default App;
