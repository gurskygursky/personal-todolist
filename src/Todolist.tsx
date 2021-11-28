import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    todolistTitle: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string) => void,
    addTask: (newTaskTitle: string) => void,
    taskFilter: FilterValuesType,
    useTaskFilter: (filterValue: FilterValuesType) => void,
    changeTaskStatus: (taskID: string, isDone: boolean) => void,
}
type TaskType = {
    id: string,
    taskTitle: string,
    isDone: boolean,
}
export type FilterValuesType = 'all' | 'active' | 'completed';

export const Todolist = (props: TodolistPropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addTask()
        }
    }

    const taskFilterAll = () => props.useTaskFilter("all");
    const taskFilterActive = () => props.useTaskFilter("active");
    const taskFilterCompleted = () => props.useTaskFilter("completed");

    return (
        <div>
            <h3>{props.todolistTitle}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPress}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id)
                        }
                        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const isDoneValue = event.currentTarget.checked;
                            props.changeTaskStatus(task.id, isDoneValue)
                        }
                        return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={taskStatusHandler}
                            />
                            <span>{task.taskTitle}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.taskFilter === "all" ? "active-filter" : ""} onClick={taskFilterAll}>All</button>
                <button className={props.taskFilter === "active" ? "active-filter" : ""} onClick={taskFilterActive}>Active</button>
                <button className={props.taskFilter === "completed" ? "active-filter" : ""} onClick={taskFilterCompleted}>Completed</button>
            </div>
        </div>
    );
}
