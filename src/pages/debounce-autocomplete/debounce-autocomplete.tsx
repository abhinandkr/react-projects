import {useEffect, useState} from "react";
import './debounce-autocomplete.css';
import {useDebounce} from "../../hooks/useDebounce.ts";

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

    const fetchData = useDebounce((query: string) => getData(query).then(setRes), 500);

    useEffect(() => {
        fetchData(input);
    }, [input, fetchData]);

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
                                <div onClick={() => setInput(title)}
                                     style={{cursor: 'pointer'}}>{title}</div>
                            </li>);
                    }) : null}
                </ul>
            </div>

        </div>
    );
}
