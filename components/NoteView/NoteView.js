// UI & Hooks
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Vibration, TextInput, TouchableOpacity, Pressable, Keyboard, ScrollView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import Task from './Tasks';
import Add from '../../assets/add.svg';
import Delete from '../../assets/Delete.svg'
import Edit from '../../assets/Edit.svg'
import Up from '../../assets/Up.svg';

// State
import { SetTask } from '../../redux/slices/notes';
import { SetTasks } from '../../redux/slices/notes'
import { SetTips } from '../../redux/slices/notes';
import { SetAllTasks } from '../../redux/slices/notes';
import { SetTodosList } from '../../redux/slices/notes';

// Utils
import useKeyboardOpen from '../../utils/keyboard';
import ScrollBar from '../../utils/ScrollBar';
import { findDuration, findActionType } from '../../utils/taskSetup';

// Responsible for rendering diary task items, todo items and note items
export default NoteView = ({ selectedDate, hideCalendar, setFullscreen }) => {
  const dispatch = useDispatch();
  const isKeyboardOpen = useKeyboardOpen();
  const color = useSelector(state => state.colors.color)['hex']
  const [height, setHeight] = useState(null);

  // Tasks (Diary Entries)
  const [task, setTask] = [ useSelector(state => state.notes.task), (payload) => dispatch(SetTask(payload))];
  const [tasks, setTasks] = [ useSelector(state => state.notes.tasks), (payload) => dispatch(SetTasks(payload))];
  const [added, setAdded] = useState(false);    // state to make scroll bar go down upon adding task
  const [allTasks, setAllTasks] = [ useSelector(state => state.notes.allTasks), (payload) => dispatch(SetAllTasks(payload))];
  const actionObjects = useSelector(state => state.notes.actionObjects) // type of task
    // Follows with handle task
    useEffect(() => {
      setAllTasks(({ ...allTasks, [selectedDate]: tasks }));
    }, [tasks]);
    // whenever selectedDate changes, set tasks to allTasks[selectedDate]
    useEffect(() => {
      if(allTasks[selectedDate])  setTasks(allTasks[selectedDate]);
      else setTasks([]);
    } , [selectedDate]);

  // Notes
  const  notesMode  = useSelector(state => state.notes.notesMode)
  const notesGenre = useSelector(state => state.notes.notesGenre)
  const [tips, setTips] = [ useSelector(state => state.notes.tips), (payload) => dispatch(SetTips(payload))];
  // get all tips with property genre = notesGenre
  const getTips = () => {
    return tips.filter((tip) => tip.genre == notesGenre)
   }

  // Todos
  const  todosMode  = useSelector(state => state.notes.todosMode)
  const todosGenre = useSelector(state => state.notes.todosGenre)
  const [todosList, setTodosList] = [ useSelector(state => state.notes.todosList), (payload) => dispatch(SetTodosList(payload))];

  // Input field
  const inputRef = useRef(null);
    // watch for when the keyboard closes
    useEffect(() => {
      if (!isKeyboardOpen) {
      if (inputRef.current){
      inputRef.current.blur();
      }
      }
    }, [isKeyboardOpen]);

  // Edit modal
  const refRBSheet = useRef();
  const [RBText, setRBText] = useState('')
  const [RBTargetID, setRBTargetID] = useState(null)

  // Adding, editing and deleting items
  const handleAddItem = () => {
    if(task.trim()) {
    if(!notesMode && !todosMode){
    setTasks([...tasks, {
       text: task,
       id: `${task}_${new Date().getMilliseconds()}`,
       duration: findDuration(task),
       action: findActionType(task, actionObjects)
      }]);
    }
    else if(notesMode && !todosMode) {
      setTips([...tips, {
        text: task,
        id: `${task}_${new Date().getMilliseconds()}`,
        genre: notesGenre,
        duration: 0.0,
       action: {}
       }]);
    }
    else if (todosMode && !notesMode){
      setTodosList([...todosList, {
        text: task,
        id: `${task}_${new Date().getMilliseconds()}`,
        type: 'untitled',
        duration: 0.0,  action: {}
       }]);
    }
    setTask('');
    setAdded(!added);   //just a change of state for useEffect
    }
  }

  const editItem = () => {
    if(!notesMode && !todosMode){
      const newTasks = [...tasks];
      const index = newTasks.findIndex(task => task.id === RBTargetID);
      newTasks[index] = {...newTasks[index], text: RBText};
      setTasks(newTasks);
      refRBSheet.current.close();
    }
    else if (notesMode && !todosMode){
      const newTips = [...tips];
      const index = newTips.findIndex(tip => tip.id === RBTargetID);
      newTips[index] = {...newTips[index], text: RBText};
      setTips(newTips);
      refRBSheet.current.close();
    }
    else if (todosMode && !notesMode){
      const newTodos = [...todosList];
      const index = newTodos.findIndex(todo => todo.id === RBTargetID);
      newTodos[index] = {...newTodos[index], text: RBText};
      setTodosList(newTodos);
      refRBSheet.current.close();
    }
  }

  const deleteItem = ()=>{
    if(!notesMode && !todosMode){
      setTasks(tasks.filter((task, i) => task.id !== RBTargetID));
      setFullscreen(false)
      refRBSheet.current.close()

    }
    else if (notesMode && !todosMode){
      setTips(tips.filter((tip, i) => tip.id !== RBTargetID));
      setFullscreen(false)
      refRBSheet.current.close()
    }
    else if (todosMode && !notesMode){
      setTodosList(todosList.filter((todo, i) => todo.id !== RBTargetID));
      setFullscreen(false)
      refRBSheet.current.close()
    }
  }

  return (
    <View style={[styles.container, (hideCalendar && !notesMode && !todosMode) ? ({ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 20, paddingTop: 10  }) : ({}), {backgroundColor: (notesMode||todosMode)? color+'64': '#f2f3f4'}]}
    onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setHeight(height);
    }}
    >
        {/* In case of diary tasks, check whether minimized or maximized */}
        {(!(hideCalendar || notesMode || todosMode) && (tasks.length!==0))?
         <View style={styles.up}><TouchableOpacity onPress={()=>setFullscreen(true)}><Up style={[styles.sectionTitle, {color: color}]}></Up></TouchableOpacity></View>
         :
         <View style={styles.up}><Text allowFontScaling={false} style={[styles.sectionTitleText, {display: (hideCalendar || notesMode ||todosMode)? 'none': 'flex'}]}>Start Logging Your Day!</Text></View>}
      <View style={{height: (todosMode && todosGenre=="Completed")?height:(height-120), borderWidth: 0, }}>
      <ScrollBar style={styles.taskWrapper}
        hideTimeout	={500}
        scrollIndicatorStyle={{backgroundColor: (notesMode || todosMode)? '#f1f2f3':color,  opacity: 1.0}}
        shouldIndicatorHide	={true}
        added={added}
        hideCalendar={hideCalendar}
        selectedDate={selectedDate}
      >
      {/* Decide whether to show diary tasks */}
        <View style={[styles.items,]} >
          {(!notesMode && !todosMode)? allTasks[selectedDate]?.map((task, index) => {
                return (
                  <Pressable key={task.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, {marginBottom: (index==allTasks[selectedDate].length-1)? 20: 0}]} onLongPress={() => {refRBSheet.current.open(); setRBTargetID(task.id); setRBText(task.text); }}>
                  <Task item={task} text={task.text} duration={task.duration} actionObj={task.action} id={task.id}/>
                  </Pressable>
                  )
              })
            : (todosMode)? 
            <>
            {/* Or to show todos in progress/completed */}
            {(todosGenre=="In Progress")?<>
            <Todos type="do" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            <Todos type="schedule" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            <Todos type="delegate" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            <Todos type="delete" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            <Todos type="untitled" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            </>
            :
            <Todos type="done" todosList={todosList} refRBSheet={refRBSheet} setRBTargetID={setRBTargetID} setRBText={setRBText} />
            }
            </>
            :
            getTips().map((tip, index) => {
              return (
                // Or to show notes
                <Pressable key={tip.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, {marginBottom: (index==getTips().length-1)?  20: 0}]} onLongPress={() => {refRBSheet.current.open(); setRBTargetID(tip.id); setRBText(tip.text)} }>
                <Task item ={tip} text={tip.text} id={tip.id} duration={0} actionObj={{}} />
                </Pressable>
                )
            })
            }
        </View>
      </ScrollBar>
      </View>
      {/* Text input and button */}
      { ((!notesMode && !todosMode)||notesMode|| (todosMode && todosGenre!="Completed")) && <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.writeTaskWrapper, {backgroundColor: (notesMode || todosMode)? color:'#f2f3f4'}]}>
        <TextInput allowFontScaling={false} style={[styles.input, {backgroundColor: (notesMode || todosMode)? '#f2f3f464': 'white'}, {borderColor: (notesMode || todosMode)? '#f2f3f4':'#ededed'}, {color: (notesMode || todosMode)? 'white':'black'}]} blurOnSubmit={false} 
        placeholder={(!notesMode && !todosMode)?"What did you do?": (todosMode)?"What's your next todo?":"What's your next note?"} placeholderTextColor={(notesMode || todosMode)? '#f2f3f4':'#708090'}
          onChangeText={text => setTask(text)} value={task} onSubmitEditing={() => { handleAddItem() }}   ref={inputRef}
          maxLength={140}
          />
        <TouchableOpacity onPress={() => handleAddItem()}>
          <View style={[styles.addButtonWrapper, { backgroundColor: (notesMode||todosMode)? 'white': color, shadowColor: color }]}>
            <Add style={{color: (notesMode || todosMode)? color: 'white'}} width='20' height='20'></Add>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>}
      <EditItemModal refRBSheet={refRBSheet} RBText={RBText} setRBText={setRBText} color={color} deleteItem={deleteItem} editItem={editItem} />
    </View>
  );
}


