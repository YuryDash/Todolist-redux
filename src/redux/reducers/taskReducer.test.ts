import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer,
    TasksStateType
} from "./taskReducer";
import {addTodolistAC, removeTodolistAC} from "./todolistReducer";
import {v1} from "uuid";

let startState: TasksStateType = {};
let todoID1: string;
let todoID2: string;

beforeEach(() => {
        todoID2 = v1()
        todoID1 = v1()
    startState = {
        [todoID1]: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        [todoID2]: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("todolistId2", "juice");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("todolistId2", "2", false);

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("todolistId2", "2", "yogurt");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("New Todolist");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC(todoID1);

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todoID1]).not.toBeDefined();
});
