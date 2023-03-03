import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'completed' | 'active'
type ActionType = removeTodolistAT | addTodolistAT | changeFilterTodolistAT | changeTitleTodolistAT

type changeFilterTodolistAT = ReturnType<typeof changeFilterTodolistAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
type changeTitleTodolistAT = ReturnType<typeof changeTitleTodolistAC>

export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TODO":
            return state.filter(el => el.id !== action.payload.todoID)
        case "ADD_TODO":
            const newTodo: TodolistType = {id: action.payload.idNew, title: action.payload.todoTitle, filter: "all"}
            return [newTodo, ...state]
        case "CHANGE_FILTER_TODO":
            return state.map(el => el.id === action.payload.todoID
                ? {...el, filter: action.payload.newValue} : el)
        case "CHANGE_TITLE_TODO":
            return state.map(el => el.id === action.payload.todoID
                ? {...el, title: action.payload.newTitle} : el)
        default:
            return state
    }
}
export const removeTodolistAC = (todoID: string) => {
    return (
        {type: "REMOVE_TODO", payload: {todoID}} as const
    )
}
export const addTodolistAC = (todoTitle: string) => {
    return (
        {type: "ADD_TODO", payload: {todoTitle, idNew: v1()}} as const
    )
}
export const changeFilterTodolistAC = (todoID: string, newValue: FilterType) => {
    return (
        {type: "CHANGE_FILTER_TODO", payload: {todoID, newValue}} as const
    )
}
export const changeTitleTodolistAC = (todoID: string, newTitle: string) => {
    return (
        {type: "CHANGE_TITLE_TODO", payload: {todoID, newTitle}} as const
    )
}