import React from 'react';

const Individual = ({item,groupIndex, itemIndex, handleDragEnter, handleDragStart, dragging}) => {
    return (
        <div draggable onDragStart={(e) => handleDragStart(e, { groupIndex, itemIndex })} onDragEnter={dragging ? (e) => handleDragEnter(e, { groupIndex, itemIndex }) : null} key={item.id} className="task-item">
            {item.name}
        </div>
    );
};

export default Individual;