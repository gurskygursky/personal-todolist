import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../span/EditableSpan";
import {TaskType} from "../../AppWithRedux";


type TaskPropsType = {
    task: TaskType,
    todolistID: string,
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void,
    removeTask: (todolistID: string, taskID: string) => void,
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void,
}

export const Task = React.memo((props: TaskPropsType) => {

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistID, props.task.id, newTitle);
    }, [props.todolistID, props.task.id]);
    const removeTask = useCallback(() => {
        props.removeTask(props.todolistID, props.task.id);
    }, [props.todolistID, props.task.id]);
    const taskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const isDoneValue = event.currentTarget.checked;
        props.changeTaskStatus(props.todolistID, props.task.id, isDoneValue)
    }, [props.todolistID, props.task.id]);

    return <li key={props.task.id}
               className={props.task.isDone ? "is-done" : ""}>
        <input type="checkbox"
               checked={props.task.isDone}
               onChange={taskStatusHandler}
        />
        <EditableSpan value={props.task.taskTitle}
                      onChange={changeTaskTitle}/>
        <button onClick={removeTask}>x</button>
    </li>
});