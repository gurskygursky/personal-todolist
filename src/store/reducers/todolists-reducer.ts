import {TodolistType} from "../../api/todolist-api";
import {FilterValuesType} from "../../features/todolist/Todolist";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOLISTS = 'SET-TODOLISTS'

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type TodolistsActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType;

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.id);
        case ADD_TODOLIST:
            return [{...action.todolist, filter: "all"}, ...state]
        case CHANGE_TODOLIST_TITLE: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case CHANGE_TODOLIST_FILTER: {
            const todolist = state.find(tl => tl.id === action.todolistID);
            if (todolist) {
                todolist.title = action.taskFilter;
            }
            return [...state];
        }
        case SET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => ({
    type: REMOVE_TODOLIST,
    id,
} as const);
export const addTodolistAC = (todolist: TodolistType) => ({
    type: ADD_TODOLIST,
    todolist
} as const);
export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    todolistID,
    title,
} as const);
export const changeTodolistFilterAC = (todolistID: string, taskFilter: FilterValuesType) => ({
    type: CHANGE_TODOLIST_FILTER,
    todolistID,
    taskFilter
} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: SET_TODOLISTS,
    todolists,
} as const);
