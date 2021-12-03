import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";

type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    id: string,
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    todolistID: string,
    todolistTitle: string,
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string,
    todolistTitle: string,
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string,
    taskFilter: FilterValuesType,
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            return [...state, {id: action.todolistID, title: action.todolistTitle, filter: "all"}]
        case 'CHANGE_TODOLIST_TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.todolistTitle = action.todolistTitle;
            }
            return [...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.taskFilter = action.taskFilter;
            }
            return [...state];
        }
        default:
            // return state
        throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return (
        { type: 'REMOVE_TODOLIST', id: todolistID}
    ) as const
}
export const addTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return (
        { type: 'ADD_TODOLIST', todolistTitle, todolistID: v1()}
    ) as const
}
export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE_TODOLIST_TITLE', todolistTitle: todolistTitle, id: todolistID}
}
export const changeTodolistFilterAC = (todolistID: string, taskFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE_TODOLIST_FILTER', taskFilter: taskFilter, id: todolistID}
}