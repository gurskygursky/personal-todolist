import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodolistType = {
    id: string,
    todolistTitle: string,
    taskFilter: FilterValuesType,
}
export type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';


export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = (todolistTitle: string) => {
        // const action = AddTodolistAC(todolistTitle);
        dispatch(AddTodolistAC(todolistTitle));
    }
    const removeTodolist = (todolistID: string) => {
        // const action = RemoveTodolistAC(todolistID);
        dispatch(RemoveTodolistAC(todolistID));
    }
    const changeTodolistTitle = (todolistID: string, newTitle: string,) => {
        // const action = ChangeTodolistTitleAC(todolistID, newTitle);
        dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
    }
    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        // const action = ChangeTaskTitleAC(todolistID, taskID, newTitle);
        dispatch(ChangeTaskTitleAC(todolistID, taskID, newTitle))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        // const action = RemoveTaskAC(todolistID, taskID);
        dispatch(RemoveTaskAC(todolistID, taskID));
    }
    const addTask = (todolistID: string, newTaskTitle: string) => {
        // const action = AddTaskAC(todolistID, newTaskTitle);
        dispatch(AddTaskAC(todolistID, newTaskTitle));
    }
    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        // const action = ChangeTaskStatusAC(todolistID, taskID, isDone);
        dispatch(ChangeTaskStatusAC(todolistID, taskID, isDone));
    }
    const useTaskFilter = (todolistID: string, filterValue: FilterValuesType) => {
        // const action = ChangeTodolistFilterAC(todolistID, filterValue);
        dispatch(ChangeTodolistFilterAC(todolistID, filterValue));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let priorityTasks = tasks[tl.id]
                    let filteredTask = priorityTasks;

                    if (tl.taskFilter === "completed") {
                        filteredTask = priorityTasks.filter(task => task.isDone)
                    }
                    if (tl.taskFilter === "active") {
                        filteredTask = priorityTasks.filter(task => !task.isDone)
                    }
                        return <Todolist key={tl.id}
                                         todolistTitle={tl.todolistTitle}
                                         id={tl.id}
                                         tasks={filteredTask}
                                         removeTask={removeTask}
                                         useTaskFilter={useTaskFilter}
                                         addTask={addTask}
                                         changeTaskStatus={changeTaskStatus}
                                         removeTodolist={removeTodolist}
                                         taskFilter={tl.taskFilter}
                                         changeTodolistTitle={changeTodolistTitle}
                                         changeTaskTitle={changeTaskTitle}
                        />
                    }
                )
            }
        </div>
    );
}
