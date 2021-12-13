import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/todolist/Todolist";
import {AddItemForm} from "../components/input/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, TodolistDomainType,
} from "../store/reducers/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../store/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TaskType} from '../api/todolist-api';
import {Todolists} from "../features/todolists/Todolists";

export type TodolistType = {
    id: string,
    todolistTitle: string,
    taskFilter: FilterValuesType,
}
// export type TaskType = {
//     id: string,
//     taskTitle: string,
//     isDone: boolean,
// }
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';


export const App = React.memo(() => {

    // useEffect(() => {
    //     dispatch(fetchTodolistsTC)
    // })
    //
    // const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    // const dispatch = useDispatch();
    //
    // // const addTodolist = useCallback((todolistTitle: string) => {
    // //     dispatch(AddTodolistAC);
    // // }, []);
    // const addTodolist = useCallback((title: string) => {
    //     dispatch(AddTodolistTC)
    // }, [dispatch]);
    // const removeTodolist = useCallback((todolistID: string) => {
    //     dispatch(RemoveTodolistAC(todolistID));
    // }, []);
    // const changeTodolistTitle = useCallback((todolistID: string, newTitle: string,) => {
    //     dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
    // }, []);
    // const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
    //     dispatch(ChangeTaskTitleAC(todolistID, taskID, newTitle))
    // }, []);
    // const removeTask = useCallback((todolistID: string, taskID: string) => {
    //     dispatch(RemoveTaskAC(todolistID, taskID));
    // }, []);
    // const addTask = useCallback((todolistId: string) => {
    //     dispatch(AddTaskAC);
    // }, []);
    // const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
    //     dispatch(ChangeTaskStatusAC(todolistID, taskID, isDone));
    // }, []);
    // const changeTaskFilter = useCallback((todolistID: string, filterValue: FilterValuesType) => {
    //     dispatch(ChangeTodolistFilterAC(todolistID, filterValue));
    // }, []);

    return (
        <div className="App">
            <div>
                <button>
                    Login
                </button>
            </div>
            <div>
                <Todolists/>
            </div>
            {/*<AddItemForm addItem={addTodolist}/>*/}
            {/*{*/}
            {/*    todolists.map(tl => {*/}
            {/*            let allTodolistTasks = tasks[tl.id]*/}
            {/*            return <Todolist key={tl.id}*/}
            {/*                             todolistTitle={tl.title}*/}
            {/*                             id={tl.id}*/}
            {/*                             tasks={allTodolistTasks}*/}
            {/*                             removeTask={removeTask}*/}
            {/*                             changeTaskFilter={changeTaskFilter}*/}
            {/*                             addTask={addTask}*/}
            {/*                             changeTaskStatus={changeTaskStatus}*/}
            {/*                             removeTodolist={removeTodolist}*/}
            {/*                             taskFilter={tl.filter}*/}
            {/*                             changeTodolistTitle={changeTodolistTitle}*/}
            {/*                             changeTaskTitle={changeTaskTitle}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
});