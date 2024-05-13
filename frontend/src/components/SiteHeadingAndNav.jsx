import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <a id='logo' href='/'>The Lighthouse</a>
    <nav>
      <ul>
        <li><NavLink className="red-button" to='/'>Home</NavLink></li>
        <li><NavLink className="red-button" to='/resources'>Resources</NavLink></li>

        {
          currentUser
            ? <>
              <li><NavLink className="red-button" to='/users' end={true}>Users</NavLink></li>
              <li><NavLink className="red-button" to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            </>
            : <>
              <li><NavLink className="red-button" to='/login'>Login</NavLink></li>
              <li><NavLink className="red-button" to='/sign-up'>Sign Up</NavLink></li>
            </>
        }
      </ul>
    </nav>
  </header>;
}
