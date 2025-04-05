import {NavLink} from "react-router-dom";
import './nav-bar.css';

export default function NavBar() {

    // @ts-expect-error aaa
    function getClassName({isActive}) {
        return isActive ? "active" : "";
    }

    return (
        <nav>
            <h4>Practice</h4>
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
                <li>
                    <NavLink className={getClassName} to="tab-form">Tab Form</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="debounce-autocomplete">Debounce Autocomplete</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="throttle-resize">Throttle Resize</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="memoized-load-more">Memoized Load More</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="use-reducer">Use Reducer</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="otp-app">OTP</NavLink>
                </li>
                <li>
                    <NavLink className={getClassName} to="checkbox-list">Checkbox list</NavLink>
                </li>

            </ul>

            {/*<h4>Interview</h4>*/}
            {/*<ul>*/}
            {/*    <li>*/}
            {/*        <NavLink className={getClassName} to="/">Home</NavLink>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </nav>
    );
}
