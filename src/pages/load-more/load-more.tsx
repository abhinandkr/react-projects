import {useMemo, useState} from "react";
import './load-more.css';
import useFetch from "../../hooks/useFetch.ts";

export default function LoadMore() {
	const LIMIT = 10;
	const [skip, setSkip] = useState(0);
	const [price, setPrice] = useState(0);

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


	const url = useMemo(function () {
		const url = new URL('https://dummyjson.com/products');
		url.searchParams.append('limit', LIMIT.toString());
		url.searchParams.append('skip', skip.toString());
		url.searchParams.append('select', columnIds.map(c => c.id).join(','));
		sort.sortBy && url.searchParams.append('sortBy', sort.sortBy);
		sort.order && url.searchParams.append('order', sort.order);
		return url;
	}, [LIMIT, skip, columnIds, sort, price]);

	const {data, loading: isLoadMoreDisabled} = useFetch(url.href, 'products');

	function onLoadMoreClick() {
		setSkip(skip => skip + LIMIT);
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

	return (
		<>
			<div style={{display: 'flex', flexDirection: 'row', gap: 4}}>
				<input type={'number'} name={'input-age'} id={'input-age'}
					   onBlur={(event) => setPrice(Number(event.target.value))}/>
				{/*<button onClick={filterPrice}>Filter price</button>*/}
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
				{data
					.filter((product) => {
						return price === 0 || product['price'] <= price;
					})
					.map((product, index) => {
						return (
							<tr key={`${product['id']}-${product['title']}`}
								style={{animationDelay: `${index * 0.05}s`}}>
								{columnIds.map(({id: columnId}) => {
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
