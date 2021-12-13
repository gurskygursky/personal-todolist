import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8c4a0698-b08e-4693-b5a1-2d3805a6e1dc'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{ item: TodolistResponseType }>>>(`todo-lists`, {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<AuthParamsType>>('auth/me')
    }
}

export type AuthParamsType = {
    id: number,
    email: string,
    login: string,
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string,
}
export type TodolistResponseType= {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}