import {useReducer} from "react";

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

export default function UseReducer() {
    const [state, dispatch] = useReducer(warehouseReducer, DEFAULT_WAREHOUSE_STATE);
    return (
        <div>
            <p>{state.name}</p>
            <p>{state.age}</p>
            <button onClick={() => dispatch(({type: 'RENAME', payload: 'Abhi'}))}>Change name</button>
            <button onClick={() => dispatch(({type: 'INCREASE_AGE'}))}>Increase age</button>
        </div>
    )
}
