import {FilterValuesType} from "../AppWithRedux";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistAPI, TodolistResponseType} from "../api/todolist-api";
import {TodolistType} from "../AppWithRedux";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const SET_TODOLISTS = 'SET-TODOLISTS'


// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     todolistID: string,
// }
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     todolistID: string,
// }
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todolistID: string,
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistID: string,
    taskFilter: FilterValuesType,
}
// export type SetTodolistsActionType = {
//     type: 'SET-TODOLISTS'
//     todolists: Array<TodolistType>
// }

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>;
export type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType;

export type TodolistDomainType = TodolistResponseType & {
    filter: FilterValuesType,
}


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(td => td.id !== action.todolistID);
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

export const RemoveTodolistAC = (todolistID: string) => ({
    type: REMOVE_TODOLIST,
    todolistID,
} as const);
export const AddTodolistAC = (todolist: TodolistResponseType) => ({
    type: ADD_TODOLIST,
    todolist
} as const);
export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        title,
        todolistID,
    }
}
export const ChangeTodolistFilterAC = (todolistID: string, taskFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        todolistID,
        taskFilter,
    }
}
export const SetTodolistsAC = (todolists: Array<TodolistResponseType>) => ({
    type: 'SET-TODOLISTS',
    todolists,
} as const);


// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(SetTodolistsAC(res.data))
            })
    }
}

export const AddTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
            })
    }
}