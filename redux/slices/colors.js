import { createSlice } from "@reduxjs/toolkit"


const initialState = { colorMode: false, color: {
   "hex": "#0072B5",
   "hsl": "hsl(202, 100%, 35%)",
   "hsla": "hsla(202, 100%, 35%, 1)",
   "hsv": "hsv(202, 100%, 71%)",
   "hsva": "hsva(202, 100%, 71%, 1)",
   "rgb": "rgb(0, 114, 181)",
   "rgba": "rgba(0, 114, 181, 1)",
 } }
 
 const reducers = {
 
   SetColorMode(state, action) {
      state.colorMode = action.payload
    },
    SetColor(state, action) {
      state.color = action.payload
    }
 }

const colorsSlice = createSlice({name: "colors", initialState, reducers})

export const { SetColorMode } = colorsSlice.actions
export const { SetColor } = colorsSlice.actions


export default colorsSlice.reducer