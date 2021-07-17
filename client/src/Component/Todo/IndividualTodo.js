import React from 'react';
import './IndividualTodo.css'
const IndividualTodo = ({ item }) => {
    const {name} = item;
    console.log(item.name)
    return (
        <div>
            <p draggable="true" className="task-item">{name}</p>
        </div>
    );
};

export default IndividualTodo;