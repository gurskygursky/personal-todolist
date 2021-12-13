import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, todolistAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistsActionsType
} from "../reducers/todolists-reducer";
import {AppRootStateType} from "../store";
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    TasksActionType,
    UpdateDomainTaskModelType, updateTaskAC,
} from "../reducers/tasks-reducer";

type ActionsType = TasksActionType | TodolistsActionsType;

//todolist-thunk
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(removeTodolistAC(todolistID))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}
// thunk tasks
export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTasks(todolistID)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(todolistID, tasks)
            dispatch(action)
        })
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(todolistID, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistAPI.updateTask(todolistID, taskID, apiModel)
            .then(res => {
                dispatch(updateTaskAC(res.data.data.item.todolistId, res.data.data.item.id, res.data.data.item))
            })
    }