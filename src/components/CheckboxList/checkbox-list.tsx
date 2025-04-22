import jsonData from './data.json';
import {ChangeEvent, useEffect, useState} from "react";
import './checkbox-list.css';

export interface ListItem {
    id: number;
    text: string;
    children?: ListItem[];
    checked: boolean;
    parent?: ListItem;
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

    function changeParentStatus(listItem: ListItem) {
        for (let p = listItem?.parent; p !== null && p !== undefined; p = p?.parent) {
            // Recalculate parent's checked based on its children
            if (p.children) {
                p.checked = p.children.some(function (child: ListItem) {
                    return child.checked;
                });
            }
        }
    }

    function checkItemInList(listItems: ListItem[] | undefined, checkboxId: number): ListItem[] | undefined {
        return listItems?.map((item: ListItem) => {
            const {id, checked} = item;
            const {children} = item;
            if (id === checkboxId) {

                item.checked = !checked;
                item.children = applyToAllDescendants(children, !checked);
                changeParentStatus(item);
                return item;
            }
            return {
                ...item,
                children: checkItemInList(children, checkboxId),
            };

        });
    }

    function handleCheckboxClick(e: ChangeEvent<HTMLInputElement>) {
        const id = Number(e.target.value);
        const newList = checkItemInList(data, id);
        setData(newList);
    }

    function setParent(listItems: ListItem[] | undefined, parent?: ListItem): ListItem[] | undefined {
        if (!listItems) {
            return listItems;
        }
        return listItems.map(function (listItem: ListItem) {
            const currentItem: ListItem = {
                ...listItem,
                parent: parent,
                children: undefined  // We'll assign children after recursion
            };

            const updatedChildren = listItem.children
                ? setParent(listItem.children, currentItem)
                : listItem.children;

            return {
                ...currentItem,
                children: updatedChildren
            };
        });
    }

    useEffect(() => {
        const withParents = setParent(data);
        setData(withParents);
    }, []);


    function ListItem({tree}: { tree: ListItem[] | undefined }) {
        if (!tree) {
            return null;
        }
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
