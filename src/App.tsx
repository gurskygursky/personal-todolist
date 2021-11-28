import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";

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

    let [tasks, setTasks] = useState([
        {id: v1(), taskTitle: "HTML & CSS", isDone: true},
        {id: v1(), taskTitle: "Javascript", isDone: false},
        {id: v1(), taskTitle: "Typescript", isDone: true},
        {id: v1(), taskTitle: "React", isDone: true},
        {id: v1(), taskTitle: "Rest API", isDone: true},
        {id: v1(), taskTitle: "Redux", isDone: true},
    ]);

    let [taskFilter, setTaskFilter] = useState<"all" | "active" | "completed">("all");

    let filteredTask = tasks;

    if (taskFilter === "completed") {
        filteredTask = tasks.filter(task => task.isDone)
    }
    if (taskFilter === "active") {
        filteredTask = tasks.filter(task => !task.isDone)
    }

    const useTaskFilter = (filterValue: "all" | "active" | "completed") => {
        setTaskFilter(filterValue)
    }

    return (
        <div className="App">
            <Todolist todolistTitle={"todolist1"}
                      tasks={filteredTask}
                      removeTask={removeTask}
                      useTaskFilter={useTaskFilter}
                      addTask={addTask}
            />
        </div>
    );
}
