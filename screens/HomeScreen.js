import { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { convertDate, getDay } from '../utils/taskSetup';
import { colors } from '../assets/colors/colors';
import Right from '../assets/right.svg'
import Left from '../assets/left.svg'
import { StatusBar } from 'expo-status-bar';
import NoteView from './components/NoteView';
import useKeyboardOpen from '../utils/keyboard';
import Ham from '../assets/Ham.svg';
import ThickLeft from '../assets/thickleft.svg';
import Light from '../assets/light.svg';

export default HomeScreen = () => {
  const color = colors[0]
  let now = new Date();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState({});

  const isKeyboardOpen = useKeyboardOpen();
  const [fullscreen, setFullscreen] = useState(false);

  const [TILMode, setTILMode] = useState(false);


  const calendarRef = useRef();
  // print hello world when component mounts
  useEffect(() => {
    const date = new Date()
    calendarRef.current.handleOnPressDay(date.getDate(), date.getMonth(), date.getFullYear())
  }, []);

  const dayStyleDecider = (date) => {
    if (allTasks[date.toISOString()] && allTasks[date.toISOString()].length > 0) {
      return {
        textStyle: { color: color, fontFamily: 'Bold' },
      }
    }
  
  }

  const hideCalendar = useMemo(() => isKeyboardOpen || fullscreen, [isKeyboardOpen, fullscreen]);


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="light" />
        <View style={[styles.header]}>
          <View style={[styles.headerLeft]}>
            {(!hideCalendar && !TILMode) ?
              <TouchableOpacity>
                <Ham width={35} height={35} style={[styles.ham, { color: 'white' }]}></Ham>
              </TouchableOpacity> :
              (!TILMode) ?
              <TouchableOpacity onPress={() => { setFullscreen(false); Keyboard.dismiss() }}>
                <ThickLeft width={20} height={20} style={[styles.left, { color: 'white' }]}></ThickLeft>
              </TouchableOpacity>:
               null
              }
            <Text style={[styles.headerText, { color: 'white', }]}>
              {(!hideCalendar && !TILMode) ? ("Good morning") : (!TILMode)? convertDate(selectedDate): "Self-Improvement"}
            </Text>
          </View>
          <View style={[styles.headerRight]}>
            <TouchableOpacity onPress={()=>setTILMode(!TILMode)}>
              <Text  style={[styles.headerText, { color: 'white', }]}>✴</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.instr]}>
          <Text style={[styles.instrText]}> 
          {(!TILMode)?
           (<Text><Text style={{ color: 'white', fontFamily: 'SemiBold' }}>{365 - getDay()} days</Text> left until 2023</Text>):
           (null)}
          </Text>
        </View>
        <View style={[styles.calendarWrapper, { display: (hideCalendar || TILMode) ? 'none' : 'flex' }]}>
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
            todayBackgroundColor={color + "a4"}
            ref={calendarRef}
          />
        </View>
        <NoteView selectedDate={selectedDate.toISOString()} setAllTasks={setAllTasks} allTasks={allTasks} hideCalendar={hideCalendar} setFullscreen={setFullscreen} TILMode={TILMode}/>
      </View>


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


  }

});