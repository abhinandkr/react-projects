// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import jsonData from './data.json';
import {useState} from "react";
import './file-explorer.css';
import addIcon from './add-icon.png';
import deleteIcon from './delete.png';

export default function FileExplorer() {

    function ListItem({list}) {
        const [isExpanded, setExpanded] = useState({});

        function onExpandClick(id: number) {
            setExpanded((prev) => {
                const currentExpandedState = prev[id];
                return {
                    ...prev,
                    [id]: !currentExpandedState,
                };
            });
        }

        return (
            <div className={'container'}>
                {list.map((item) => {
                    const {id, name, children, isFolder} = item;
                    return (
                        <div key={id}>
                            <div className={`div-name ${isFolder ? 'span-folder' : ''}`}
                                 onClick={() => onExpandClick(id)}>
                                {isFolder && <div>{isExpanded[id] ? '-' : '+'}</div>}
                                <div>{name}</div>
                                {isFolder && <div className={'div-folder'}><img onClick={() => addItemToList(id)}
                                                                                className={'img-icon'}
                                                                                src={addIcon}
                                                                                alt={'Add folder'}/>
                                </div>}
                                <img onClick={() => deleteItemFromList(id)}
                                     className={'img-icon'}
                                     src={deleteIcon}
                                     alt={'Delete folder'}/>
                            </div>
                            {isExpanded[id] && isFolder && children && children.length && <ListItem list={children}/>}
                        </div>
                    );
                })}
            </div>
        );
    }

    function addItemToList(parentId) {
        const name = prompt('Enter folder name');
        setData((prev) => addToTree(prev, parentId, name));
    }

    function deleteItemFromList(parentId) {
        setData((prev) => deleteFromTree(prev, parentId));
    }

    function addToTree(list, parentId: number, newName: string) {
        return list.map((item) => {
            const {id, isFolder, children} = item;
            if (id === parentId) {
                return {
                    ...item,
                    children: [
                        ...children,
                        {
                            id: (new Date()).getTime(),
                            isFolder: true,
                            children: [],
                            name: newName,
                        }
                    ]
                }
            }
            if (isFolder && children) {
                return {
                    ...item,
                    children: addToTree(children, parentId, newName),
                }
            }
            return item;
        });
    }

    function deleteFromTree(list, parentId: number) {
        return list
            .filter((item) => item.id !== parentId)
            .map((item) => {
                const {isFolder, children} = item;
                if (isFolder && children) {
                    return {
                        ...item,
                        children: deleteFromTree(children, parentId),
                    }
                }
                return item;
            });
    }


    const [data, setData] = useState(jsonData);

    return (
        <div className={'div-file-explorer'}>
            <ListItem list={data}/>
        </div>
    );
}
