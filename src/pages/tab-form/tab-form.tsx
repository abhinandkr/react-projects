// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './tab-bar.css';
import {useState} from "react";
import Profile from "./tabs/Profile.tsx";
import Interests from "./tabs/Interests.tsx";
import Settings from "./tabs/Settings.tsx";

export default function TabForm() {
    const tabs = [{
        id: 0,
        name: "Profile",
        component: Profile,
    }, {
        id: 1,
        name: "Interests",
        component: Interests,
    }, {
        id: 2,
        name: "Settings",
        component: Settings,
    }];

    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState({
        profile: {},
        interests: {},
        settings: {},
    });

    // @ts-expect-error aaa
    function onDataChange(key: string, value) {
        setData((data) => {
            return {
                ...data,
                [key]: value,
            };
        });
    }

    function handleTabChange(direction: number, tabData: object) {
        onDataChange(tabs[activeTab].name.toLowerCase(), tabData);
        setActiveTab((prev) => prev + direction);
    }

    function handleTabClick(fromIndex: number, toIndex: number, tabData: object) {
        onDataChange(tabs[fromIndex].name.toLowerCase(), tabData);
        setActiveTab(toIndex);
    }

    function TabBar() {
        return (
            <div className={'tab-bar'}>
                {tabs.map((tab, index) => {
                    return (
                        <div key={tab.id} className={`tab ${(tab.id === activeTab) ? 'active' : ''}`}
                             onClick={() => handleTabClick(activeTab, index, data[tabs[activeTab].name.toLowerCase()])}
                        >
                            {tab.name}
                        </div>
                    );
                })}
            </div>
        );
    }

    function TabBody() {
        const ActiveTabComponent = tabs[activeTab].component;
        return (
            <div className={'tab-body'}>
                <ActiveTabComponent data={data} onDataChange={onDataChange}/>
            </div>
        );
    }

    function NavigationButtons() {
        return (
            <span>
                 <button disabled={activeTab <= 0}
                         onClick={() => handleTabChange(-1, data[tabs[activeTab].name.toLowerCase()])}>
                     Prev
                 </button>

                <button disabled={activeTab >= tabs.length - 1}
                        onClick={() => handleTabChange(1, data[tabs[activeTab].name.toLowerCase()])}>
                    Next
                </button>
            </span>
        );
    }

    return (
        <>
            <TabBar/>
            <TabBody/>
            <NavigationButtons/>
        </>
    );
}
