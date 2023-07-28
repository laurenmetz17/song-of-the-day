import {React, useContext} from 'react'
import UserContext from './UserContext';

function CreatePost() {

    const user = useContext(UserContext); 

    function updateSongForm(e) {

    }

    return (
        <div className='container'>
            <form className="forms" >
                <h1 className="headers">Search Song</h1>
                <div className="inputs">
                    <label>Title</label>
                    <input name="title" type="text" onChange={updateSongForm}/>
                </div>
                <div className='inputs'>
                    <label>Artist</label>
                    <input name="artist" type="text" onChange={updateSongForm}/>
                </div>
                <input type="submit" value="Search Song"/>
            </form>
        </div>
    )
}
export default CreatePost;