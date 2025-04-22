import {useEffect, useReducer} from "react";

type WarehouseState = {
    name: string;
    age: number;
}

const DEFAULT_WAREHOUSE_STATE: WarehouseState = {
    name: 'Bob',
    age: 50,
};

function warehouseReducer(state: WarehouseState, action: any) {
    switch (action.type) {
        case 'RENAME':
            return {
                ...state,
                name: action.payload,
            };
        case 'INCREASE_AGE':
            return {
                ...state,
                age: state.age + 1,
            };
        default:
            throw new Error('Unknown action');
    }
}

// Redux DevTools Extension Support
const devtools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__.connect({name: 'FormStore'});

export default function UseReducer() {
    const [state, dispatch] = useReducer(warehouseReducer, DEFAULT_WAREHOUSE_STATE);


    // Sync with Redux DevTools
    useEffect(() => {
        if (devtools) {
            devtools.init(DEFAULT_WAREHOUSE_STATE);
        }
    }, []);

    useEffect(() => {
        if (devtools) {
            devtools.send({ type: 'UPDATE' }, state);
        }
    }, [state]);

    return (
        <div>
            <p>{state.name}</p>
            <p>{state.age}</p>
            <button onClick={() => dispatch(({type: 'RENAME', payload: 'Abhi'}))}>Change name</button>
            <button onClick={() => dispatch(({type: 'INCREASE_AGE'}))}>Increase age</button>
        </div>
    )
}
