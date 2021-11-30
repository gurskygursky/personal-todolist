import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (taskTitle: string) => void,
}

export const AddItemForm = (props: AddItemFormType) => {

    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            <input className={error ? "error" : ""}
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPress}/>
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

