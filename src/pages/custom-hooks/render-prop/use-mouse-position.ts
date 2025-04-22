import { useState, useEffect } from 'react';

export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(function () {
        function handleMouseMove(event) {
            setPosition({ x: event.clientX, y: event.clientY });
        }

        window.addEventListener('mousemove', handleMouseMove);
        return function () {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return position;
}
