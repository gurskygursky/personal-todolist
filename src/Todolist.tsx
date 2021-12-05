import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    id: string,
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (todolistID: string, taskID: string) => void,
    addTask: (todolistID: string, newTaskTitle: string) => void,
    taskFilter: FilterValuesType,
    useTaskFilter: (todolistID: string, filterValue: FilterValuesType) => void,
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void,
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

    const taskFilterAll = () => props.useTaskFilter( props.id,"all");
    const taskFilterActive = () => props.useTaskFilter( props.id,"active");
    const taskFilterCompleted = () => props.useTaskFilter( props.id,"completed");

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
                            props.changeTaskStatus(props.id, task.id, isDoneValue)
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
