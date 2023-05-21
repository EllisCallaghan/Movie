"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedList:[],
    items:[],
}

export const listSlice = createSlice({
    name:'saved',
    initialState,
    reducers:{
        setItems:(state,action) => {
            state.items = action.payload;
        },
        addToList:(state,action) => {
            state.savedList=[...state.savedList,action.payload.item];
        },
        removeFromList:(state,action) => {
            state.savedList = state.savedList.filter((item) => item.id !== action.payload.id);
        },
        increaseCount:(state,action) => {
            state.savedList = state.savedList.map((item) => {
                if (item.id === action.payload.id){
                    item.count++;
                }
                return item;
            });
        },
        decreaseCount:(state,action) => {
            state.savedList = state.savedList.map((item) => {
                if(item.id === action.payload.id && item.count > 1){
                    item.count--;
                }
                return item;
            });
        }
    }
})

export const{
    setItems,
    addToList,
    removeFromList,
    increaseCount,
    decreaseCount
} = listSlice.actions;

export default listSlice.reducer;