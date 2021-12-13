import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {ChangeTodolistFilterAC, TodolistDomainType} from "../../store/reducers/todolists-reducer";
import {FilterValuesType, TasksType} from "../../app/App";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from '../../store/thunk/thunk';
import {Todolist} from "../todolist/Todolist";
import {AddItemForm} from "../../components/input/AddItemForm";


export const Todolists: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((id: string) => {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])


    return <div>
        <AddItemForm addItem={addTodolist}/>
        <div>
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
                        />)
                })
            }
        </div>
    </div>
}
