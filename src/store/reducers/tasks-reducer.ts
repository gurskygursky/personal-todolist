import {RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const SET_TASKS = 'SET-TASKS'
const UPDATE_TASK = 'UPDATE-TASK'
const SET_TODOLISTS = 'SET-TODOLISTS'

// export type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     todolistID: string
//     taskID: string
//     isDone: boolean
// }
// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE',
//     todolistID: string,
//     taskID: string,
//     title: string,
// }
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolistID: string,
    title: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    const copyState = {...state}

    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        case ADD_TASK:
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.task.title,
                status: TaskStatuses.New,
                todolistId: action.task.todolistId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            const tasks = stateCopy[action.task.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.task.todolistId] = newTasks;
            return stateCopy;
        // return {
        //     ...state,
        //     [action.task.todolistId]:
        //         [action.task, ...state[action.task.todolistId]]
        // }
        case UPDATE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID ? {...task, ...action.model} : task)
            }
        case ADD_TODOLIST:
            return {...state, [action.todolistID]: []}
        case REMOVE_TODOLIST:
            delete copyState[action.id]
            return copyState
        case SET_TASKS:
            return {...state, [action.todolistID]: action.tasks}
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string) => ({type: REMOVE_TASK, todolistID, taskID} as const);
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task} as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) =>
    ({type: UPDATE_TASK, todolistID, taskID, model} as const)
export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) =>
    ({type: SET_TASKS, todolistID, tasks} as const)


// export const AddTaskAC = (todolistID: string, taskTitle: string): AddTaskActionType => {
//     return {
//         type: ADD_TASK,
//         todolistID,
//         taskTitle,
//     }
// }
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => ({
    type: CHANGE_TASK_STATUS,
    todolistID,
    taskID,
    status,
} as const);
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
    type: CHANGE_TASK_TITLE,
    todolistID,
    taskID,
    title,
} as const);
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