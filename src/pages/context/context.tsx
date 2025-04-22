import {createContext, useContext} from "react";

const AppContext = createContext({
    num: 10,
});

function Child2() {
    const {num} = useContext(AppContext);
    return <div>Changed context value {num}</div>;
}

function Child1() {
    return (
        <Child2/>
    );
}

function Parent() {
    return (
        <Child1/>
    );
}

export default function Context() {
    const {num} = useContext(AppContext);
    return (
        <>
            <p>Default context value {num}</p>
            <AppContext.Provider value={{num: 20}}>
                <Parent/>
            </AppContext.Provider>
        </>
    );
}

