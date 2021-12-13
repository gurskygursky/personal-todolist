import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";
import {
    ActionsType,
    AddTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    SetTodolistsAC
} from "../reducers/todolists-reducer";

//todolist-thunk
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(SetTodolistsAC(res.data))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistID))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(id, title))
            })
    }
}