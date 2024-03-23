import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = {
  customer:{}
}

const CustomerSlice = createSlice({
  name:"Customer",
  initialState: initialCustomerState,
  reducers:{
    setCustomer(state,customer){
      state.customer =customer
    }
  }
})

export const customerAction = CustomerSlice.actions
export default CustomerSlice.reducer