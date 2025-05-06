import React from "react";
import {useSelector} from 'react-redux'

function Content() {
    const todoList = useSelector(state => state.todo.toList);
    const sortedTodoList = [...todoList];
    console.log(todoList);
    return (
        <div>
            {sortedTodoList && sortedTodoList.legth > 0
            ? sortedTodoList.map((todo) => todo.title)
            : 'no todo found'}
        </div>
    )
}

export default Content;