// Component rendering todolist
const Todos = ({ type, todosList, refRBSheet, setRBTargetID, setRBText }) => {

  const TextElement = ()=> {
    if (type == 'do') {
      return <Text allowFontScaling={false} style={{color: '#f2f3f4', fontSize: 27,  fontFamily:'SemiBold', marginVertical: 6}}>Do</Text>
    }
    else if (type == 'schedule') {
      return <Text allowFontScaling={false} style={{color: '#f2f3f4', fontSize: 27,  fontFamily:'SemiBold', marginVertical: 6}}>Schedule</Text>
    }
    else if (type == 'delegate') {
      return <Text allowFontScaling={false} style={{color: '#f2f3f4', fontSize: 27,  fontFamily:'SemiBold', marginVertical: 6}}>Delegate</Text>
    }
    else if (type == 'delete') {
      return <Text allowFontScaling={false} style={{color: '#f2f3f4', fontSize: 27,  fontFamily:'SemiBold', marginVertical: 6}}>Delete</Text>
    }
    else if (type=='untitled'){
      return <Text allowFontScaling={false} style={{color: '#f2f3f4', fontSize: 27,  fontFamily:'SemiBold', marginVertical: 6}}>Untitled</Text>
    }
    else {
      return null
    }
  }

  const TodoElement = ({todo}) => {
  return todosList.filter((todo) => todo.type == type).map((todo, index) => {
    return (
      <>
      <Pressable key={todo.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, {marginBottom: 5}]} onLongPress={() => { refRBSheet.current.open(); setRBTargetID(todo.id); setRBText(todo.text);}}>
      <Task item={todo} text={todo.text} duration={0} actionObj={{}}  id={todo.id}/>
      </Pressable>
      </>
      )
  })
}

  if (todosList.filter((todo) => todo.type == type).length == 0) {
    return null
  }
  return (
    <>
    <TextElement/>
    <TodoElement/>
    </>
  )

}

