import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Vibration, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Task from './Task';
import { colors } from '../../assets/colors/colors';
import Add from '../../assets/add.svg';
import useKeyboardOpen from '../../utils/keyboard';
import ScrollBar from 'react-native-colored-scrollbar';

export default NoteView = ({ selectedDate, allTasks, setAllTasks }) => {
  const color = colors[0]
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setTasks(tasks => [...tasks, task]);
    setTask('');
    setAdded(!added);   //just a change of state for useEffect
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


  const [added, setAdded] = useState(false);    // state to make scroll bar go down upon adding task

  const isKeyboardOpen = useKeyboardOpen();

  const completeTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
    Vibration.vibrate(50);
  }

  


  return (
    <View style={[styles.container, (isKeyboardOpen) ? ({ borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: 20, paddingTop: 10  }) : ({})]}>
        {(!isKeyboardOpen)? <Text style={[styles.sectionTitle, {color: color}]}> Done That Day</Text>:null}
      <ScrollBar style={styles.taskWrapper}
        indicatorBackground={'transparent'} timeBeforeFadeAway={1500} indicatorColor={color}
         isKeyboardOpen={isKeyboardOpen}
         added={added}
         selectedDate={selectedDate}
      >
        <View style={styles.items} >
          {allTasks[selectedDate]?.map((task, index) => {
            return (
              <Pressable key={index} style={({pressed})=>[{},{opacity:pressed ? 0.8 : 1}]} onLongPress={() => completeTask(index)}>
               <Task text={task}/>
              </Pressable>
              )
          })
        }
        </View>
      </ScrollBar>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput style={[styles.input]} blurOnSubmit={false} placeholder={"What did you do?"}
          onChangeText={text => setTask(text)} value={task} onSubmitEditing={() => { handleAddTask() }} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={[styles.addButtonWrapper, { backgroundColor: color, shadowColor: color }]}>
            <Add style={[styles.addText]} width='20' height='20'> Add ✍️ </Add>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>


    </View>
  );
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  taskWrapper: {
    paddingHorizontal: 20,
    marginBottom: 150,
    borderColor: '000',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'SemiBold',
    color: '#808080',
    textAlign: 'center',
    marginTop: 9,
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
    borderColor: '#ededed',
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
    elevation: 10,
  },
  addText: {
    fontFamily: 'SemiBold',
    color: 'white',
  },
})