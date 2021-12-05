import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC,
    tasksReducer
} from './tasks-reducer';
import {TasksType} from "../App";
import {v1} from "uuid";

let todolistID1: string;
let todolistID2: string;
let startState: TasksType = {};

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = {
        todolistID1: [
            {id: '1', taskTitle: "1984", isDone: true},
            {id: '2', taskTitle: "The Financier", isDone: true},
            {id: '3', taskTitle: "The Stoic", isDone: true},
            {id: '4', taskTitle: "The Titan", isDone: true},
            {id: '5', taskTitle: "The Double", isDone: true},
            {id: '6', taskTitle: "The Master and Margarita", isDone: false},
        ],
        todolistID2: [
            {id: '1', taskTitle: 'HTML&CSS2', isDone: true},
            {id: '2', taskTitle: 'JS2', isDone: true},
            {id: '3', taskTitle: 'ReactJS2', isDone: false},
            {id: '4', taskTitle: 'Rest API2', isDone: false},
            {id: '5', taskTitle: 'GraphQL2', isDone: false},
        ],
    }
});


test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, RemoveTaskAC('todolistID2', '2'))

    expect(endState).toEqual({
        "todolistID1": [
            {id: '1', taskTitle: "1984", isDone: true},
            {id: '2', taskTitle: "The Financier", isDone: true},
            {id: '3', taskTitle: "The Stoic", isDone: true},
            {id: '4', taskTitle: "The Titan", isDone: true},
            {id: '5', taskTitle: "The Double", isDone: true},
            {id: '6', taskTitle: "The Master and Margarita", isDone: false},
        ],
        "todolistID2": [
            {id: '1', taskTitle: 'HTML&CSS2', isDone: true},
            // {id: '2', title: 'JS2', isDone: true},
            {id: '3', taskTitle: 'ReactJS2', isDone: false},
            {id: '4', taskTitle: 'Rest API2', isDone: false},
            {id: '5', taskTitle: 'GraphQL2', isDone: false},
        ]
    });
});


test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, AddTaskAC('todolistID2', 'juice'))

    expect(endState["todolistID1"].length).toBe(6);
    expect(endState["todolistID2"].length).toBe(6);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].taskTitle).toBe('juice');
    expect(endState["todolistID2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, ChangeTaskStatusAC("todolistID2", "2", false))

    expect(endState["todolistID2"][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, ChangeTaskTitleAC("todolistID2", "2", "xxx"))

    expect(endState["todolistID2"][1].taskTitle).toBe("xxx");
    expect(endState["todolistID2"][1].isDone).toBe(true);
});

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, AddTodolistAC('new todolist'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2");
    if (!newKey) {
        throw new Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const endState = tasksReducer(startState, RemoveTodolistAC('todolistID2'))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
});