import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask()
        }
    }

    const taskFilterAll = () => props.useTaskFilter("all");
    const taskFilterActive = () => props.useTaskFilter("active");
    const taskFilterCompleted = () => props.useTaskFilter("completed");

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyPress={onKeyPress}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id)
                        }
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.taskTitle}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={taskFilterAll}>All</button>
                <button onClick={taskFilterActive}>Active</button>
                <button onClick={taskFilterCompleted}>Completed</button>
            </div>
        </div>
    );
}
