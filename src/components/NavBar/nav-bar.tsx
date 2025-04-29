import {NavLink} from "react-router-dom";
import './nav-bar.css';

export default function NavBar() {

    // @ts-expect-error aaa
    function getClassName({isActive}) {
        return isActive ? "active" : "";
    }

    const routes = [
        {to: "/", label: "Home"},
        {to: "load-more", label: "Load More"},
        {to: "progress-bar", label: "Progress Bar"},
        {to: "file-explorer", label: "File Explorer"},
        {to: "tab-form", label: "Tab Form"},
        {to: "debounce-autocomplete", label: "Debounce Autocomplete"},
        {to: "throttle-resize", label: "Throttle Resize"},
        {to: "memoized-load-more", label: "Memoized Load More"},
        {to: "use-reducer", label: "Use Reducer"},
        {to: "otp-app", label: "OTP"},
        {to: "checkbox-list", label: "Checkbox list"},
        {to: "context", label: "Context"},
        {to: 'render-prop', label: 'Render prop'},
        {to: 'todo-list', label: 'Todo list'}
    ];

    return (
        <nav>
            <h4>Practice</h4>
            <div className={'div-list-wrapper'}>
                {routes.map(function (route) {
                    return (
                        <div className={'div-list-item'} key={route.to}>
                            <NavLink className={getClassName} to={route.to}>{route.label}</NavLink>
                        </div>
                    );
                })}
            </div>

            {/*<h4>Interview</h4>*/}
            {/*<ul>*/}
            {/*    <li>*/}
            {/*        <NavLink className={getClassName} to="/">Home</NavLink>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </nav>
    );
}
