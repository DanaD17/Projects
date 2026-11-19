import "../NavBar/Navbar.scss"
import { NavLink } from "react-router-dom";

export function NavBar(){
    return (
        <nav>
        <div className="main-content">
            <ul className="content-list">
               <li> <NavLink to="/" viewTransition>Home</NavLink></li>
               <li> <NavLink to="/cookbook" viewTransition >CookBook</NavLink></li>
                <li><NavLink to="/account" viewTransition>Account</NavLink></li>
            </ul>
        </div>
         </nav>
    )
}