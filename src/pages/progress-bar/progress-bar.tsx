import './progress-bar.css';
import {useEffect, useState} from "react";

export default function ProgressBarPage() {
    const [progress, setProgress] = useState(0);
    const [intervalTimer, setIntervalTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(progress => progress + 10);
        }, 500);
        setIntervalTimer(interval);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            clearInterval(intervalTimer);
        }
    }, [intervalTimer, progress]);

    return (
        <>
            <ProgressBar progress={progress}/>
        </>
    );
}

// @ts-expect-error aaa
function ProgressBar({progress}) {

    return (
        <>
            <div className={'outer'}>
                <div className={'inner'} style={{
                    transform: `translateX(${progress - 100}%)`
                }}>

                </div>
                <div className={'progress-text'}>
                    {progress}
                </div>
            </div>

        </>
    );
}
