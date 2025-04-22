import {useEffect, useState} from "react";

export default function useFetch(url: string, dataKey: string) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	async function getData() {
		const data = await fetch(url);
		return await data.json();
	}

	useEffect(() => {
		setLoading(true);
		getData().then((data) => {
			// @ts-ignore
			setData(prevData => [...prevData, ...data[dataKey]]);
		}).catch((e) => {
			setError(e);
		}).finally(() => {
			setLoading(false);
		});
	}, [url]);

	return {data, loading, error};

}