import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

type TodolistPropsType = {
    id: string,
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (todolistID: string, taskID: string) => void,
    addTask: (todolistID: string, newTaskTitle: string) => void,
    taskFilter: FilterValuesType,
    changeTaskFilter: (todolistID: string, filterValue: FilterValuesType) => void,
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void,
    removeTodolist: (todolistID: string) => void,
    changeTodolistTitle: (todolistID: string, newTitle: string) => void,
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void,
}

export const Todolist = (props: TodolistPropsType) => {

    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(props.id, newTaskTitle)
    }, [props.addTask, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.id]);

    const universalFilter = (filterValue: FilterValuesType) => props.changeTaskFilter(props.id, filterValue);
    // const taskFilterAll = useCallback(() => props.changeTaskFilter(props.id, "all"),
    //     [props.changeTaskFilter, props.id]);
    // const taskFilterActive = useCallback(() => props.changeTaskFilter(props.id, "active"),
    //     [props.changeTaskFilter, props.id]);
    // const taskFilterCompleted = useCallback(() => props.changeTaskFilter(props.id, "completed"),
    //     [props.changeTaskFilter, props.id]);

    let filteredTask = props.tasks;
    if (props.taskFilter === "completed") {
        filteredTask = props.tasks.filter(task => task.isDone)
    }
    if (props.taskFilter === "active") {
        filteredTask = props.tasks.filter(task => !task.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={props.todolistTitle} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    filteredTask.map(task => <Task
                            key={task.id}
                            task={task}
                            todolistID={props.id}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                        />)
                }
                {/*{*/}
                {/*    filteredTask.map(task => {*/}
                {/*        const changeTaskTitle = (newTitle: string) => {*/}
                {/*            props.changeTaskTitle(props.id, task.id, newTitle);*/}
                {/*        }*/}
                {/*        const removeTask = () => {*/}
                {/*            props.removeTask(props.id, task.id);*/}
                {/*        }*/}
                {/*        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {*/}
                {/*            const isDoneValue = event.currentTarget.checked;*/}
                {/*            props.changeTaskStatus(props.id, task.id, isDoneValue)*/}
                {/*        }*/}
                {/*        return <li key={task.id} className={task.isDone ? "is-done" : ""}>*/}
                {/*            <input type="checkbox"*/}
                {/*                   checked={task.isDone}*/}
                {/*                   onChange={taskStatusHandler}*/}
                {/*            />*/}
                {/*            <EditableSpan value={task.taskTitle} onChange={changeTaskTitle}/>*/}
                {/*            <button onClick={removeTask}>x</button>*/}
                {/*        </li>*/}
                {/*    })*/}
                {/*}*/}
            </ul>
            <div>
                <button className={props.taskFilter === "all" ? "active-filter" : ""}
                        onClick={() => universalFilter("all")}>All
                </button>
                <button className={props.taskFilter === "active" ? "active-filter" : ""}
                        onClick={() => universalFilter("active")}>Active
                </button>
                <button className={props.taskFilter === "completed" ? "active-filter" : ""}
                        onClick={() => universalFilter("completed")}>Completed
                </button>
            </div>
        </div>
    );
}
