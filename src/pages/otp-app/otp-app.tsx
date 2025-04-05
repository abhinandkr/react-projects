import * as React from "react";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import './otp-app.css';

export default function OtpApp() {
    const [otpInput, setOtpInput] = useState<string[]>(new Array(6).fill(''));
    const refArr = useRef<(HTMLInputElement | null)[]>([]);

    function onOtpDigitChange(e: ChangeEvent<HTMLInputElement>, index: number) {
        let {value} = e.target;
        if (Number.isNaN(Number(value))) {
            return;
        }

        value = value.trim();
        setOtpInput(prevState => {
            const arr = [...prevState];
            arr[index] = value.slice(-1);
            return arr;
        });
        value && refArr.current[index + 1]?.focus();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if (!e.currentTarget.value && e.key === 'Backspace') {
            refArr.current[index - 1]?.focus();
        }
    }

    useEffect(() => {
        refArr.current[0]?.focus();
    }, []);

    return (
        <section className={'section-input'}>
            {otpInput.map((digit, index) => {
                return (
                    <input
                        className={'input-digit'}
                        type="text"
                        key={index}
                        value={digit}
                        onChange={(e) => onOtpDigitChange(e, index)}
                        ref={(input) => {
                            refArr.current[index] = input;
                        }}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                );
            })}
        </section>
    );
}
