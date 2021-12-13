import React, {useCallback, useEffect} from "react";
import { TaskType } from "../../api/todolist-api";
import {FilterValuesType} from "../../app/App";
import {AddItemForm} from "../../components/input/AddItemForm";
import {EditableSpan} from "../../components/span/EditableSpan";
// import {Task} from "../../components/task/Task";
import {fetchTasksTC} from "../../store/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {removeTodolistTC} from "../../store/thunk/thunk";

type TodolistPropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    // removeTask: (todolistID: string, taskID: string) => void,
    // addTask: (todolistID: string, newTaskTitle: string) => void,
    taskFilter: FilterValuesType,
    // changeTaskFilter: (todolistID: string, filterValue: FilterValuesType) => void,
    // changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void,
    removeTodolist: (todolistID: string) => void,
    changeTodolistTitle: (todolistID: string, newTitle: string) => void,
    // changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void,
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist called')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    })


    // const addTask = useCallback((newTaskTitle: string) => {
    //     props.addTask(props.id, newTaskTitle)
    // }, [props.addTask, props.id]);
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [])
    // const removeTodolist = () => {
    //     props.removeTodolist(props.id);
    // };
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.id]);

    // const universalFilter = (filterValue: FilterValuesType) => props.changeTaskFilter(props.id, filterValue);

    let filteredTask = props.tasks;
    if (props.taskFilter === "completed") {
        filteredTask = props.tasks.filter(task => task.status)
    }
    if (props.taskFilter === "active") {
        filteredTask = props.tasks.filter(task => !task.status)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <button onClick={() => removeTodolist}>x</button>
            </h3>
            {/*<AddItemForm addItem={addTask}/>*/}
            {/*<ul>*/}
            {/*    {*/}
            {/*        filteredTask.map(task => <Task*/}
            {/*            key={task.id}*/}
            {/*            task={task}*/}
            {/*            todolistID={props.id}*/}
            {/*            changeTaskTitle={props.changeTaskTitle}*/}
            {/*            removeTask={props.removeTask}*/}
            {/*            changeTaskStatus={props.changeTaskStatus}*/}
            {/*        />)*/}
            {/*    }*/}
            {/*</ul>*/}
            {/*<div>*/}
            {/*    <button className={props.taskFilter === "all" ? "active-filter" : ""}*/}
            {/*            onClick={() => universalFilter("all")}>All*/}
            {/*    </button>*/}
            {/*    <button className={props.taskFilter === "active" ? "active-filter" : ""}*/}
            {/*            onClick={() => universalFilter("active")}>Active*/}
            {/*    </button>*/}
            {/*    <button className={props.taskFilter === "completed" ? "active-filter" : ""}*/}
            {/*            onClick={() => universalFilter("completed")}>Completed*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
})