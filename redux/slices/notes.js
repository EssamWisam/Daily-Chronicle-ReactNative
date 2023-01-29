import { createSlice } from "@reduxjs/toolkit"

// This function generates a random hex color and returns it
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    let number = Math.floor(Math.random() * 16)
    number = number > 8 ? number - parseInt(number/3) : number; // Bias towards darker colors
    color += letters[number];
  }
  return color;
}

const initialState = {
  notesMode: false,       // The notes mode is true when the user is in any notes file (accessed from the menu)
  todosMode: false,        // The todo mode is true when the user is in the in progress or completed sections (accessed from the menu)
  task: '',               // The task the user is currently writing
  tasks: [],              // The list of tasks the user has written in calendar mode for the current day
  allTasks: {},           // The list of all tasks the user has written in calendar mode
  tips: [],               // The list of tips the user has written in notes mode
  openedNotes: false,
  openedTodos: false,
  noteFolders: [{text: "Memo", id:"Memo0" },{text: "BucketList", id:"BucketList0" }, {text:"Self-Improvement", id:"Self-Improvement1"}, {text: "Language Spice", id:"Language Spice2"}],
  notesGenre: "Memo",     // The default folder for notes
  todosGenre: "Progress",  // The default folder for todos
  todosList: [

  ],
  actionObjects: [
    {name: 'Praying', value: 0.0, color: randomColor(), index: 0, id: 'Praying001'},
    {name: 'Relaxing', value: 0.0, color: randomColor(), index: 1, id: 'Relaxing002'},
    {name: 'Studying', value: 0.0, color: randomColor(), index: 2, id: 'Studying003'},
    {name: 'Gaming', value: 0.0, color: randomColor(), index: 3, id: 'Gaming004'},
    {name: 'Sports', value: 0.0, color: randomColor(), index: 4, id: 'Sports005'},
    {name: 'Working', value: 0.0, color: randomColor(), index: 5, id: 'Working006'},
    {name: 'Eating', value: 0.0, color: randomColor(), index: 6, id: 'Eating007'},
    {name: 'College', value: 0.0, color: randomColor(), index: 7, id: 'College008'},
    {name: 'Transport', value: 0.0, color: randomColor(), index: 8, id: 'Driving009'},
    {name: 'Chatting', value: 0.0, color: randomColor(), index: 9, id: 'Chatting001'},
    {name: 'Cleaning', value: 0.0, color: randomColor(), index: 10, id: 'Cleaning002'},
    {name: 'Meeting', value: 0.0, color: randomColor(), index: 11, id: 'Meeting005'},
    {name: 'Coding', value: 0.0, color: randomColor(), index: 12, id: 'Coding004'},
    {name: 'Researching', value: 0.0, color: randomColor(), index: 13, id: 'Researching003'},
    {name: 'Watching', value: 0.0, color: randomColor(), index: 14, id: 'Watching002'},
    {name: 'Other', value: 0.0, color: randomColor(), index: 15, id: 'Other007'},
 ],
 forCalendarView: true,
}
 
 const reducers = {
   SetNotesMode(state, action) {
      state.notesMode = action.payload
    },
    SetTodosMode(state, action) {
      state.todosMode = action.payload
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
    SetTodosList(state, action) {
      state.todosList = action.payload
    },
    SetOpenedNotes(state, action) {
      state.openedNotes = action.payload
    },
    SetOpenedTodos(state, action) {
      state.openedTodos = action.payload
    },
    SetNoteFolders(state, action) {
      state.noteFolders = action.payload
    },
    SetNotesGenre(state, action) {
      state.notesGenre = action.payload
    },
    SetTodosGenre(state, action) {
      state.todosGenre = action.payload
    },

    SetActionObjects(state, action) {
      state.actionObjects = action.payload
    },
    SetForCalendarView(state, action) {
      state.forCalendarView = action.payload
    }

 }

const notesSlice = createSlice({name: "notes", initialState, reducers})

export const { SetNotesMode } = notesSlice.actions
export const { SetTodosMode } = notesSlice.actions
export const { SetTask } = notesSlice.actions
export const { SetTasks } = notesSlice.actions
export const { SetTips } = notesSlice.actions
export const { SetAllTasks } = notesSlice.actions
export const { SetTodosList } = notesSlice.actions
export const { SetOpenedNotes } = notesSlice.actions
export const { SetNoteFolders } = notesSlice.actions
export const { SetNotesGenre } = notesSlice.actions
export const { SetTodosGenre } = notesSlice.actions
export const { SetActionObjects } = notesSlice.actions
export const { SetForCalendarView } = notesSlice.actions
export const { SetOpenedTodos } = notesSlice.actions


export default notesSlice.reducer