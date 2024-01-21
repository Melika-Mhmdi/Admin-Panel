import {createAsyncAction} from "../services/requestHandler";

export const listUser  = createAsyncAction('/purchase/list','usersList',"get");