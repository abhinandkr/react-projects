// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useEffect, useState} from "react";

export default function Profile({data, onDataChange}) {
    const {profile} = data;

    const [formData, setFormData] = useState({
        name: profile.name || '',
        age: profile.age || '',
        email: profile.email || ''
    });

    // Sync local state when data changes (e.g., switching tabs)
    useEffect(() => {
        setFormData({
            name: profile.name || "",
            age: profile.age || "",
            email: profile.email || "",
        });
    }, [profile]);

    useEffect(() => {
        // return () => {
        //     onDataChange('profile', formData);
        // }
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }


    function handleBlur(event) {
        // const {name, value} = event.target;
        // onDataChange("profile", {...profile, [name]: value});
    }

    return (
        <>
            <form>
                <label htmlFor="name">Name</label>&nbsp;
                <input type="text" id="name" name="name" value={formData.name}
                       onChange={handleChange} onBlur={handleBlur}/><br/>
                <label htmlFor="age">Age</label>&nbsp;
                <input type="number" id="age" name="age" value={formData.age}
                       onChange={handleChange} onBlur={handleBlur}/><br/>
                <label htmlFor="email">Email</label>&nbsp;
                <input type="text" id="email" name="email" value={formData.email}
                       onChange={handleChange} onBlur={handleBlur}/><br/>
            </form>
        </>
    );
}
