import React, {memo, useCallback, useReducer, useState} from 'react';
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


export const AppWithRedux = React.memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((todolistTitle: string) => {
        // const action = AddTodolistAC(todolistTitle);
        dispatch(AddTodolistAC(todolistTitle));
    }, []);
    const removeTodolist = useCallback((todolistID: string) => {
        // const action = RemoveTodolistAC(todolistID);
        dispatch(RemoveTodolistAC(todolistID));
    }, []);
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string,) => {
        // const action = ChangeTodolistTitleAC(todolistID, newTitle);
        dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
    }, []);
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        // const action = ChangeTaskTitleAC(todolistID, taskID, newTitle);
        dispatch(ChangeTaskTitleAC(todolistID, taskID, newTitle))
    }, []);
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        // const action = RemoveTaskAC(todolistID, taskID);
        dispatch(RemoveTaskAC(todolistID, taskID));
    }, []);
    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        // const action = AddTaskAC(todolistID, newTaskTitle);
        dispatch(AddTaskAC(todolistID, newTaskTitle));
    }, []);
    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        // const action = ChangeTaskStatusAC(todolistID, taskID, isDone);
        dispatch(ChangeTaskStatusAC(todolistID, taskID, isDone));
    }, []);
    const changeTaskFilter = useCallback((todolistID: string, filterValue: FilterValuesType) => {
        // const action = ChangeTodolistFilterAC(todolistID, filterValue);
        dispatch(ChangeTodolistFilterAC(todolistID, filterValue));
    }, []);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    // let filteredTask = allTodolistTasks;
                    //
                    // if (tl.taskFilter === "completed") {
                    //     filteredTask = allTodolistTasks.filter(task => task.isDone)
                    // }
                    // if (tl.taskFilter === "active") {
                    //     filteredTask = allTodolistTasks.filter(task => !task.isDone)
                    // }
                        return <Todolist key={tl.id}
                                         todolistTitle={tl.todolistTitle}
                                         id={tl.id}
                                         tasks={allTodolistTasks}
                                         removeTask={removeTask}
                                         changeTaskFilter={changeTaskFilter}
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
});
