import { atom } from "recoil";
import { input } from "../types/Input";

export const optionOfFilter = atom<string[]>({
    key: 'optionOfFilter',
    default: ['すべて', '未着手', '対応中', '完了']
});

export const optionOfStatus = atom<string[]>({
    key: 'optionOfStatus',
    default: ['未着手', '対応中', '完了']
})

export const todoListState = atom<input[]>({
    key: 'todoListState',
    default: []
})

export const filterdTodoListState = atom<input[]>({
    key: 'filterdTodoListState',
    default: []
})

export const nextTodoIdState = atom<number>({
    key: 'nextTodoIdState',
    default: 1
})