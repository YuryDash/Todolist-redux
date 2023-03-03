import {addTodolistAT, FilterType, removeTodolistAT} from "./todolistReducer";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionType = removeTaskAT | addTaskAT | changeTaskStatusAT | changeTaskTitleAT | addTodolistAT | removeTodolistAT
type removeTaskAT = ReturnType<typeof removeTaskAC>
type addTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const taskReducer = (state: TasksStateType , action:ActionType): TasksStateType => {
    switch (action.type) {
        case'REMOVE_TASK':
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].filter(
                    el => el.id !== action.payload.taskID
                )
            }
        case "ADD_TASK":
            const newTask: TaskType = {id: v1(), isDone: false, title: action.payload.title}
            return {
                ...state, [action.payload.todoID]: [newTask,...state[action.payload.todoID]]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map( el =>
                el.id === action.payload.taskID
                ? {...el, isDone: action.payload.boo} : el)
            }
        case "CHANGE_TASK_TITLE":
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map( el =>
                el.id === action.payload.taskID
                ? {...el, title: action.payload.newTitle} : el)
            }
        case "ADD_TODO":
            return {
                [action.payload.idNew]: [],
                ...state
            }
        case "REMOVE_TODO":
            const copyState = {...state}
            delete copyState[action.payload.todoID]
            return copyState

        default:
            return state
    }
}

export const removeTaskAC = (todoID: string, taskID: string ) => {
    return(
        {type: "REMOVE_TASK", payload: {todoID, taskID}}as const
    )
}
export const addTaskAC = (todoID: string, title: string ) => {
    return(
        {type: "ADD_TASK", payload: {todoID, title}}as const
    )
}
export const changeTaskStatusAC = (todoID: string, taskID: string, boo: boolean) => {
    return(
        {type: "CHANGE_TASK_STATUS", payload: {todoID, taskID, boo}}as const
    )
}
export const changeTaskTitleAC = (todoID: string, taskID: string , newTitle: string) => {
    return(
        {type: "CHANGE_TASK_TITLE", payload: {todoID, taskID, newTitle}}as const
    )
}