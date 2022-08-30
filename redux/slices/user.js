import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   username: 'abc',
 }
 
 const reducers = {
 
   SetUsername(state, action) {
      state.username = action.payload
    },
 }

const userSlice = createSlice({name: "user", initialState, reducers})

export const { SetUsername } = userSlice.actions


export default userSlice.reducer