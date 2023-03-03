import React from "react";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC, changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer,
    TodolistType
} from "./todolistReducer";

let StartState: TodolistType[];
 let todoID1: string
 let todoID2: string
let todoTitle: string
todoTitle = 'New Title'

beforeEach(()=>{
    todoID1 = v1()
    todoID2 = v1()

    StartState = [
        {id: todoID1, filter:'all', title:'lol'},
        {id: todoID2, filter:'all', title:'yoyo'}
    ]
})

test('todolist should be removed', () => {
const endState = todolistReducer(StartState, removeTodolistAC(todoID1))

    expect(endState).toEqual([
        {id: todoID2, filter:'all', title:'yoyo'}
    ])
})

test('todolist should be added', () => {
    const endState = todolistReducer(StartState, addTodolistAC(todoTitle))

    expect(endState[1].title).toBe('lol')
    expect(endState[0].filter).toBe('all')
    expect(endState.length).toBe( 3)
    expect(endState[0].title).toBe(todoTitle)
})

test('todolist should be change filter', () => {
    const endState = todolistReducer(StartState, changeFilterTodolistAC(todoID1, 'completed'))

    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
    expect(endState.length).toBe(2)
})

test('todolist should be change title', () => {
    const endState = todolistReducer(StartState, changeTitleTodolistAC(todoID1, todoTitle))

    expect(endState[0].title).toBe('New Title')
    expect(endState[1].title).toBe('yoyo')
    expect(endState.length).toBe(2)
})

