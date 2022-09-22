import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Vibration, TextInput, TouchableOpacity, Pressable, Keyboard, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Task from './Tasks';
import Add from '../../assets/add.svg';
import useKeyboardOpen from '../../utils/keyboard';
import ScrollBar from '../../utils/ScrollBar';
import { findDuration, findActionType } from '../../utils/taskSetup';
import Up from '../../assets/Up.svg';
import { useSelector, useDispatch } from 'react-redux';
import { SetTask } from '../../redux/slices/notes';
import { SetTasks } from '../../redux/slices/notes'
import { SetTips } from '../../redux/slices/notes';
import { SetAllTasks } from '../../redux/slices/notes';
import { SetNotesGenre } from '../../redux/slices/notes';
import ScrollViewIndicator from 'react-native-scroll-indicator';


export default NoteView = ({ selectedDate, hideCalendar, setFullscreen }) => {
  const color = useSelector(state => state.colors.color)['hex']
  const [added, setAdded] = useState(false);    // state to make scroll bar go down upon adding task
  const isKeyboardOpen = useKeyboardOpen();
  const inputRef = useRef(null);
  const  TILMode  = useSelector(state => state.notes.TILMode)
  const dispatch = useDispatch();
  const actionObjects = useSelector(state => state.notes.actionObjects)
  const [task, setTask] = [ useSelector(state => state.notes.task), (payload) => dispatch(SetTask(payload))];
  const [tasks, setTasks] = [ useSelector(state => state.notes.tasks), (payload) => dispatch(SetTasks(payload))];
  const [tips, setTips] = [ useSelector(state => state.notes.tips), (payload) => dispatch(SetTips(payload))];
  const [allTasks, setAllTasks] = [ useSelector(state => state.notes.allTasks), (payload) => dispatch(SetAllTasks(payload))];
  const [notesGenre, setNotesGenre] = [ useSelector(state => state.notes.notesGenre), (payload) => dispatch(SetNotesGenre(payload))];
  const [height, setHeight] = useState(null);


  // get all tips with property genre = notesGenre
  const getTips = () => {
   return tips.filter((tip) => tip.genre == notesGenre)
  }

  // watch for when the keyboard closes
  useEffect(() => {
    if (!isKeyboardOpen) {
     inputRef.current.blur();
    }
  }, [isKeyboardOpen]);


  const handleAddTask = () => {
    if(task.trim()) {
    if(!TILMode){
    setTasks([...tasks, {
       text: task,
       id: `${task}_${new Date().getMilliseconds()}`,
       duration: findDuration(task),
       action: findActionType(task, actionObjects)
      }]);
    }
    else {
      setTips([...tips, {
        text: task,
        id: `${task}_${new Date().getMilliseconds()}`,
        genre: notesGenre,
        duration: 0.0,
       action: {}
       }]);
    }
    setTask('');
    setAdded(!added);   //just a change of state for useEffect
    }
  }

  // Follows with handle task
  useEffect(() => {
    setAllTasks(({ ...allTasks, [selectedDate]: tasks }));
  }, [tasks]);

  // whenever selectedDate changes, set tasks to allTasks[selectedDate]
  useEffect(() => {
    if(allTasks[selectedDate])  setTasks(allTasks[selectedDate]);
    else setTasks([]);
  } , [selectedDate]);

  const completeTask = (target) => {
    if(!TILMode){
    setTasks(tasks.filter((task, i) => task.id !== target));
    }
    else {
      setTips(tips.filter((tip, i) => tip.id !== target));
    }

    Vibration.vibrate(50);
  }

  return (
    <View style={[styles.container, (hideCalendar && !TILMode) ? ({ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 20, paddingTop: 10  }) : ({}), {backgroundColor: (TILMode)? color+'64': '#f2f3f4'}]}
    onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setHeight(height);
    }}
    >
        {(!(hideCalendar || TILMode) && (tasks.length!==0))?
         <View style={styles.up}><TouchableOpacity onPress={()=>setFullscreen(true)}><Up style={[styles.sectionTitle, {color: color}]}></Up></TouchableOpacity></View>
         :
         <View style={styles.up}><Text style={[styles.sectionTitleText, {display: (hideCalendar || TILMode)? 'none': 'flex'}]}>Start Logging Your Day!</Text></View>}
      <View style={{height: (height-120), borderWidth: 0, }}>
      <ScrollBar style={styles.taskWrapper}
        hideTimeout	={500}
        scrollIndicatorStyle={{backgroundColor: (TILMode)? '#f1f2f3':color,  opacity: 1.0}}
        shouldIndicatorHide	={true}
        added={added}
        hideCalendar={hideCalendar}
        selectedDate={selectedDate}
      >

        <View style={[styles.items,]} >
          {(!TILMode)? allTasks[selectedDate]?.map((task, index) => {
            return (
              <Pressable key={task.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, {marginBottom: (index==allTasks[selectedDate].length-1)? 20: 0}]} onLongPress={() => completeTask(task.id)}>
               <Task item={task} text={task.text} duration={task.duration} actionObj={task.action} TILMode={TILMode} id={task.id}/>
              </Pressable>
              )
          })
        :
        getTips().map((tip, index) => {
          return (
            <Pressable key={tip.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, {marginBottom: (index==getTips().length-1)?  20: 0}]} onLongPress={() => completeTask(tip.id)}>
             <Task item ={tip} text={tip.text} id={tip.id} duration={0} actionObj={{}} />
            </Pressable>
            )
        })
        }
        </View>
      </ScrollBar>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.writeTaskWrapper, {backgroundColor: (TILMode)? color:'#f2f3f4'}]}>
        <TextInput style={[styles.input, {backgroundColor: (TILMode)? '#f2f3f464': 'white'}, {borderColor: (TILMode)? '#f2f3f4':'#ededed'}, {color: (TILMode)? 'white':'black'}]} blurOnSubmit={false} 
        placeholder={(!TILMode)?"What did you do?":"What's your next note?"} placeholderTextColor={(TILMode)? '#f2f3f4':'#708090'}
          onChangeText={text => setTask(text)} value={task} onSubmitEditing={() => { handleAddTask() }}   ref={inputRef}
          maxLength={140}
          />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={[styles.addButtonWrapper, { backgroundColor: (TILMode)? 'white': color, shadowColor: color }]}>
            <Add style={{color: (TILMode)? color: 'white'}} width='20' height='20'></Add>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
   
  );
}




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
    fontSize: 13,
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