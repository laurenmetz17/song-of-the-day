import logo from './logo.svg';
import './App.css';

function App() {

  //when creating a post the user will first search a song in top of form
  //then it will return that song and create it in the system if it doesnt already exist
  //then attatch song id to the post 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
