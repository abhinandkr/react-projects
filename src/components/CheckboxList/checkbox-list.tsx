import jsonData from './data.json';
import {ChangeEvent, useEffect, useState} from "react";
import './checkbox-list.css';

export interface ListItem {
    id: number;
    text: string;
    children?: ListItem[] | undefined;
    checked: boolean;
}

export default function CheckboxList() {
    const [data, setData] = useState<ListItem[] | undefined>(jsonData);

    function applyToAllDescendants(items: ListItem[] | undefined, newChecked: boolean): ListItem[] | undefined {
        return items?.map((child) => ({
            ...child,
            checked: newChecked,
            children: applyToAllDescendants(child.children, newChecked),
        }));
    }

    function checkItemInList(listItems: ListItem[] | undefined, parentId: number, ancestorChecked: boolean = false): ListItem[] | undefined {
        return listItems?.map((item: ListItem) => {
            const {id, checked} = item;
            let {children} = item;
            if (id === parentId) {
                if (children?.length) {
                    children = children.map((c) => {
                        return {
                            ...c,
                            checked: !checked,
                            children: checkItemInList(c.children, parentId, !checked),
                        };
                    });
                }
                return {
                    ...item,
                    checked: !checked,
                    children
                }
            }
                // else if (children?.find((c: ListItem) => c.id === parentId)) {
                //     const allChildrenChecked = children?.every((c: ListItem) => c.checked);
                //     const allChildrenUnchecked = children?.every((c: ListItem) => !c.checked);
                //     let c = ancestorChecked;
                //     if (allChildrenChecked) {
                //         c = false;
                //     }
                //     // else if (allChildrenUnchecked) {
                //     //     c = true;
                //     // }
                //     return {
                //         ...item,
                //         checked: c,
                //         children: checkItemInList(children, parentId),
                //     };
            // }
            else {
                return {
                    ...item,
                    children: checkItemInList(children, parentId),
                };
            }
        });
    }

    function handleCheckboxClick(e: ChangeEvent<HTMLInputElement>) {
        const id = Number(e.target.value);
        setData((prev) => checkItemInList(prev, id));
    }

    useEffect(() => {

    }, [data]);


    function ListItem({tree}: { tree: ListItem[] }) {
        return (
            <div className={'section'}>
                {
                    tree.map(({id, text, children, checked}) => {
                        return (
                            <div key={id} style={{display: 'flex', flexDirection: 'column'}}>
                                <div className={'div-checkbox-row'}>
                                    <input
                                        type={'checkbox'}
                                        name={text}
                                        value={id}
                                        className={'input-checkbox'}
                                        checked={checked}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxClick(e)}
                                    />
                                    <label htmlFor={text}>{text}</label>
                                </div>
                                {children && children?.length > 0 && <ListItem tree={children}/>}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <>
            <ListItem tree={data}/>
        </>
    );

}
