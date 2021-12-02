import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type TodolistType = {
    id: string,
    todolistTitle: string,
    taskFilter: FilterValuesType,
}
export type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';


export function App() {

    const removeTask = (taskID: string, todolistID: string) => {
        const removedTasks = tasks[todolistID]
        tasks[todolistID] = removedTasks.filter(task => task.id !== taskID);
        setTasks({...tasks});
    }
    const addTask = (newTaskTitle: string, todolistID: string) => {
        const task = {id: v1(), taskTitle: newTaskTitle, isDone: false};
        const newTasks = tasks[todolistID];
        tasks[todolistID] = [task, ...newTasks];
        setTasks({...tasks});
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        const task = tasks[todolistID].find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID];
        setTasks({...tasks})
    }

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), taskTitle: "HTML & CSS", isDone: true},
            {id: v1(), taskTitle: "Javascript", isDone: false},
            {id: v1(), taskTitle: "Typescript", isDone: true},
            {id: v1(), taskTitle: "React", isDone: true},
            {id: v1(), taskTitle: "Rest API", isDone: true},
            {id: v1(), taskTitle: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), taskTitle: "1984", isDone: true},
            {id: v1(), taskTitle: "The Financier", isDone: true},
            {id: v1(), taskTitle: "The Stoic", isDone: true},
            {id: v1(), taskTitle: "The Titan", isDone: true},
            {id: v1(), taskTitle: "The Double", isDone: true},
            {id: v1(), taskTitle: "The Master and Margarita", isDone: false},
        ]
    });

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistID1,
            todolistTitle: "What to learn",
            taskFilter: "all",
        },
        {
            id: todolistID2,
            todolistTitle: "Reading list",
            taskFilter: "all",
        },
    ]);

    const useTaskFilter = (filterValue: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.taskFilter = filterValue;
            setTodolists([...todolists])
        }
    }
    const addTodolist = (todolistTitle: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {
            id: newTodolistID,
            todolistTitle,
            taskFilter: "all"
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []})
    }
    const changeTodolistTitle = (todolistID: string, newTitle: string,) => {
        const todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.todolistTitle = newTitle;
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let filteredTask = allTodolistTasks;

                        if (tl.taskFilter === "completed") {
                            filteredTask = allTodolistTasks.filter(task => task.isDone)
                        }
                        if (tl.taskFilter === "active") {
                            filteredTask = allTodolistTasks.filter(task => !task.isDone)
                        }

                        return <Todolist key={tl.id}
                                         todolistTitle={tl.todolistTitle}
                                         id={tl.id}
                                         tasks={filteredTask}
                                         removeTask={removeTask}
                                         useTaskFilter={useTaskFilter}
                                         addTask={addTask}
                                         changeTaskStatus={changeTaskStatus}
                                         removeTodolist={removeTodolist}
                                         taskFilter={tl.taskFilter}
                                         changeTodolistTitle={changeTodolistTitle}
                        />
                    }
                )
            }
        </div>
    );
}
