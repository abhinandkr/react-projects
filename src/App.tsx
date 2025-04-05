import './App.css'
import {Route, Routes} from "react-router-dom";
import LoadMore from "./pages/load-more/load-more.tsx";
import ProgressBarPage from "./pages/progress-bar/progress-bar.tsx";
import NavBar from "./components/NavBar/nav-bar.tsx";
import Home from "./pages/home/home.tsx";
import FileExplorer from "./pages/file-explorer/file-explorer.tsx";
import TabForm from "./pages/tab-form/tab-form.tsx";
import DebounceAutocomplete from "./pages/debounce-autocomplete/debounce-autocomplete.tsx";
import ThrottleResize from "./pages/throttle-resize/throttle-resize.tsx";
import MemoizedLoadMore from "./pages/load-more/memoized-load-more.tsx";
import UseReducer from "./pages/use-reducer/use-reducer.tsx";
import NewsHeadlines from "./pages/news-headlines/news-headlines.tsx";
import OtpApp from "./pages/otp-app/otp-app.tsx";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path={'/load-more'} element={<LoadMore/>}/>
                <Route path={'/progress-bar'} element={<ProgressBarPage/>}/>
                <Route path={'/file-explorer'} element={<FileExplorer/>}/>
                <Route path={'/tab-form'} element={<TabForm/>}/>
                <Route path={'/debounce-autocomplete'} element={<DebounceAutocomplete/>}/>
                <Route path={'/throttle-resize'} element={<ThrottleResize/>}/>
                <Route path={'/memoized-load-more'} element={<MemoizedLoadMore/>}/>
                <Route path={'/use-reducer'} element={<UseReducer/>}/>
                <Route path={'/news-headlines'} element={<NewsHeadlines/>}/>
                <Route path={'/otp-app'} element={<OtpApp/>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </>
    )
}

export default App;
