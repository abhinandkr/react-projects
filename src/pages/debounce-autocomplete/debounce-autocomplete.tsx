import {useCallback, useEffect, useState} from "react";
import './debounce-autocomplete.css';

export default function DebounceAutocomplete() {
    const [input, setInput] = useState('');
    const [res, setRes] = useState([]);

    async function getData(query: string) {
        if (!query) {
            return '';
        }
        const data = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const json = await data.json();
        // @ts-expect-error aaa
        return json.products.map(({id, title}) => {
            return {
                id, title
            };
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    function debounce(fn: Function, delay: number) {
        let timer: number;
        // @ts-expect-error aaa
        return function (args) {
            // Need to cancel the old timer
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(args).then(setRes);
            }, delay);
        };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getDataDebounce = useCallback(debounce(getData, 500), []);

    useEffect(() => {
        getDataDebounce(input);
    }, [input, getDataDebounce]);

    return (
        <div className="debounce-autocomplete" style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                style={{width: 300}}
                type={'text'}/>
            <div style={{border: '1px solid black', width: 300}}>
                <ul style={{listStyleType: "none", marginLeft: -20, display: 'flex', flexDirection: 'column', gap: 8}}>
                    {res ? res?.map(({id, title}) => {
                        return (
                            <li key={id}>
                                <div onClick={(e) => setInput(title)}
                                     style={{cursor: 'pointer'}}>{title}</div>
                            </li>);
                    }) : null}
                </ul>
            </div>

        </div>
    );
}
