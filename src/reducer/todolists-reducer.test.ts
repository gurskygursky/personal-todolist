import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let todolistID1: string;
let todolistID2: string;
let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();

    startState = [
        {id: todolistID1, todolistTitle: "Reading list", taskFilter: 'all'},
        {id: todolistID2, todolistTitle: "What to learn", taskFilter: 'all'},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID2))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID1);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].todolistTitle).toBe(newTodolistTitle);
    expect(endState[0].todolistTitle).toBe('Reading list');
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "What to learn";

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistID2));

    expect(endState[0].todolistTitle).toBe("Reading list");
    expect(endState[1].todolistTitle).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistID2, newFilter));

    expect(endState[0].taskFilter).toBe("all");
    expect(endState[1].taskFilter).toBe('completed');
});