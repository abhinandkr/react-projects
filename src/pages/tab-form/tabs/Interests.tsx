import {useEffect, useState} from "react";

export default function Interests({data, onDataChange}) {

    const {interests} = data;

    const allCurricularInterests = ['JS', 'Python'];
    const allExtraCurricularInterests = ['Cooking', 'Basketball', 'Gym'];

    const [formData, setFormData] = useState({
        curricularInterests: interests.curricularInterests || [],
        extraCurricularInterests: interests.extraCurricularInterests || [],
    });

    useEffect(() => {
        setFormData({
            curricularInterests: interests.curricularInterests || [],
            extraCurricularInterests: interests.extraCurricularInterests || [],
        });
    }, [interests]);

    function handleCurricularChange(event) {
        const {name} = event.target;

        setFormData((prev) => {
            const {curricularInterests} = formData;
            if (curricularInterests.includes(name)) {
                return {
                    ...prev,
                    curricularInterests: prev.curricularInterests.filter(p => p !== name),
                }
            }
            return {
              ...prev,
              curricularInterests: [...prev.curricularInterests, name],
            };
        });
    }

    function handleExtraCurricularChange(event) {
        const {name} = event.target;

        setFormData((prev) => {
            const {extraCurricularInterests} = formData;
            if (extraCurricularInterests.includes(name)) {
                return {
                    ...prev,
                    extraCurricularInterests: prev.extraCurricularInterests.filter(p => p !== name),
                }
;            }
            return {
                ...prev,
                extraCurricularInterests: [...prev.extraCurricularInterests, name],
            };
        });
    }

    function handleBlur(event) {
        onDataChange("interests", formData);
    }

    return (
        <>
            <form>
                {allCurricularInterests.map((interest) => {
                    return (
                        <div key={interest}>
                            <input type={'checkbox'} name={interest}
                                   checked={formData.curricularInterests.includes(interest)}
                                   onChange={handleCurricularChange}
                                   onMouseLeave={handleBlur}
                            />
                            <label htmlFor={interest}>{interest}</label>
                        </div>
                    );
                })}
                <br />
                {allExtraCurricularInterests.map((interest) => {
                    return (
                        <div key={interest}>
                            <input type={'checkbox'} name={interest}
                                   checked={formData.extraCurricularInterests.includes(interest)}
                                   onChange={handleExtraCurricularChange}
                                   onMouseLeave={handleBlur}
                            />
                            <label htmlFor={interest}>{interest}</label>
                        </div>
                    );
                })}
            </form>
        </>
    );
}
