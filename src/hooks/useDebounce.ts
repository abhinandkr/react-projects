import {useCallback, useEffect, useRef} from "react";

export function useDebounce<T extends(...args: never[]) => void>(
    fn: T,
    delay: number
) {
    // Not useState coz debouncing does not care about rendering. setState rerenders which is
    // unnecessary and hurts performance
    const timerRef = useRef(null);

    function debounce(...args: Parameters<T>) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            fn(...args);
        }, delay);
    }

    const debouncedCallback = useCallback(debounce, [fn, delay]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, []);


    return debouncedCallback;
}
