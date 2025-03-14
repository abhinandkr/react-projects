import {NavLink} from "react-router-dom";
import './nav-bar.css';

export default function NavBar() {

    // @ts-expect-error aaa
    function getClassName({isActive}) {
        return isActive ? "active-link" : "";
    }

    return (
        <nav>
            <ul>
                <li>
                    <NavLink className={getClassName} to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="load-more">Load More</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="progress-bar">Progress Bar</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="file-explorer">File Explorer</NavLink>
                </li>

            </ul>
        </nav>
    );
}
