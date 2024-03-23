import { createSlice } from "@reduxjs/toolkit";

const initialAuthState ={
  isLoggedIn: false
}

const authSlice = createSlice({
  name:'Auth',
  initialState: initialAuthState,
  reducers:{
    logIn(state){
      state.isLoggedIn = true
    },
    logOut(state){
      state.isLoggedIn = false
    }
  }
})

export const authAction = authSlice.actions 
export default authSlice.reducer