import {useCallback, useEffect, useRef} from 'react';

export function useThrottle<T extends (...args: never[]) => void>(
	fn: T,
	delay: number
) {
	const readyRef = useRef(true);
	const timerRef = useRef(null);

	function throttle(...args: Parameters<T>) {
		if (readyRef.current) {
			readyRef.current = false;
			fn(...args);
			timerRef.current = setTimeout(() => {
				readyRef.current = true;
			}, delay);
		}
	}

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		}
	}, []);

	return useCallback(throttle, [fn, delay]);
}
