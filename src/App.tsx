import './App.css'
import {Route, Routes} from "react-router-dom";
import LoadMore from "./pages/load-more/load-more.tsx";
import ProgressBarPage from "./pages/progress-bar/progress-bar.tsx";
import NavBar from "./components/NavBar/nav-bar.tsx";
import FileExplorer from "./pages/file-explorer/file-explorer.tsx";
import TabForm from "./pages/tab-form/tab-form.tsx";
import DebounceAutocomplete from "./pages/debounce-autocomplete/debounce-autocomplete.tsx";
import ThrottleResize from "./pages/throttle-resize/throttle-resize.tsx";
import MemoizedLoadMore from "./pages/load-more/memoized-load-more.tsx";
import UseReducer from "./pages/use-reducer/use-reducer.tsx";
import NewsHeadlines from "./pages/news-headlines/news-headlines.tsx";
import OtpApp from "./pages/otp-app/otp-app.tsx";
import CheckboxList from "./components/CheckboxList/checkbox-list.tsx";
import Context from "./pages/context/context.tsx";
import RenderProp from "./pages/custom-hooks/render-prop/render-prop.tsx";
import TodoList from "./pages/todo-list/todo-list.tsx";

function Home() {
    return (
        <>
            React examples
        </>
    );
}


function App() {

    return (
        <div className={'div-app'}>
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
                <Route path={'/checkbox-list'} element={<CheckboxList/>}/>
                <Route path={'/context'} element={<Context/>}/>
                {/*<Route path={'/custom-hooks/*'} element={<CustomHooks/>}/>*/}
                <Route path={'/render-prop'} element={<RenderProp/>}/>
                <Route path={'/todo-list'} element={<TodoList/>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App;
