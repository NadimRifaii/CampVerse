import { configureStore } from "@reduxjs/toolkit";
import userSlice, { user } from './user/userSlice'
import chatSlice, { chat } from "./chat/chatSlice";
import usersSlice, { users } from "./users/usersSlice";
export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [chat]: chatSlice,
    [users]: usersSlice
  }
})