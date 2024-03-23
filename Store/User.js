import { createSlice } from "@reduxjs/toolkit";

const initialUserState ={
  user:{}
}

const UserSlice = createSlice({
   name:"user",
   initialState: initialUserState,
   reducers:{
     setUser(state,user){
      state.user = user
     }
   }
})

export const userAction = UserSlice.actions
export default UserSlice.reducer