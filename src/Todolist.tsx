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
    changeTodolistTitle: (todolistID: string, newTitle: string) => void,
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void,
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
        console.log(newTitle)
    }

    const taskFilterAll = () => props.useTaskFilter("all", props.id);
    const taskFilterActive = () => props.useTaskFilter("active", props.id);
    const taskFilterCompleted = () => props.useTaskFilter("completed", props.id);

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolistTitle} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(props.id, task.id, newTitle);
                        }
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
                            <EditableSpan value={task.taskTitle} onChange={changeTaskTitle}/>
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
