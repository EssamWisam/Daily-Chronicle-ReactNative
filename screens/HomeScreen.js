import { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, Pressable, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { convertDate, getDay } from '../utils/taskSetup';
import { getGreeting } from '../utils/taskSetup';
import Right from '../assets/right.svg'
import Left from '../assets/left.svg'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import NoteView from './components/NoteView';
import useKeyboardOpen from '../utils/keyboard';
import Ham from '../assets/Ham.svg';
import ThickLeft from '../assets/thickleft.svg';
import PieScreen from './PieScreen';
import Donut from '../assets/Donut.svg';
import { BackHandler } from "react-native";
import {  useSelector, useDispatch } from 'react-redux';
import { SetColorMode } from '../redux/slices/colors';
import ColorPick from './components/ColorPick';
import X from '../assets/X.svg';
import { SetAllTasks } from '../redux/slices/notes';


export default HomeScreen = () => {
  const color = useSelector(state => state.colors.color)['hex']
  let now = new Date();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = [ useSelector(state => state.notes.allTasks), (payload) => dispatch(SetAllTasks(payload))];
  //const [allTasks, setAllTasks] = useState({})
  const isKeyboardOpen = useKeyboardOpen();
  const [fullscreen, setFullscreen] = useState(false);

  const  TILMode  = useSelector(state => state.notes.TILMode)
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = [ useSelector(state => state.colors.colorMode), (payload) => dispatch(SetColorMode(payload))];
  const [modalVisible, setModalVisible] = useState(false);
  const notesGenre =  useSelector(state => state.notes.notesGenre)


  const calendarRef = useRef();
  // print hello world when component mounts
  useEffect(() => {
    const date = new Date()
    calendarRef.current.handleOnPressDay(date.getDate(), date.getMonth(), date.getFullYear())
  }, []);

  const dayStyleDecider = (date) => {
    if (allTasks[date.toISOString().split('T')[0]] && allTasks[date.toISOString().split('T')[0]].length > 0) {
      return {
        textStyle: { color: color, fontFamily: 'Bold' },
      }
    }
    else if (date.toISOString().split('T')[0] == new Date().toISOString().split('T')[0]) {
      return {
        style: { backgroundColor: color + 'a5',}
      }
    }
    
  }

  const hideCalendar = useMemo(() => isKeyboardOpen || fullscreen, [isKeyboardOpen, fullscreen]);

  const navigation = useNavigation()
  function handleBackButtonClick() {
    console.log(fullscreen)               // Doesn't work without this console.log
    if(fullscreen){
      setFullscreen(false);
      //inputRef.current.blur();
      return true;
    }
    else {
        return false;
    }
    
  }
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  return (
    <>
    <StatusBar style="light" />
    <Pressable onPress={()=>setColorMode(false)} style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%" }}>
    {colorMode && <View style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%", position: 'absolute', zIndex: 4 }}></View>}
    <View style={[styles.container, { backgroundColor: color }]}>
        <View style={[styles.header]}>
          <View style={[styles.headerLeft]}>
            {(!hideCalendar || TILMode ) ?
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ham width={35} height={35} style={[styles.ham, { color: 'white' }]}></Ham>
              </TouchableOpacity> :
              (!TILMode) ?
              <TouchableOpacity onPress={() => { setFullscreen(false); Keyboard.dismiss() }}>
                <ThickLeft width={20} height={20} style={[styles.left, { color: 'white' }]}></ThickLeft>
              </TouchableOpacity>:
               null
              }
            <Text style={[styles.headerText, { color: 'white', }]}>
              {(!hideCalendar && !TILMode) ? (getGreeting()) : (!TILMode)? convertDate(selectedDate): notesGenre}
            </Text>
          </View>
          <View style={[styles.headerRight]}>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              {!hideCalendar && !TILMode && <Donut width={27} height={27} style={[styles.headerText, { color: 'white',marginRight: 10 }]}></Donut>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.instr]}>
          {!TILMode && <Text style={[styles.instrText]}> 
           {((!hideCalendar)?<Text><Text style={{ color: 'white', fontFamily: 'SemiBold' }}>{365 - getDay()} days</Text> left until {new Date().getFullYear()+1}</Text>: <Text style={{ color: 'white', fontFamily: 'Regular' }}>Start logging your day!</Text>)}
          </Text>}
        </View>
        <PieScreen  currentDate={selectedDate.toISOString().split('T')[0]}  modalVisible={modalVisible} dateText={convertDate(selectedDate)} /> 
        <View style={[styles.calendarWrapper, { display: (hideCalendar || TILMode || modalVisible) ? 'none' : 'flex' }]}>
          <CalendarPicker
            previousComponent={<Left width={24} height={24} style={{ color: 'black' }} ></Left>}
            nextComponent={<Right width={24} height={24} style={{ color: 'black' }} ></Right>}
            textStyle={{ fontFamily: 'SemiBold', color: 'black', fontSize: 14 }}
            monthTitleStyle={{ fontFamily: 'Bold', color: color, fontSize: 16 }}
            yearTitleStyle={{ fontFamily: 'Bold', color: 'black', fontSize: 16 }}
            selectedDayStyle={{ backgroundColor: color, borderWidth: 3, borderColor: color, fontSize: 16, shadowColor: color }}
            selectedDayTextStyle={{ fontFamily: 'Bold', color: 'white' }}
            dayLabelsWrapper={{ borderBottomColor: color + "99", borderTopColor: color + "99", borderBottomWidth: 0, borderTopWidth: 0 }}
            maxDate={now}
            minDate={new Date(Date.now() - 24 * 3600 * 1000 * 365 * 99)}
            onDateChange={(date) => { setSelectedDate(date); }}
            customDatesStyles={(date) => dayStyleDecider(date)}
            //todayBackgroundColor={color + "a4"}
            ref={calendarRef}
          />
        </View>
        {!modalVisible && <NoteView selectedDate={selectedDate.toISOString().split('T')[0]}  hideCalendar={hideCalendar} setFullscreen={setFullscreen}  />}
    </View>
    </Pressable>
    { colorMode && 
    // <Modal  animationType={"slide"} transparent={true} visible={colorMode} onRequestClose={() => {setColorMode(!colorMode);}}>
    <View style={[styles.colorContainer]}>
      <TouchableOpacity onPress={() => setColorMode(false)} >
      <X width={30} height={30} color="#bababa" style={styles.exit}  />
      </TouchableOpacity>
      <ColorPick />
    </View>
    // </Modal>
    }

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarWrapper: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#f2f3f4',
    marginTop: 20,
    padding: 5,
    marginBottom: -10

  },
  memoir: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  header: {
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'SemiBold',
    fontSize: 29,
    paddingHorizontal: 10,
    textAlign: 'left'
  },
  instr: {
    width: '100%',
    marginTop: '0.5%',

  },
  instrText: {
    fontFamily: 'Regular',
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 14,
    color: '#ededed',
    opacity: 0.8
  },
  ham: {

    marginLeft: 10,
  },
  left: {
    marginLeft: 10,
    marginBottom: 6
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  improvement: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,


  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',


  },
  bottomButton: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,

  },
  buttonText: {
    fontFamily: 'SemiBold'
  },
  colorContainer: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#efefef',
    width: '100%',
    marginBottom: 0,
    maxWidth: 500,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  exit: {
    position: 'absolute',
    top: 10,
    right: 15,

  }


});