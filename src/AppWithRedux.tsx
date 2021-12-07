import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/input/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./reducer/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducer/store";

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
        dispatch(AddTodolistAC(todolistTitle));
    }, []);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID));
    }, []);
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string,) => {
        dispatch(ChangeTodolistTitleAC(todolistID, newTitle));
    }, []);
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistID, taskID, newTitle))
    }, []);
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(RemoveTaskAC(todolistID, taskID));
    }, []);
    const addTask = useCallback((todolistID: string, newTaskTitle: string) => {
        dispatch(AddTaskAC(todolistID, newTaskTitle));
    }, []);
    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todolistID, taskID, isDone));
    }, []);
    const changeTaskFilter = useCallback((todolistID: string, filterValue: FilterValuesType) => {
        dispatch(ChangeTodolistFilterAC(todolistID, filterValue));
    }, []);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
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