const EditItemModal = ({ refRBSheet, RBText, setRBText, color, deleteItem, editItem }) => {

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={true}
      height={100}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#f2f3f4',
          borderWidth: 1,
          borderColor: color,
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            marginLeft: 5,
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 0,
            padding: 6,
          }}
          onPress={() => {
            deleteItem();
          }}
        >
          <Delete width={27} height={27} color={color} />
        </TouchableOpacity>
        <TextInput
          allowFontScaling={false}
          style={[
            {
              paddingVertical: 15,
              paddingHorizontal: 13,
              backgroundColor: '#FFF',
              marginVertical: 20,
              marginHorizontal: 10,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: color,
              width: '70%',
              fontFamily: 'Regular',
              fontSize: 12,
            },
          ]}
          blurOnSubmit={false}
          placeholderTextColor={'#708090'}
          onChangeText={(text) => setRBText(text)}
          value={RBText}
          onSubmitEditing={() => {
            editItem();
          }}
          maxLength={140}
        />
        <TouchableOpacity
          style={{
            marginLeft: 5,
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 0,
            padding: 6,
          }}
          onPress={() => {
            editItem();
          }}
        >
          <Edit width={32} height={32} color={color} />
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
  },
  taskWrapper: {
    paddingHorizontal: 14,
    borderColor: '000',

  },
  sectionTitle: {
    textAlign: 'center',
    marginTop: 9,
  },
  sectionTitleText: {
    fontSize: 11,
    fontFamily: 'SemiBold',
    color: '#bababa',
    textAlign: 'center',
    marginTop: 18,
    letterSpacing: 3
  },
  sectionTitleWrapper: {
    marginBottom: -30,
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    paddingVertical: 20,
    borderWidth: 0

  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#FFF',
    fontSize: 12,
    borderRadius: 60,
    borderWidth: 2,
    width: '70%',
    fontFamily: 'Regular',
    height: 60,
  },
  addButtonWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#fff',
  },
  addText: {
    color: 'white',
  },
  up: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  }
})