import {Route, Routes} from "react-router-dom";
import {NavLink} from "react-router-dom";
import RenderProp from "./render-prop/render-prop.tsx";

export default function CustomHooks() {
    return (
        <>
            <NavLink to={'/'}>Home</NavLink>
            <Routes>
                <Route path={'/render-prop'} element={<RenderProp />}></Route>
            </Routes>
        </>
    );
}
