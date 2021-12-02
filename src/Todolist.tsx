import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    id: string,
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todolistID: string) => void,
    addTask: (newTaskTitle: string, todolistID: string) => void,
    taskFilter: FilterValuesType,
    useTaskFilter: (filterValue: FilterValuesType, todolistID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void,
    removeTodolist: (todolistID: string) => void,
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    // let [newTaskTitle, setNewTaskTitle] = useState("");
    // let [error, setError] = useState<string | null>(null);

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    // }
    // const addTask = () => {
    //     if (newTaskTitle.trim() !== "") {
    //         props.addTask(newTaskTitle, props.id);
    //         setNewTaskTitle("");
    //     } else {
    //         setError("Title is required!")
    //     }
    // }
    // const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (event.key === "Enter") {
    //         addTask()
    //     }
    // }
    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
        console.log(newTitle)
    }

    const taskFilterAll = () => props.useTaskFilter("all", props.id);
    const taskFilterActive = () => props.useTaskFilter("active", props.id);
    const taskFilterCompleted = () => props.useTaskFilter("completed", props.id);

    return (
        <div>
            <h3>
                {/*{props.todolistTitle}*/}
                <EditableSpan value={props.todolistTitle} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input className={error ? "error" : ""}*/}
            {/*           value={newTaskTitle}*/}
            {/*           onChange={onChangeHandler}*/}
            {/*           onKeyPress={onKeyPress}/>*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className={"error-message"}>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const isDoneValue = event.currentTarget.checked;
                            props.changeTaskStatus(task.id, isDoneValue, props.id)
                        }
                        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={taskStatusHandler}
                            />
                            <span>{task.taskTitle}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.taskFilter === "all" ? "active-filter" : ""} onClick={taskFilterAll}>All
                </button>
                <button className={props.taskFilter === "active" ? "active-filter" : ""}
                        onClick={taskFilterActive}>Active
                </button>
                <button className={props.taskFilter === "completed" ? "active-filter" : ""}
                        onClick={taskFilterCompleted}>Completed
                </button>
            </div>
        </div>
    );
}
