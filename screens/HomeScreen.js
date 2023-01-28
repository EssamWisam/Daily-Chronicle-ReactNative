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
import { SetSettingsMode } from '../redux/slices/colors';
import ColorPick from './components/ColorPick';
import X from '../assets/X.svg';
import { SetAllTasks } from '../redux/slices/notes';
import { SetNotesMode } from '../redux/slices/notes';
import { SetTodosMode } from '../redux/slices/notes';
import CalendarIcon from '../assets/Calendar.svg';

export default HomeScreen = () => {
  const color = useSelector(state => state.colors.color)['hex']
  let now = new Date();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = [ useSelector(state => state.notes.allTasks), (payload) => dispatch(SetAllTasks(payload))];
  const isKeyboardOpen = useKeyboardOpen();
  const [fullscreen, setFullscreen] = useState(false);

  const  [notesMode, setNotesMode] = [ useSelector(state => state.notes.notesMode), (payload) => dispatch(SetNotesMode(payload))];
  const [todosMode, setTodosMode] = [ useSelector(state => state.notes.todosMode), (payload) => dispatch(SetTodosMode(payload))];

  const dispatch = useDispatch();
  const [settingsMode, setSettingsMode] = [ useSelector(state => state.colors.settingsMode), (payload) => dispatch(SetSettingsMode(payload))];
  const [pieMode, setPieMode] = useState(false);
  const notesGenre =  useSelector(state => state.notes.notesGenre)
  const todosGenre =  useSelector(state => state.notes.todosGenre)
  const forCalendarView = useSelector(state => state.notes.forCalendarView)


  const calendarRef = useRef();
  useEffect(() => {
    const date = new Date()
    if(calendarRef.current){
    calendarRef.current.handleOnPressDay(date.getDate(), date.getMonth(), date.getFullYear())
    }

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

  const hideCalendar = useMemo(() => (isKeyboardOpen && forCalendarView) || fullscreen, [isKeyboardOpen, fullscreen, forCalendarView]);
  function handleBackButtonClick() {
    if(fullscreen){
      setFullscreen(false);
      return true;
    }
    else if (pieMode){
      setPieMode(false);
      return true;
    }
    else if (settingsMode){
      setSettingsMode(false);
      return true;
    }
    else if (notesMode){
      setNotesMode(false);
      return true;
    }
    else if (todosMode){
      setTodosMode(false);
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
  }, [fullscreen, pieMode, settingsMode, notesMode, todosMode]);

  return (
    <>
    <StatusBar style="light" />
    {
      // The following pressable and view are to detect presses outside the settings pop up 
    }
    <Pressable onPress={()=>setSettingsMode(false)} style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%" }}>
    {settingsMode && <View style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%", position: 'absolute', zIndex: 4 }}></View>}
    <View style={[styles.container, { backgroundColor: color }]}> 
    {
      // The header section starts here
    }
        <View style={[styles.header]}>
          <View style={[styles.headerLeft]}>
            {(!hideCalendar || notesMode || todosMode ) ?
              <TouchableOpacity onPress={() => {Keyboard.dismiss(); navigation.openDrawer();}}>
                <Ham width={35} height={35} style={[styles.ham, { color: 'white' }]}></Ham>
              </TouchableOpacity> :
              (!notesMode && !todosMode) ?
              <TouchableOpacity onPress={() => { setFullscreen(false); Keyboard.dismiss() }}>
                <ThickLeft width={20} height={20} style={[styles.left, { color: 'white' }]}></ThickLeft>
              </TouchableOpacity>:
               null
              }
            <Text style={[styles.headerText, { color: 'white', }]}>
              {(!hideCalendar && !notesMode && !todosMode) ? (getGreeting()) : (!notesMode && !todosMode)? convertDate(selectedDate): (notesMode)? notesGenre: todosGenre}
            </Text>
          </View>
          <View style={[styles.headerRight]}>
            <TouchableOpacity onPress={()=>setPieMode(!pieMode)}>
              {
                (!pieMode)? 
                !hideCalendar && !notesMode && !todosMode && <Donut width={27} height={27} style={[styles.headerText, { color: 'white',marginRight: 10 }]}/>
                :
                !hideCalendar && !notesMode && !todosMode && <CalendarIcon width={25} height={25} style={[styles.headerText, { color: 'white',marginRight: 13 }]}/>
                }
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.instr]}>
          {!notesMode && !todosMode && <Text style={[styles.instrText]}> 
           {((!hideCalendar)?<Text><Text style={{ color: 'white', fontFamily: 'SemiBold' }}>{365 - getDay()} days</Text> left until {new Date().getFullYear()+1}</Text>: <Text style={{ color: 'white', fontFamily: 'Regular' }}>Start logging your day!</Text>)}
          </Text>}
        </View>
        {
        // After the header either PieScreen or CalendarPicker are rendered depending on if pieMode is set
        }
        <PieScreen  currentDate={selectedDate.toISOString().split('T')[0]}  pieMode={pieMode} dateText={convertDate(selectedDate)} /> 
        {!(hideCalendar||notesMode||pieMode || todosMode) && <View style={[styles.calendarWrapper, { display:  'flex' }]}>
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
        </View>}
        {
        // The notes component gets rendered if notesMode is set 
        }
        {!pieMode  && <NoteView selectedDate={selectedDate.toISOString().split('T')[0]}  hideCalendar={hideCalendar} setFullscreen={setFullscreen}  />}
    </View>
    </Pressable>
    { settingsMode && 
    <View style={[styles.colorContainer]}>
      <ColorPick />
    </View>
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