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
    {name: 'Praying', value: 0.0, color: '#576878', index: 0, id: 'Praying001'},
    {name: 'Relaxing', value: 0.0, color: '#623556', index: 1, id: 'Relaxing002'},
    {name: 'Studying', value: 0.0, color: '#876386', index: 2, id: 'Studying003'},
    {name: 'Gaming', value: 0.0, color: '#5654f5', index: 3, id: 'Gaming004'},
    {name: 'Sports', value: 0.0, color: '#567514', index: 4, id: 'Sports005'},
    {name: 'Working', value: 0.0, color: '#6743f2', index: 5, id: 'Working006'},
    {name: 'Eating', value: 0.0, color: '#745836', index: 6, id: 'Eating007'},
    {name: 'College', value: 0.0, color: '#67f245', index: 7, id: 'College008'},
    {name: 'Transport', value: 0.0, color: '#565872', index: 8, id: 'Driving009'},
    {name: 'Chatting', value: 0.0, color: '#8761f5', index: 9, id: 'Chatting001'},
    {name: 'Cleaning', value: 0.0, color: '#057354', index: 10, id: 'Cleaning002'},
    {name: 'Meeting', value: 0.0, color: '#f63f15', index: 11, id: 'Meeting005'},
    {name: 'Coding', value: 0.0, color: '#277516', index: 12, id: 'Coding004'},
    {name: 'Researching', value: 0.0, color: '#55f646', index: 13, id: 'Researching003'},
    {name: 'Watching', value: 0.0, color: '#f05777', index: 14, id: 'Watching002'},
    {name: 'Other', value: 0.0, color: '#605727', index: 15, id: 'Other007'},
 ],
 // ['#576878', '#623556', '#876386', '#567514', '#676362', '#745836', '#675245', '#565872', '#876175', '#463315', '#277516', '#705777', '#825338', '#767261', '#752688', '#827742', '#775706']0: "#576878"1: "#623556"2: "#876386"3: "#567514"4: "#676362"5: "#745836"6: "#675245"7: "#565872"8: "#876175"9: "#463315"10: "#277516"11: "#705777"12: "#825338"13: "#767261"14: "#752688"15: "#827742"16: "#775706"length: 17[[Prototype]]: Array(0)
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