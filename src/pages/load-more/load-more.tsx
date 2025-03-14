import {useEffect, useState} from "react";

export default function LoadMore() {
    const LIMIT = 10;
    const [skip, setSkip] = useState(0);
    const [data, setData] = useState([]);
    const [isLoadMoreDisabled, setLoadMoreDisabled] = useState(true);
    const [price, setPrice] = useState(0);
    const columnIds = ['id', 'title', 'price', 'description'];

    async function getData() {
        const url = new URL('https://dummyjson.com/products');
        url.searchParams.append('limit', LIMIT.toString());
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('select', columnIds.join(','));

        const res = await fetch(url);
        return await res.json();
    }

    useEffect(() => {
        setLoadMoreDisabled(true);
        getData().then((data) => {
            // @ts-expect-error type
            setData(prevData => [...prevData, ...data.products]);
        }).finally(() => {
            setLoadMoreDisabled(false);
        });
    }, [skip]);

    function onLoadMoreClick() {
        setSkip(skip => skip + LIMIT);
    }

    function filterPrice() {
        getData().then(() => {
            setData(data => data.filter((d) => d['price'] <= price));
        });
    }

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                <input type={'number'} name={'input-age'} id={'input-age'}
                       onBlur={(event) => setPrice(Number(event.target.value))}/>
                <button onClick={filterPrice}>Filter price</button>
            </div>
            <br />
            <table border={1}>
                <thead>
                <tr>
                    {columnIds.map((columnId) => {
                        return (
                            <td key={columnId}>{columnId.toUpperCase()}</td>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {data.map((product, index) => {
                    return (
                        <tr key={`${product['id']}-${product['title']}`} style={{animationDelay: `${index * 0.05}s`}}>
                            {columnIds.map((columnId) => {
                                return (
                                    <td key={columnId}>
                                        {product[columnId]}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <button disabled={isLoadMoreDisabled} onClick={onLoadMoreClick}>Load more</button>
            <div style={{display: isLoadMoreDisabled ? '' : 'none'}}>{'LOADING...'}</div>
        </>
    )
}
