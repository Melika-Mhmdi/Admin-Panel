
"use client";

import { configureStore,combineReducers } from "@reduxjs/toolkit";

import { userListSlice } from "../features/userListSlice";
import {type} from "os";



const rootReducer = combineReducers({
    userListSlice
},);

export const store = configureStore({
    reducer: rootReducer,

});
