import React, { useRef, useState } from 'react';
import './Todo.css'
const Todo = ({ item }) => {
    const [list, setList] = useState(item);
    const [dragging, setDragging] = useState(false);
    const [state, setState] = useState('');
    const [taskItem, setTaskItem] = useState({});
    const dragItem = useRef();
    const dragTask = useRef()

    const addToDb = ({ groupIndex, ItemIndex }) => {
        
        if (groupIndex === 0) setState('To Do');
        else if (groupIndex === 1) setState('In Progress');
        else setState('Done');

        list.forEach(element => {
            if (element.state === state) {
                const newList = [...element.items];
                newList.push(element.items[0]);
                setTaskItem(newList);
                console.log(taskItem);
                fetch(`http://localhost:5000/update?state=${state}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ taskItem })
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
            }
        });
    }

    const handleDragStart = (e, params) => {
        console.log(params, "dragging");
        dragItem.current = params;
        dragTask.current = e.target;
        dragTask.current.style.opacity = 0.3;
        dragTask.current.addEventListener('dragend', handleDragEnd);
        setDragging(true);
    }
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem)
        const currentItem = dragItem.current;
        if (e.target !== dragItem) {
            console.log("target is not the same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[targetItem.groupIndex].items.splice(targetItem.itemIndex, 0, newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0]);
                dragItem.current = targetItem;
                return newList;
            })
        }
    }
    const handleDragEnd = () => {
        addToDb(dragItem.current);
        dragTask.current.style.opacity = 1;
        setDragging(false);
        dragTask.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragTask.current = null;
    }

    return (
        <div className="container">
            {list.map((group, groupIndex) => (
                <div className="col" key={group.state} onDragEnter={dragging && !group.items.length ? (e) => handleDragEnter(e, { groupIndex, itemIndex: 0 }) : null}>
                    <h2 className="header">{group.state}</h2>
                    {group.items.map((item, itemIndex) => (
                        <div draggable onDragStart={(e) => handleDragStart(e, { groupIndex, itemIndex })} onDragEnter={dragging ? (e) => handleDragEnter(e, { groupIndex, itemIndex }) : null} key={item.id} className="task-item">
                            {item.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Todo;