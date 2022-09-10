import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  TILMode: false,
  task: '',
  tasks: [],
  tips: [ ],
  allTasks: {},
  openedNotes: false,
  noteFolders: [{text: "Memo", id:"Memo0" },{text: "Todo", id:"Todo0" }, {text:"Self-Improvement", id:"Self-Improvement1"}, {text: "Language Spice", id:"Language Spice2"}],
  notesGenre: "Memo",
  actionObjects: [
    {name: 'Praying', value: 0.0, color: '#8082C5', index: 0, id: 'Praying001'},
    {name: 'Relaxing', value: 0.0, color: '#5A6BF5', index: 1, id: 'Relaxing002'},
    {name: 'Studying', value: 0.0, color: '#635E90', index: 2, id: 'Studying003'},
    {name: 'Gaming', value: 0.0, color: '#9883DC', index: 3, id: 'Gaming004'},
    {name: 'Sports', value: 0.0, color: '#B97081', index: 4, id: 'Sports005'},
    {name: 'Working', value: 0.0, color: '#51e7C3', index: 5, id: 'Working006'},
    {name: 'Eating', value: 0.0, color: '#90A170', index: 6, id: 'Eating007'},
    {name: 'College', value: 0.0, color: '#D2886C', index: 7, id: 'College008'},
    {name: 'Transport', value: 0.0, color: '#996592', index: 8, id: 'Driving009'},
    {name: 'Chatting', value: 0.0, color: '#BaC558', index: 9, id: 'Chatting001'},
    {name: 'Cleaning', value: 0.0, color: '#5cc6b8', index: 10, id: 'Cleaning002'},
    {name: 'Meeting', value: 0.0, color: '#96DA6F', index: 11, id: 'Meeting005'},
    {name: 'Coding', value: 0.0, color: '#9C886C', index: 12, id: 'Coding004'},
    {name: 'Researching', value: 0.0, color: '#EAE88E', index: 13, id: 'Researching003'},
    {name: 'Watching', value: 0.0, color: '#968A80', index: 14, id: 'Watching002'},
    {name: 'Other', value: 0.0, color: '#7AC787', index: 15, id: 'Other007'},
 ],
 forCalendarView: true,
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
    },
    SetActionObjects(state, action) {
      state.actionObjects = action.payload
    },
    SetForCalendarView(state, action) {
      state.forCalendarView = action.payload
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
export const { SetActionObjects } = notesSlice.actions
export const { SetForCalendarView } = notesSlice.actions


export default notesSlice.reducer