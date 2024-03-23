import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./Auth"
import userReducer from './User'
import signUpReducer from "./SignUp"
import customerReducer from "./Customer"
import orderReducer from "./Order"
import UIReducer from "./UI"

const store = configureStore({
  reducer :{
    auth:authReducer,
    user: userReducer,
    signUp: signUpReducer,
    customer:customerReducer,
    order: orderReducer,
    UI:UIReducer
  }
})



export default store