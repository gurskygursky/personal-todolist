import React, {useCallback, useEffect} from "react";
import {TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {AddItemForm} from "../../components/input/AddItemForm";
import {EditableSpan} from "../../components/span/EditableSpan";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../store/thunk/thunk";
import {Task} from "../../components/task/Task";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistPropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    taskFilter: FilterValuesType,
    removeTodolist: (todolistID: string) => void,
    changeTodolistTitle: (todolistID: string, newTitle: string) => void,
    addTask: (todolistID: string, newTaskTitle: string) => void,
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void,
    removeTask: (todolistID: string, taskID: string) => void,
    changeTaskStatus: (todolistID: string, taskID: string, status: TaskStatuses) => void,
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist called')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle]);

    const universalFilter = (filterValue: FilterValuesType) => props.changeFilter(props.id, filterValue);

    let filteredTask = props.tasks;
    if (props.taskFilter === "completed") {
        filteredTask = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (props.taskFilter === "active") {
        filteredTask = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={props.title}
                              onChange={changeTodolistTitle}
                />
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <li>
                {
                    filteredTask.map(task => <Task
                        key={task.id}
                        task={task}
                        todolistID={props.id}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </li>
            <div>
                <button className={props.taskFilter === "all" ? "active-filter" : ""}
                        onClick={() => universalFilter("all")}>All
                </button>
                <button className={props.taskFilter === "active" ? "active-filter" : ""}
                        onClick={() => universalFilter("active")}>Active
                </button>
                <button className={props.taskFilter === "completed" ? "active-filter" : ""}
                        onClick={() => universalFilter("completed")}>Completed
                </button>
            </div>
        </div>
    );
})
