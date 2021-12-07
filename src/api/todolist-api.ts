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
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<{title: string}, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`todo-lists`, {title});
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
}

type TodolistType= {
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

