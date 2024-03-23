import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
  carType: "",
  packageLevel: "",
  useWater: false,
  price:"",
  time:"",
  day:"",
  month:"",
  address:"",
  city:""
}

const OrderSlice = createSlice({
  name:"Order",
  initialState:initialOrderState,
  reducers:{
    setCarType(state,carType){
      state.carType = carType
    },
    setPackageLevel(state,packageLevel){
      state.packageLevel = packageLevel
    },
    setUseWater(state,bool){
      state.useWater = bool
    },
    setPrice(state,price){
      state.price = price
    },
    setTime(state, time){
      state.time = time
    },
    setDay(state,day){
      state.day = day
    },
   setAddress(state,address){
     state.address = address
   },
   setCity(state,city){
    state.city = city
   },
   setMonth(state,month){
    state.month = month
   }
  }
})

export const orderAction = OrderSlice.actions
export default OrderSlice.reducer