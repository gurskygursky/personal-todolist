import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskFilter: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskFilter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});

test('correct todolist should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskFilter: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskFilter: "all"}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe(newTodolistTitle);
    expect(endState[2].taskFilter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    let startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskFilter: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskFilter: "all"}
    ]

    const action = changeTodolistTitleAC(todolistID2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].todolistTitle).toBe("What to learn");
    expect(endState[1].todolistTitle).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newFilter: FilterValuesType = "completed";

    let startState: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: "What to learn", taskFilter: "all"},
        {id: todolistID2, todolistTitle: "What to buy", taskFilter: "all"}
    ]

    const action = changeTodolistFilterAC(todolistID2, newFilter);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].taskFilter).toBe("all");
    expect(endState[1].taskFilter).toBe(newFilter);
});



