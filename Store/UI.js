import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update:false
}

const UISlice = createSlice({
  name:'UI',
  initialState: initialState,
  reducers:{
    reRender(state){
      state.update = !state.update
    }
  }
})

export const UIAction = UISlice.actions
export default UISlice.reducer