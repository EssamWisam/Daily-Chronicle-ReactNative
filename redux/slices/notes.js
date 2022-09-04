import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  TILMode: false,
  task: '',
  tasks: [],
  tips: [],
  allTasks: {},
  openedNotes: false,
  noteFolders: [{text: "Memo", id:"Memo0" },{text: "Todo", id:"Todo0" }, {text:"Self-Improvement", id:"Self-Improvement1"}, {text: "Language Spice", id:"Language Spice2"}],
  notesGenre: "Memo",
}
 
 const reducers = {
 
   SetTILMode(state, action) {
      state.TILMode = action.payload
    },
    SetTask(state, action) {
      state.task = action.payload
    },
    SetTasks(state, action) {
      state.tasks = action.payload
    },
    SetTips(state, action) {
      state.tips = action.payload
    },
    SetAllTasks(state, action) {
      state.allTasks = action.payload
    },
    SetOpenedNotes(state, action) {
      state.openedNotes = action.payload
    },
    SetNoteFolders(state, action) {
      state.noteFolders = action.payload
    },
    SetNotesGenre(state, action) {
      state.notesGenre = action.payload
    }



 }

const notesSlice = createSlice({name: "notes", initialState, reducers})

export const { SetTILMode } = notesSlice.actions
export const { SetTask } = notesSlice.actions
export const { SetTasks } = notesSlice.actions
export const { SetTips } = notesSlice.actions
export const { SetAllTasks } = notesSlice.actions
export const { SetOpenedNotes } = notesSlice.actions
export const { SetNoteFolders } = notesSlice.actions
export const { SetNotesGenre } = notesSlice.actions


export default notesSlice.reducer