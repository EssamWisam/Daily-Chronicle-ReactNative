import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Vibration, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Task from './Task';
import { colors } from '../../assets/colors/colors';
import Add from '../../assets/add.svg';
import useKeyboardOpen from '../../utils/keyboard';
import ScrollBar from 'react-native-colored-scrollbar';
import { findDuration, findActionType } from '../../utils/taskSetup';
import Up from '../../assets/Up.svg';


export default NoteView = ({ selectedDate, allTasks, setAllTasks, hideCalendar, setFullscreen, TILMode }) => {
  const color = colors[0]
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);
  const [tips, setTips] = useState([]);
  const [added, setAdded] = useState(false);    // state to make scroll bar go down upon adding task
  const isKeyboardOpen = useKeyboardOpen();

  const handleAddTask = () => {
    if(task) {
    if(!TILMode){
    setTasks(tasks => [...tasks, {
       text: task,
       id: `${task}_${new Date().getMilliseconds()}`,
       duration: findDuration(task),
       action: findActionType(task)
      }]);
    }
    else {
      setTips(tips => [...tips, {
        text: task,
        id: `${task}_${new Date().getMilliseconds()}`,
       }]);
    }
    setTask('');
    setAdded(!added);   //just a change of state for useEffect
    }
  }

  // Follows with handle task
  useEffect(() => {
    setAllTasks(allTasks => ({ ...allTasks, [selectedDate]: tasks }));
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
    <View style={[styles.container, (hideCalendar) ? ({ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 20, paddingTop: 10  }) : ({}), {backgroundColor: (TILMode)? color+'64': '#f2f3f4'}]}>
        {(!hideCalendar && (tasks.length!==0))?
         <View style={styles.up}><TouchableOpacity onPress={()=>setFullscreen(true)}><Up style={[styles.sectionTitle, {color: color}]}></Up></TouchableOpacity></View>
         :
         <View style={styles.up}><Text style={[styles.sectionTitleText, {display: (hideCalendar || TILMode)? 'none': 'flex'}]}>Start Logging Your Day!</Text></View>}
      
      <ScrollBar style={styles.taskWrapper}
        indicatorBackground={'transparent'} timeBeforeFadeAway={1500} indicatorColor={color}
         isKeyboardOpen={hideCalendar}
         added={added}
         selectedDate={selectedDate}
      >
        <View style={styles.items} >
          {(!TILMode)? allTasks[selectedDate]?.map((task, index) => {
            return (
              <Pressable key={task.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}]} onLongPress={() => completeTask(task.id)}>
               <Task text={task.text} duration={task.duration} index={task.action} TILMode={TILMode}/>
              </Pressable>
              )
          })
        :
        tips.map((tip, index) => {
          return (
            <Pressable key={tip.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}]} onLongPress={() => completeTask(tip.id)}>
             <Task text={tip.text} duration={0} index={-1} TILMode={TILMode}/>
            </Pressable>
            )
        })
        }
        </View>
      </ScrollBar>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput style={[styles.input, {backgroundColor: (TILMode)? '#f2f3f464': 'white'}, {borderColor: (TILMode)? '#f2f3f4':'#ededed'}, {color: (TILMode)? 'white':'black'}]} blurOnSubmit={false} 
        placeholder={(!TILMode)?"What did you do?":"What's your next tip?"} placeholderTextColor={(TILMode)? '#f2f3f4':'#708090'}
          onChangeText={text => setTask(text)} value={task} onSubmitEditing={() => { handleAddTask() }} />
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
  },
  taskWrapper: {
    paddingHorizontal: 14,
    marginBottom: 150,
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
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderWidth: 2,
    width: '70%',
    fontFamily: 'Regular',
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
  }
})