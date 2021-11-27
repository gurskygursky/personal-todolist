import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export function App() {
    const todolist1 = [
        {id: 1, taskTitle: "HTML & CSS", isDone: true},
        {id: 2, taskTitle: "Javascript", isDone: false},
        {id: 3, taskTitle: "Typescript", isDone: true},
        {id: 4, taskTitle: "React", isDone: true},
    ];
    const todolist2 = [
        {id: 1, taskTitle: "HTML & CSS", isDone: true},
        {id: 2, taskTitle: "Javascript", isDone: false},
        {id: 3, taskTitle: "Typescript", isDone: true},
        {id: 4, taskTitle: "React", isDone: true},
    ];
    return (
        <div className="App">
            <Todolist todolistTitle={"todolist1"} tasks={todolist1}/>
            <Todolist todolistTitle={"todolist2"} tasks={todolist2}/>
        </div>
    );
}
