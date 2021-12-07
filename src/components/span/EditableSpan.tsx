import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    value: string,
    onChange: (newTitle: string) => void,
}

export const EditableSpan = (props: EditableSpanType) => {

    let [title, setTitle] = useState(props.value);
    let [editMode, setEditMode] = useState<boolean>(false);


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
        editMode
            ? <input value={title}
                     onChange={onChangeHandler}
                     autoFocus
                     onBlur={deactivateEditMode}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
};