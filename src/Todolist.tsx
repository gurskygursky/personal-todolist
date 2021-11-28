import React, {ChangeEvent, useState} from "react";

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string) => void,
    addTask: (newTaskTitle: string) => void,
    useTaskFilter: (filterValue: "all" | "active" | "completed") => void,
}
type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
}

export const Todolist = (props: TodolistPropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler}/>
                <button onClick={() => props.addTask(newTaskTitle)}>+</button>
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
                <button onClick={() => props.useTaskFilter("all")}>All</button>
                <button onClick={() => props.useTaskFilter("active")}>Active</button>
                <button onClick={() => props.useTaskFilter("completed")}>Completed</button>
            </div>
        </div>
    );
}
