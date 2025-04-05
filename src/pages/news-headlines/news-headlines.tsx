import {useCallback, useEffect, useState} from "react";
import './news-headlines.css';

const columns = [{
    id: 'author',
}, {
    id: 'title',
}, {
    id: 'description',
}];

export default function NewsHeadlines() {
    // Put in .env file or a secret manager
    const API_KEY = 'cca5067637ec4912b5c95901996199f3';
    const [headlines, setHeadlines] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    async function getHeadlines(searchQuery: string | null = null) {
        const baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
        const url = new URL(baseUrl);
        searchQuery && url.searchParams.append('q', searchQuery);
        const res = await fetch(url);
        return await res.json();
    }

    function debounce(fn, delay: number) {
        let timer: number;
        return function (args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(args).then(setHeadlines);
            }, delay);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callbackDebounce = useCallback(debounce(getHeadlines, 500), []);

    useEffect(() => {
        getHeadlines().then(setHeadlines);
    }, []);

    useEffect(() => {
        if (!searchQuery) {
            return;
        }
        // getHeadlines(searchQuery).then(setHeadlines);
        callbackDebounce(searchQuery);
    }, [searchQuery]);

    const {articles} = headlines;

    if (!articles) {
        return null;
    }

    return (
        <div>
            {/*Search bar here*/}
            <section>
                <div className={'div-search'}>
                    <input type={'text'} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
            </section>

            {/*Table of headlines*/}

            <table className={'table-headlines'}>
                <thead>
                <tr>
                    <td>
                        Author
                    </td>
                    <td>
                        Title
                    </td>
                    <td>
                        Description
                    </td>
                </tr>
                </thead>

                <tbody>
                {articles?.map((article) => {
                    const {author, title} = article;
                    const key = `${author}${title}`;
                    return (
                        <tr key={key}>
                            {columns.map((col) => {
                                return (
                                    <td>{article[col.id]}</td>
                                );
                            })}
                        </tr>
                    );
                })}

                </tbody>
            </table>
        </div>
    );
}
