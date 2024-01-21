"use client";
import { createSlice } from "@reduxjs/toolkit";
import { listUser } from "../../../actions/ListUser";

const initialState = {
    entities: [],
    status: "idle",
    error: null,
};

export const userListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(listUser.pending, (state, action) => {
                state.status = "pending";
                state.entities = [];
            })
            .addCase(listUser.fulfilled, (state, action) => {
                if (state.status === "pending") {
                    state.status = "succeeded";
                    state.entities = action.payload;
                }
            })
            .addCase(listUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action;
            });
    },
}).reducer;


