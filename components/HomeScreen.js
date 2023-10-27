// Hooks
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import {  useSelector, useDispatch } from 'react-redux';

// Basic UI
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, ScrollView, Pressable, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { BackHandler } from "react-native";

// Utility Functions
import { convertDate, getDay } from '../utils/taskSetup';
import { getGreeting } from '../utils/taskSetup';
import useKeyboardOpen from '../utils/keyboard';

// Components
import NoteView from './NoteView/NoteView';
import PieScreen from './PieScreen';
import ColorPick from './ColorPick';

// State Management
import { SetSettingsMode } from '../redux/slices/colors';
import { SetAllTasks } from '../redux/slices/notes';
import { SetNotesMode } from '../redux/slices/notes';
import { SetTodosMode } from '../redux/slices/notes';

// Icons
import Right from '../assets/right.svg'
import Left from '../assets/left.svg'
import Ham from '../assets/Ham.svg';
import ThickLeft from '../assets/thickleft.svg';
import Donut from '../assets/Donut.svg';
import CalendarIcon from '../assets/Calendar.svg';

export default HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Calendar related
  let now = new Date();
  const isKeyboardOpen = useKeyboardOpen();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const forCalendarView = useSelector(state => state.notes.forCalendarView)
  const [allTasks, setAllTasks] = [ useSelector(state => state.notes.allTasks), (payload) => dispatch(SetAllTasks(payload))];
  const [fullscreen, setFullscreen] = useState(false);
  const hideCalendar = useMemo(() => (isKeyboardOpen && forCalendarView) || fullscreen, [isKeyboardOpen, fullscreen, forCalendarView]);
  const calendarRef = useRef();
    // Set time on calendar once it starts
  useEffect(() => {
    const date = new Date()
    if(calendarRef.current){
    calendarRef.current.handleOnPressDay(date.getDate(), date.getMonth(), date.getFullYear())
    }

  }, []);
    // Decide theme for calendar day
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

  // Notes related
  const  [notesMode, setNotesMode] = [ useSelector(state => state.notes.notesMode), (payload) => dispatch(SetNotesMode(payload))];
  const notesGenre =  useSelector(state => state.notes.notesGenre)

  // Todos related
  const [todosMode, setTodosMode] = [ useSelector(state => state.notes.todosMode), (payload) => dispatch(SetTodosMode(payload))];
  const todosGenre =  useSelector(state => state.notes.todosGenre)

  // Settings related
  const [settingsMode, setSettingsMode] = [ useSelector(state => state.colors.settingsMode), (payload) => dispatch(SetSettingsMode(payload))];
  const color = useSelector(state => state.colors.color)['hex']

  // Statistics related
  const [pieMode, setPieMode] = useState(false);
  useEffect(() => {               // whenever noteMode or todosMode is true, pieMode is false
    if (notesMode || todosMode){
      setPieMode(false);
    }
  }, [notesMode, todosMode]);
  
  // Handle back button
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
    { /* To detect presses outside the settings modal */ }
      <Pressable onPress={()=>setSettingsMode(false)} style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%" }}>
      {settingsMode && <View style={{ flex: 1, backgroundColor: 'transparent', height: "100%", width:"100%", position: 'absolute', zIndex: 4 }}></View>}
      <View style={[styles.container, { backgroundColor: color }]}> 
      { /* The header section starts here */ }
      <Header hideCalendar={hideCalendar} notesMode={notesMode} todosMode={todosMode} 
              setFullscreen={setFullscreen} navigation={navigation} selectedDate={selectedDate} 
              getGreeting={getGreeting} convertDate={convertDate} notesGenre={notesGenre} 
              todosGenre={todosGenre} pieMode={pieMode} setPieMode={setPieMode}
        />
        {/* After the header either PieScreen or CalendarPicker are rendered depending on if pieMode is set */}
          {/*Pie Screen*/}
          <PieScreen  currentDate={selectedDate.toISOString().split('T')[0]}  pieMode={pieMode} dateText={convertDate(selectedDate)} /> 
          {/* Calendar */}
          { <View style={[styles.calendarWrapper, { display: !(hideCalendar||notesMode||pieMode || todosMode)?  'flex':'none' }]}>
            <CalendarPicker
              previousComponent={<Left width={24} height={24} style={{ color: 'black' }} ></Left>}
              nextComponent={<Right width={24} height={24} style={{ color: 'black' }} ></Right>}
              textStyle={{ fontFamily: 'SemiBold', color: 'black', fontSize: 14 }}
              monthTitleStyle={{ fontFamily: 'Bold', color: color, fontSize: 16 }}
              yearTitleStyle={{ fontFamily: 'Bold', color: 'black', fontSize: 16 }}
              selectedDayStyle={{ backgroundColor: color, borderWidth: 3, borderColor: color, fontSize: 16, shadowColor: color }}
              selectedDayTextStyle={{ fontFamily: 'SemiBold', color: 'white' }}
              dayLabelsWrapper={{ borderBottomColor: color + "99", borderTopColor: color + "99", borderBottomWidth: 0, borderTopWidth: 0 }}
              maxDate={now}
              minDate={new Date(Date.now() - 24 * 3600 * 1000 * 365 * 99)}
              onDateChange={(date) => { setSelectedDate(date); }}
              customDatesStyles={(date) => dayStyleDecider(date)}
              //todayBackgroundColor={color + "a4"}
              ref={calendarRef}
            />
          </View>}
        { /* Notes Component Rendered if notesMode is set */}
        {!pieMode  && <NoteView selectedDate={selectedDate.toISOString().split('T')[0]}  hideCalendar={hideCalendar} setFullscreen={setFullscreen}  />}
    </View>
    </Pressable>
    { /* Settings Color picker */}
    { settingsMode && 
    <View style={[styles.colorContainer]}>
      <ColorPick />
    </View>
    }

    </>
  );
}

