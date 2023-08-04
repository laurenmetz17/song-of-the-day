
import { Link, useMatch, useResolvedPath} from 'react-router-dom';
import {React, useContext} from 'react'
import UserContext from './UserContext';

function NavBar() {

    const user = useContext(UserContext)

    return(
        <nav className="nav">
            <Link to="/" className="site-name">Song Of The Day 🎵</Link>
            {user ? <p>{`Welcome ${user.name}!`}</p>: null}
            <ul>
                <CustomLink to= "/todayHome">Today</CustomLink>
                <CustomLink to= "/postToday">Post Today</CustomLink>
                <CustomLink to= "/playlistsPage">Playlists</CustomLink>
                {user ? <CustomLink to= "/logout">Logout</CustomLink> :<CustomLink to= "/login">Login or Signup</CustomLink>}
            </ul>
        </nav>
    )
}


function CustomLink({to, children, ...props}) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})

    return (
        <li className={isActive ? "active": ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default NavBar;