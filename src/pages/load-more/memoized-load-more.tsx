import {FC, useEffect, useState} from "react";
import './load-more.css';

export default function MemoizedLoadMore() {
    const LIMIT = 10;
    const [skip, setSkip] = useState(0);
    const [data, setData] = useState([]);
    const [isLoadMoreDisabled, setLoadMoreDisabled] = useState(true);
    const [price, setPrice] = useState(0);
    type ItemRowProps = {
        id: string;
        title: string;
        price: number;
        description: string;
    };
    const columnIds = [{
        id: 'id',
        sortable: true,
    }, {
        id: 'title',
        sortable: true,
    }, {
        id: 'price',
        sortable: true,
    }, {
        id: 'description',
        sortable: false,
    }];
    const [sort, setSort] = useState({sortBy: columnIds[0].id, order: 'asc'});

    async function getData() {
        const url = new URL('https://dummyjson.com/products');
        url.searchParams.append('limit', LIMIT.toString());
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('select', columnIds.map(c => c.id).join(','));
        sort.sortBy && url.searchParams.append('sortBy', sort.sortBy);
        sort.order && url.searchParams.append('order', sort.order);

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

    useEffect(() => {
        setLoadMoreDisabled(true);
        getData().then((data) => {
            setData(data.products);
        }).finally(() => {
            setLoadMoreDisabled(false);
        });
    }, [sort]);

    function onLoadMoreClick() {
        setSkip(skip => skip + LIMIT);
    }

    function filterPrice() {
        getData().then(() => {
            setData(data => data.filter((d) => d['price'] <= price));
        });
    }

    function sortColumn(columnId: string) {
        setSort((prev) => {
            if (prev.sortBy === columnId) {
                return {
                    sortBy: columnId,
                    order: prev.order === 'asc' ? 'desc' : 'asc',
                };
            }
            return {
                sortBy: columnId,
                order: 'asc',
            };
        });
    }

    const ItemRow: FC<{item: ItemRowProps, index: number}> = (props) => {
        const {item, index} = props;
        const key = `${item['id']}-${item['title']}`;
        console.log(`ItemRow rendered: ${key}`);
        return (
            <tr key={key} style={{animationDelay: `${index * 0.05}s`}}>
                {columnIds.map(({id}, idx: number) => {
                    // @ts-expect-error aaa
                    const columnValue = item[id];
                    return (
                        <td key={`${item['id']}-${item['title']}-${idx}`}>
                            {columnValue}
                        </td>
                    );
                })}
            </tr>
        );
    };

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                <input type={'number'} name={'input-age'} id={'input-age'}
                       onBlur={(event) => setPrice(Number(event.target.value))}/>
                <button onClick={filterPrice}>Filter price</button>
            </div>
            <br/>
            <table border={1}>
                <thead>
                <tr>
                    {columnIds.map(({id: columnId, sortable}) => {
                        const buttonText = (columnId === sort.sortBy) ? (sort.order === 'asc' ? `↑` : `↓`) : '↔︎';
                        return (
                            <td key={columnId}>
                                <div style={{display: 'flex', flexDirection: 'row', gap: 2}}>
                                    {columnId.toUpperCase()}
                                    {sortable && <>
                                        {/*<button>↑</button>*/}
                                        <button
                                            disabled={isLoadMoreDisabled}
                                            onClick={() => sortColumn(columnId)}
                                            className={`${sort.sortBy === columnId ? "sorted" : ""}`}>{buttonText}</button>
                                    </>}
                                </div>
                            </td>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {data.map((item: ItemRowProps, index: number) => {
                    const key = `${item['id']}-${item['title']}`;
                    return <ItemRow item={item} index={index}/>;
                })}
                </tbody>
            </table>

            <button disabled={isLoadMoreDisabled} onClick={onLoadMoreClick}>Load more</button>
            <div style={{display: isLoadMoreDisabled ? '' : 'none'}}>{'LOADING...'}</div>
        </>
    )
}
