import { createSlice } from "@reduxjs/toolkit";

const initialSignUpState ={
 UserName: "N/A",
 email: "N/A",
 phoneNumber:"N/A",
 address:"N/A",
 password:"N/A",
 city:"N/A",
 state:"N/A",
 zip:"N/a"
}

const SignUpSlice = createSlice({
  name:"SignUp",
  initialState:initialSignUpState,
  reducers:{
    setUserName(state,userName){
      state.UserName = userName
    },
    setEmail(state,email){
      state.email = email
    },
    setPhoneNumber(state,pN){
      state.phoneNumber = pN
    },
    setAddress(state,address){
      state.address = address
    },
    setPassword(state,password){
      state.password = password
    },
    setCity(state,city){
      state.city = city
    },
    setState(state,userState){
      state.state = userState
    }
  }
})

export const signUpAction = SignUpSlice.actions
export default SignUpSlice.reducer