import {useCallback, useEffect, useState} from "react";

export default function ThrottleResize() {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    function throttle(fn: Function, delay: number) {
        let ready: boolean = true;
        // @ts-expect-error aaa
        return function (args) {
            if (ready) {
                fn(args);
                ready = false;
                setTimeout(() => {
                    ready = true;
                }, delay);
            }
        };
    }

    function setScreenDimensions() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resizeThrottle = useCallback(throttle(setScreenDimensions, 500), []);

    useEffect(() => {
        window.addEventListener('resize', resizeThrottle);
    }, []);

    return (
        <div>
            <div>Screen width {width}</div>
            <div>Screen height {height}</div>
        </div>
    );
}
