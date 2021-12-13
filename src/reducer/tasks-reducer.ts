import {TasksType} from "../AppWithRedux";
import {RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {TaskType, todolistAPI} from "../api/todolist-api";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const SET_TASKS = 'SET-TASKS'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistID: string,
    taskID: string,
}
// export type AddTaskActionType = {
//     type: 'ADD-TASK',
//     todolistID: string,
//     taskTitle: string,
// }
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistID: string,
    taskID: string,
    title: string,
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolistID: string,
    title: string
}

export type ActionsType = RemoveTaskActionType
    | ReturnType<typeof AddTaskAC>
    // | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof SetTasksAC>;

const initialState: TasksType = {}
export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
    const copyState = {...state}

    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]:
                    [action.task, ...state[action.task.todoListId]]
            }
        // case ADD_TASK:
        //     return {
        //         ...state,
        //         [action.todolistID]: [{
        //             id: v1(),
        //             title: action.taskTitle,
        //             isDone: false
        //         }, ...state[action.todolistID]]
        //     }
        case CHANGE_TASK_STATUS: {
            const todolistTasks = state[action.todolistID]
            state[action.todolistID] = todolistTasks
                .map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }
        case CHANGE_TASK_TITLE: {
            const todolistTasks = state[action.todolistID]
            state[action.todolistID] = todolistTasks
                .map(task => task.id === action.taskID
                    ? {...task, taskTitle: action.title}
                    : task)
            return ({...state})
        }
        case ADD_TODOLIST:
            return {...state, [action.todolistID]: []}
        case REMOVE_TODOLIST:
            delete copyState[action.id]
            return copyState
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

export const RemoveTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: REMOVE_TASK,
        todolistID,
        taskID,
    }
}
export const AddTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

// export const AddTaskAC = (todolistID: string, taskTitle: string): AddTaskActionType => {
//     return {
//         type: ADD_TASK,
//         todolistID,
//         taskTitle,
//     }
// }
export const ChangeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: CHANGE_TASK_STATUS,
        todolistID,
        taskID,
        isDone,
    }
}
export const ChangeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistID,
        taskID,
        title,
    }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        todolistID: v1(),
        title,
    }
}
export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: REMOVE_TODOLIST,
        id,
    }
}
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: SET_TASKS, todolistId, tasks} as const)


//thunk

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = SetTasksAC(todolistId, tasks)
                dispatch(action)
            })
    }
}


