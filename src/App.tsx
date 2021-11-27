import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export function App() {

    const removeTask = (taskID: number) => {
       const removedTasks = tasks.filter(task => task.id !== taskID);
        setTasks(removedTasks);
    }

    let [tasks, setTasks] = useState([
        {id: 1, taskTitle: "HTML & CSS", isDone: true},
        {id: 2, taskTitle: "Javascript", isDone: false},
        {id: 3, taskTitle: "Typescript", isDone: true},
        {id: 4, taskTitle: "React", isDone: true},
        {id: 5, taskTitle: "Rest API", isDone: true},
        {id: 6, taskTitle: "Redux", isDone: true},
    ]);
    return (
        <div className="App">
            <Todolist todolistTitle={"todolist1"}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}
