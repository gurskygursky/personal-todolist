import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {FilterValuesType, Todolist, TodolistType} from "./Todolist";

export function App() {

    const removeTask = (taskID: string) => {
        const removedTasks = tasks.filter(task => task.id !== taskID);
        setTasks(removedTasks);
    }
    const addTask = (newTaskTitle: string) => {
        const task = {id: v1(), taskTitle: newTaskTitle, isDone: false};
        const newTasks = [task, ...tasks];
        setTasks(newTasks);
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const task = tasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    let [tasks, setTasks] = useState([
        {id: v1(), taskTitle: "HTML & CSS", isDone: true},
        {id: v1(), taskTitle: "Javascript", isDone: false},
        {id: v1(), taskTitle: "Typescript", isDone: true},
        {id: v1(), taskTitle: "React", isDone: true},
        {id: v1(), taskTitle: "Rest API", isDone: true},
        {id: v1(), taskTitle: "Redux", isDone: true},
    ]);

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: v1(),
            todolistTitle: "todolist1",
            taskFilter: "all",
        },
        {
            id: v1(),
            todolistTitle: "todolist2",
            taskFilter: "all",
        },
    ]);

    // let [taskFilter, setTaskFilter] = useState<FilterValuesType>("all");

    // let filteredTask = tasks;
    //
    // if (taskFilter === "completed") {
    //     filteredTask = tasks.filter(task => task.isDone)
    // }
    // if (taskFilter === "active") {
    //     filteredTask = tasks.filter(task => !task.isDone)
    // }
    //
    const useTaskFilter = (filterValue: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.taskFilter = filterValue;
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTask = tasks;

                    if (tl.taskFilter === "completed") {
                        filteredTask = tasks.filter(task => task.isDone)
                    }
                    if (tl.taskFilter === "active") {
                        filteredTask = tasks.filter(task => !task.isDone)
                    }

                        return <Todolist key={tl.id}
                                         todolistTitle={tl.todolistTitle}
                                         id={tl.id}
                                         tasks={filteredTask}
                                         removeTask={removeTask}
                                         useTaskFilter={useTaskFilter}
                                         addTask={addTask}
                                         changeTaskStatus={changeTaskStatus}
                                         taskFilter={tl.taskFilter}
                        />
                    }
                )
            }
        </div>
    );
}
