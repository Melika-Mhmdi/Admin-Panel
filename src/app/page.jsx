"use client";

import ProtectedRoute from "./components/ProtectionRoute/ProtectionRoute";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import {listUser} from "./actions/ListUser";
import DashboardApp from "./components/Dashboard/dashboard";
export default function Home() {
    const dispatch = useDispatch();
    const { status, entities, error } = useSelector((state) => state.userListSlice);
    useEffect(() => {
        dispatch(listUser({}))

    }, []);

    console.log(entities)
  return (
    <ProtectedRoute>
        <DashboardApp/>
    </ProtectedRoute>
  );
}
