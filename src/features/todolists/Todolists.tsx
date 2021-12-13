import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {changeTodolistFilterAC, TodolistDomainType} from "../../store/reducers/todolists-reducer";
import {
    addTaskTC,
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTaskTC,
    removeTodolistTC,
    updateTaskTC,
} from '../../store/thunk/thunk';
import {FilterValuesType, Todolist} from "../todolist/Todolist";
import {AddItemForm} from "../../components/input/AddItemForm";
import { TaskStatuses } from '../../api/todolist-api';
import {TasksStateType} from "../../store/reducers/tasks-reducer";


export const Todolists: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }, []);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, []);
    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistID, title))
    }, []);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch]);
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskTC(todolistID, taskID));
    }, []);
    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title));
    }, []);
    const changeTaskStatus = useCallback((todolistID: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskID, {status}))
    }, []);
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskID, {title: newTitle}))
    }, []);

    return <div>
        <AddItemForm addItem={addTodolist}/>
        <ul>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return (
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={allTodolistTasks}
                            changeFilter={changeFilter}
                            taskFilter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                        />)
                })
            }
        </ul>
    </div>
}
