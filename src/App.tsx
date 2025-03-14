import './App.css'
import {Route, Routes} from "react-router-dom";
import LoadMore from "./pages/load-more/load-more.tsx";
import ProgressBarPage from "./pages/progress-bar/progress-bar.tsx";
import NavBar from "./components/NavBar/nav-bar.tsx";
import Home from "./pages/home/home.tsx";
import FileExplorer from "./pages/file-explorer/file-explorer.tsx";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path={'/load-more'} element={<LoadMore/>}/>
                <Route path={'/progress-bar'} element={<ProgressBarPage/>}/>
                <Route path={'/file-explorer'} element={<FileExplorer/>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </>
    )
}

export default App;
