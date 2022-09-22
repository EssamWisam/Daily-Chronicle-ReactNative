import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Pressable, Vibration, Alert, Modal, Keyboard } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Progress from 'react-native-progress';
import {  ActionType, textDecorator } from '../../utils/taskSetup';
import { useSelector, useDispatch } from 'react-redux';
import { SetTips } from '../../redux/slices/notes';
import { SetTasks } from '../../redux/slices/notes';
import RBSheet from 'react-native-raw-bottom-sheet';
import Lang from '../../assets/Lang.svg'
import Light from '../../assets/light.svg'
import Done from '../../assets/Done.svg'
import Slider from '@react-native-community/slider';
import Add from '../../assets/add.svg';
import { SetActionObjects } from '../../redux/slices/notes';
import { SetForCalendarView } from '../../redux/slices/notes';
import { StatusBar } from 'expo-status-bar';



export default Task = ({item, text, duration, actionObj, id}) => {
   const color = useSelector(state => state.colors.color)['hex']
   const  TILMode  = useSelector(state => state.notes.TILMode)
   const notesGenre = useSelector(state => state.notes.notesGenre)
   const allTasks = useSelector(state => state.notes.allTasks)
   const [actionObjects, setActionObjects] = [ useSelector(state => state.notes.actionObjects), (payload) => dispatch(SetActionObjects(payload))];
   const dispatch = useDispatch();
   const [tips, setTips] = [ useSelector(state => state.notes.tips), (payload) => dispatch(SetTips(payload))];
   const [tasks, setTasks] = [ useSelector(state => state.notes.tasks), (payload) => dispatch(SetTasks(payload))];
   const [input, setInput] = useState('');
   const  refRBSheet  = useRef();
   const refRBSheetInput = useRef();
   const [iconModalVisible, setIconModalVisible] = useState(false);
   const [svgModalVisible, setSvgModalVisible] = useState(false);
   const [forCalendarView, setForCalendarView] = [ useSelector(state => state.notes.forCalendarView), (payload) => dispatch(SetForCalendarView(payload))];
   const [inputIndex, setInputIndex] = useState(16);
   // whenever RB sheet changes
    useEffect(() => {
     setForCalendarView(!refRBSheetInput.current.state.modalVisible)
    }, [refRBSheetInput.current?.state.modalVisible]);

   const completeTask = (target) => {
        setTips(tips.filter((tip, i) => tip.id !== target));
    }

    const changeTaskDuration = (target, newDuration) => {
        setTasks(tasks.map((task, i) => {
            if(task.id === target) {
                return {...task, duration: newDuration/6.0};
            }
            return task;
        }))

    }

    const changeTaskAction = (target, newAction) => {
   
        const newState = tasks.map((task, i) => {
            if(task.id === target) {
                return {...task, action: newAction};
            }
            return task;
        })

        setTasks(newState);
      }
      // function to find a random color
      const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          let number = Math.floor(Math.random() * 16)
          number = number > 8 ? number - parseInt(number/3) : number;
          color += letters[number];
        }
        // make the color darker
        return color;
      }
      



    const addTaskAction = (actionText, idx) => {

        const newAction = {
            name: actionText,
            value: 0.0,
            color: randomColor(),
            index: idx,
            id: `${actionText}_${new Date().getMilliseconds()}`
        }
        setActionObjects([ newAction, ...actionObjects]);
      refRBSheetInput.current.close();
      setInput('');
      
    }


    const deleteAction = (target) => {
        // loop over allTasks and see if the action is used in any of them
        // Kept console.logging to write the next line
        const actionUsed = Object.entries(allTasks).flat().filter(x => typeof x !== 'string' && !(x instanceof String) && x?.length).flat().find(c => c.action.id === target);
        if (actionUsed) {
            Alert.alert("Unable to delete","You can't delete an action that is used in a task. Delete or change the task first.");
        }
        else if (actionObjects.find((action) => action.id === target).name === "Other") {
            Alert.alert("Unable to delete","You can't delete the default action.");
        }
        else {
        setActionObjects(actionObjects.filter((action) => action.id !== target));
        Vibration.vibrate(50);
        }
    }

    // whenever duration changes, update the task
    useEffect(() => {
      setSliderValue(item.duration * 6.0)
    }, item.duration)


    const [sliderValue, setSliderValue] = useState(item.duration);
    // convert decimal hours to hours and minutes
    const convertToHours = (decimalHours) => {
        let hours = Math.floor(decimalHours);
        let minutes = Math.round((decimalHours - hours) * 60);
        if (minutes == 0)     return hours + 'h';
        else                  return `${hours}h ${minutes}m`;
    }

   
   return(
      <>
      <View style={[styles.item, {backgroundColor: color, paddingRight: (TILMode)? 5:15 }]}>
         <View style={styles.itemLeft}>
         <TouchableOpacity onPress={() => (!TILMode)?setIconModalVisible(true):null}>
            {!TILMode && <ActionType index={actionObj.index} stylesProp={styles.itemStyle} />}
            {(TILMode && notesGenre == 'Language Spice') && <Lang style={ styles.itemStyle} width={22} color='white' height={22} />}
            {(TILMode && notesGenre == 'Todo') && <Done onPress={()=>completeTask(id)} style={ styles.itemStyle} width={25} color='white' height={25} />}
            {(TILMode && notesGenre == 'Self-Improvement') && <Light style={ styles.itemStyle} width={22} color='white' height={22} />}
            </TouchableOpacity>
            <Text style={[styles.itemText, {maxWidth: (TILMode)? (!(['Language Spice', 'Todo', 'Self-Improvement'].includes(notesGenre))?'100%':'85%'):'80%'}]}>{(duration)?textDecorator(text):text}</Text>
         </View>
         <TouchableOpacity onPress={()=>{ refRBSheet.current.open(); }}>
         <Progress.Pie  progress={(item.duration)} size={25} color='#f2f3f4' style={{display: (TILMode)? 'none': 'flex'}}  />
         </TouchableOpacity>
      </View>
      <RBSheet
      ref={refRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={true}
      height={130}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        container: {
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: '#f1f2f3',
          borderWidth: 2,
          borderColor: '#bababa',
        },
        draggableIcon: {
          backgroundColor: "#000"
        }
      }}
    >
      <Text style={{fontFamily: 'Regular', margin: 10, textAlign: 'center', fontSize: 15}}> How long did it take?</Text>
      <Text style={{fontFamily: 'SemiBold', margin: 0, textAlign: 'center', fontSize: 15}}> {convertToHours(sliderValue)}</Text>
    <Slider
    style={[{ backgroundColor: '#f1f2f3', width: '90%', paddingBottom: 5, paddingTop: 5}]}
    minimumValue={0}
    maximumValue={6}
    minimumTrackTintColor={color}
    maximumTrackTintColor="#929394"
    thumbTintColor={color}
    tapToSeek={true}
    onValueChange={(value) => setSliderValue(value)}
    onSlidingComplete={(value) => changeTaskDuration(id, value)}
    value={sliderValue}
    step={1/(12*60)}
  />
    </RBSheet>
    <Modal
      animationType={"fade"}
      visible={iconModalVisible}
      transparent={true}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.3)" />
      <Pressable style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%'}} onPress={()=> setIconModalVisible(false)}>
      <View style={{marginVertical: 120, borderRadius: 100, marginHorizontal: 20, backgroundColor: color, borderRadius: 40, }}>
      <ScrollView  contentContainerStyle={{flexDirection: 'row', alignItems: 'center', padding: 15, flexWrap: 'wrap', justifyContent: 'space-around', borderRadius: 40,
    }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 3, paddingHorizontal: 4, paddingVertical: 12, borderRadius: 60, marginVertical: 6, maxwidth: 250, backgroundColor: color}} onPress={()=>{ setIconModalVisible(false); refRBSheetInput.current.open(); }}>
      <Add  width={24} height={24} color={'#f1f2f3'} />
      <Text style={[styles.itemText, {color: '#f1f2f3', fontSize: 11, paddingTop: 2, textAlign: 'center'}]}>Add Action</Text>
      </TouchableOpacity>
        {actionObjects.map((action, i) => {
          return (
            <Pressable key={action.id} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, 
              {flexDirection: 'column', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 4, paddingVertical: 12,
             borderRadius: 60, marginVertical: 6, maxwidth: 200, minWidth: 100, backgroundColor: (action.id !=item.action.id)?color:'#f1f2f3', borderColor: '#dadada',
              borderWidth: 2}]} 
              onLongPress={()=>deleteAction(action.id)} onPress={()=>{changeTaskAction(id, action); setIconModalVisible(false)}}>
              <ActionType index={action.index} stylesProp={[ {color: (action.id ==item.action.id)?color:'#f1f2f3'}]} />
              <Text style={[styles.itemText, { color:(action.id ==item.action.id)?color:'#f1f2f3', fontSize: 11, paddingTop: 2, paddingHorizontal: 13, textAlign: 'center'}]}>{action.name}</Text>
            </Pressable>
          )
    })}
        </ScrollView>
        </View>
      </Pressable>
    </Modal>
    <Modal
      animationType={"fade"}
      visible={svgModalVisible}
      transparent={true}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.3)" />
      <Pressable style={{backgroundColor: 'rgba(0,0,0,0.3)', height: '100%'}} onPress={()=> setSvgModalVisible(false)}>
      <View style={{ borderRadius: 100, marginHorizontal: 20, backgroundColor: color, borderRadius: 40, position:'absolute', bottom: 20 }}>
      <ScrollView  contentContainerStyle={{flexDirection: 'row', alignItems: 'center', padding: 15, flexWrap: 'wrap', justifyContent: 'space-around', borderRadius: 40,
    }} showsVerticalScrollIndicator={false}>
        {[...Array(17).keys()].map((index, i) => {
          return (
            <Pressable key={index} style={({pressed})=>[{opacity:pressed ? 0.8 : 1}, 
              {flexDirection: 'column', alignItems: 'center', marginHorizontal: 2, paddingHorizontal: 4, paddingVertical: 12,
             borderRadius: 60, marginVertical: 6, maxwidth: 50, minWidth: 50, backgroundColor: (index!=inputIndex)?color:'#f1f2f3', borderColor: '#dadada',
              borderWidth: 2}]} 
              onPress={()=>{ setInputIndex(index); setSvgModalVisible(false)}}>
              <ActionType index={index} stylesProp={[ {color: (index==inputIndex)?color:'#f1f2f3'}]} />
            </Pressable>
          )
    })}
        </ScrollView>
        </View>
      </Pressable>
    </Modal>
    <RBSheet
        ref={refRBSheetInput}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={100}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: '#f1f2f3',
            borderWidth: 2,
            borderColor: '#bababa',
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.3)" />
        <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={{marginLeft:15, borderRadius: 50, borderColor: color, borderWidth: 2, padding: 6, }} onPress={()=>{setSvgModalVisible(true)}}>
        <ActionType  index={inputIndex} stylesProp={{color: color, padding: 2}} />
        </TouchableOpacity>
        <TextInput style={[{ paddingVertical: 15, paddingHorizontal: 13, backgroundColor: '#FFF', marginVertical: 20, marginHorizontal: 10,
    borderRadius: 60, borderWidth: 2, borderColor: '#bababa', width: '65%', fontFamily: 'Regular',}]} blurOnSubmit={false} 
        placeholder={"Make your own type of task!"} placeholderTextColor={'#708090'}
          onChangeText={text => setInput(text)} value={input} onSubmitEditing={() => { 
            if(input.trim()){
            addTaskAction(input, inputIndex); setIconModalVisible(true); setInputIndex(16);
            }
           }}  
          maxLength={21} 
          />
        <TouchableOpacity style={{marginLeft:5, borderRadius: 10, borderColor: 'white', borderWidth: 0, padding: 6, }} onPress={()=>{
        if(input.trim()){
          addTaskAction(input, inputIndex); setIconModalVisible(true); setInputIndex(16);
          }
        }}>
        <Add  width={27} height={27} color={color} />
        </TouchableOpacity>

        </View>
      </RBSheet>

    </>
   )
}

const styles = StyleSheet.create({

item: {
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ededed',
    marginTop: 0,
    marginRight: 0,

},
itemLeft: {
   flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 0,
}, 
circle: {
   width: 24,
    height:24,
    borderRadius: 50,
    backgroundColor: '#f2f3f4',
    opacity: 1.0,
   
},
itemText: {
    fontFamily: 'Regular',
      fontSize: 15,
      color: '#f2f3f4',
},
itemRight: {
    width: 24,
    height: 24,
    color: '#f2f3f4',
    marginRight: 15,
    marginLeft: 10

},
itemStyle: {
   width: 24,
   height: 24,
   color: '#f2f3f4',
   marginRight: 13,
   marginLeft: 13
},
});