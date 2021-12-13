export {};

// import React, {useEffect, useReducer} from 'react';
// import {v1} from 'uuid';
// import './App.css';
// import {Todolist} from "./Todolist";
// import {AddItemForm} from "./components/input/AddItemForm";
// import {
//     AddTodolistAC,
//     ChangeTodolistFilterAC,
//     ChangeTodolistTitleAC,
//     RemoveTodolistAC,
//     todolistsReducer
// } from "./store/todolists-store";
// import {
//     AddTaskAC,
//     ChangeTaskStatusAC,
//     ChangeTaskTitleAC,
//     RemoveTaskAC,
//     tasksReducer
// } from "./store/tasks-store";
//
// export type TodolistType = {
//     id: string,
//     todolistTitle: string,
//     taskFilter: FilterValuesType,
// }
// export type TaskType = {
//     id: string,
//     taskTitle: string,
//     isDone: boolean,
// }
// export type TasksType = {
//     [key: string]: Array<TaskType>
// }
// export type FilterValuesType = 'all' | 'active' | 'completed';
//
//
// export function App() {
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistID1]: [
//             {id: v1(), taskTitle: "HTML & CSS", isDone: true},
//             {id: v1(), taskTitle: "Javascript", isDone: false},
//             {id: v1(), taskTitle: "Typescript", isDone: true},
//             {id: v1(), taskTitle: "React", isDone: true},
//             {id: v1(), taskTitle: "Rest API", isDone: true},
//             {id: v1(), taskTitle: "Redux", isDone: true},
//         ],
//         [todolistID2]: [
//             {id: v1(), taskTitle: "1984", isDone: true},
//             {id: v1(), taskTitle: "The Financier", isDone: true},
//             {id: v1(), taskTitle: "The Stoic", isDone: true},
//             {id: v1(), taskTitle: "The Titan", isDone: true},
//             {id: v1(), taskTitle: "The Double", isDone: true},
//             {id: v1(), taskTitle: "The Master and Margarita", isDone: false},
//         ]
//     });
//
//     let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
//         {
//             id: todolistID1,
//             todolistTitle: "What to learn",
//             taskFilter: "all",
//         },
//         {
//             id: todolistID2,
//             todolistTitle: "Reading list",
//             taskFilter: "all",
//         },
//     ]);
//
//     const addTodolist = (todolistTitle: string) => {
//         const action = AddTodolistAC(todolistTitle);
//         dispatchToTasks(action);
//         dispatchToTodolist(action);
//     }
//     const removeTodolist = (todolistID: string) => {
//         const action = RemoveTodolistAC(todolistID);
//         dispatchToTodolist(action);
//     }
//     const changeTodolistTitle = (todolistID: string, newTitle: string,) => {
//         const action = ChangeTodolistTitleAC(todolistID, newTitle);
//         dispatchToTodolist(action);
//     }
//     const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
//         const action = ChangeTaskTitleAC(todolistID, taskID, newTitle);
//         dispatchToTasks(action)
//     }
//     const removeTask = (todolistID: string, taskID: string) => {
//         const action = RemoveTaskAC(todolistID, taskID);
//         dispatchToTasks(action);
//     }
//     const addTask = (newTaskTitle: string, todolistID: string) => {
//         const action = AddTaskAC(newTaskTitle, todolistID);
//         dispatchToTasks(action);
//     }
//     const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
//         const action = ChangeTaskStatusAC(todolistID, taskID, isDone);
//         dispatchToTasks(action);
//     }
//     const changeTaskFilter = (todolistID: string, filterValue: FilterValuesType) => {
//         const action = ChangeTodolistFilterAC(todolistID, filterValue);
//         dispatchToTodolist(action);
//     }
//
//     return (
//         <div className="App">
//             <AddItemForm addItem={addTodolist}/>
//             {
//                 todolists.map(tl => {
//                         let allTodolistTasks = tasks[tl.id]
//                         let filteredTask = allTodolistTasks;
//
//                         if (tl.taskFilter === "completed") {
//                             filteredTask = allTodolistTasks.filter(task => task.isDone)
//                         }
//                         if (tl.taskFilter === "active") {
//                             filteredTask = allTodolistTasks.filter(task => !task.isDone)
//                         }
//
//                         return <Todolist key={tl.id}
//                                          todolistTitle={tl.todolistTitle}
//                                          id={tl.id}
//                                          tasks={filteredTask}
//                                          removeTask={removeTask}
//                                          changeTaskFilter={changeTaskFilter}
//                                          addTask={addTask}
//                                          changeTaskStatus={changeTaskStatus}
//                                          removeTodolist={removeTodolist}
//                                          taskFilter={tl.taskFilter}
//                                          changeTodolistTitle={changeTodolistTitle}
//                                          changeTaskTitle={changeTaskTitle}
//                         />
//                     }
//                 )
//             }
//         </div>
//     );
// }
