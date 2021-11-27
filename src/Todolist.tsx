import React from "react";

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void,
}
type TaskType = {
    id: number,
    taskTitle: string,
    isDone: boolean,
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.taskTitle}</span>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                    </li>)
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
