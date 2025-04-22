import {useCallback, useEffect, useState} from "react";
import {useThrottle} from '../../hooks/useThrottle';

export default function ThrottleResize() {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    function setScreenDimensions() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resizeThrottle = useThrottle(setScreenDimensions, 500);

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