const Header = ({ hideCalendar, notesMode, todosMode, setFullscreen, navigation, selectedDate, getGreeting, convertDate, 
                  notesGenre, todosGenre, pieMode, setPieMode,
}) => {
  return (
    <>
      <View style={styles.header}>
      {/* Menu, Day Greeting, and Day */}
      <View style={styles.headerLeft}>
        {(!hideCalendar || notesMode || todosMode) ? (
          <TouchableOpacity onPress={() => { Keyboard.dismiss(); navigation.openDrawer(); }}>
            <Ham width={35} height={35} style={[styles.ham, { color: 'white' }]} />
          </TouchableOpacity>
        ) : (!notesMode && !todosMode) ? (
          <TouchableOpacity onPress={() => { setFullscreen(false); Keyboard.dismiss() }}>
            <ThickLeft width={20} height={20} style={[styles.left, { color: 'white' }]} />
          </TouchableOpacity>
        ) : null}
        <Text allowFontScaling={false} style={[styles.headerText, { color: 'white' }]}>
          {(!hideCalendar && !notesMode && !todosMode) ? getGreeting() : (!notesMode && !todosMode) ? convertDate(selectedDate) : (notesMode) ? notesGenre : todosGenre}
        </Text>
      </View>
      {/* Pie Icon or Calendar Icon */}
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => setPieMode(!pieMode)}>
          {(!pieMode) ? (
            !hideCalendar && !notesMode && !todosMode && <Donut width={27} height={27} style={[styles.headerText, { color: 'white', marginRight: 10 }]} />
          ) : (
            !hideCalendar && !notesMode && !todosMode && <CalendarIcon width={25} height={25} style={[styles.headerText, { color: 'white', marginRight: 13 }]} />
          )}
        </TouchableOpacity>
      </View>
      </View>
      <View style={[styles.instr]}>
            {!notesMode && !todosMode && <Text allowFontScaling={false} style={[styles.instrText]}> 
            {((!hideCalendar)?<Text><Text allowFontScaling={false} style={{ color: 'white', fontFamily: 'SemiBold' }}>{365 - getDay()} days</Text> left until {new Date().getFullYear()+1}</Text>: <Text allowFontScaling={false} style={{ color: 'white', fontFamily: 'Regular'}}>Start logging your day!</Text>)}
            </Text>}
      </View>
    </>
  );
};

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
    fontSize: 27,
    paddingHorizontal: 10,
    textAlign: 'left'
  },
  instr: {
    width: '100%',
    marginTop: '0.5%',

  },
  instrText: {
    fontFamily: 'Regular',
    fontSize: 14,
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