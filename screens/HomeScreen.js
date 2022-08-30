import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from '../assets/colors/colors';
import Right from '../assets/right.svg'
import Left from '../assets/left.svg'
import { StatusBar } from 'expo-status-bar';
import NoteView from './components/NoteView';
import useKeyboardOpen from '../utils/keyboard';

export default HomeScreen = () => {
  const color = colors[0]
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var day = Math.floor((diff) / (1000 * 60 * 60 * 24));

  [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState({});

  const isKeyboardOpen = useKeyboardOpen();

  //convert date to string with format day and month name
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(day == 1 || day == 21 || day == 31)  day = day + 'st';
    else if(day == 2 || day == 22)          day = day + 'nd';
    else if(day == 3 || day == 23)          day = day + 'rd';
    else                                    day = day + 'th';
    return `${day} ${months[month]} ${year} `;
  }

  const calendarRef = useRef();
  // print hello world when component mounts
  useEffect(() => {
    const date = new Date()
    calendarRef.current.handleOnPressDay(date.getDate(), date.getMonth(), date.getFullYear())	
  } , []);

  const dayStyleDecider = (date) => {
    if(allTasks[date.toISOString()] && allTasks[date.toISOString()].length > 0) {
      return {
        textStyle: {color: color, fontFamily: 'Bold'}, 
      }
    }
    // if the chosen date is today, return the style for today
   
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <StatusBar style="light" />
      <View style={[styles.header]}>
        <View style={[styles.headerLeft]}>
          <Text style={[styles.headerText, { color: 'white',}]}>
            {(!isKeyboardOpen)? ("Good morning") : convertDate(selectedDate)}
          </Text>
        </View>
        <View style={[styles.headerRight]}>
          <Text style={[styles.headerText, { color: 'white',  }]}>✴</Text>
        </View>
      </View>
      <View style={[styles.instr]}>
        <Text style={[styles.instrText]}> <Text style={{color: 'white', fontFamily: 'SemiBold'}}>{365 - day} days</Text> left until 2023</Text>
      </View>
       <View style={[styles.calendarWrapper,{display: (isKeyboardOpen)? 'none': 'flex'} ]}>
        <CalendarPicker
          previousComponent={<Left width={24} height={24} style={{ color: 'black' }} ></Left>}
          nextComponent={<Right width={24} height={24} style={{ color: 'black' }} ></Right>}
          textStyle={{ fontFamily: 'SemiBold', color: 'black', fontSize: 14 }}
          monthTitleStyle={{ fontFamily: 'Bold', color: color, fontSize: 16 }}
          yearTitleStyle={{ fontFamily: 'Bold', color: 'black', fontSize: 16 }}
          selectedDayStyle={{ backgroundColor: color, borderWidth: 3, borderColor: color, fontSize: 16, elevation: 100, shadowColor: color }}
          selectedDayTextStyle={{ fontFamily: 'Bold', color: 'white' }}
          dayLabelsWrapper={{ borderBottomColor: color + "99", borderTopColor: color + "99", borderBottomWidth: 0, borderTopWidth: 0 }}
          maxDate={now}
          minDate={new Date(Date.now() - 24 * 3600 * 1000 * 365 * 99)}
          onDateChange={(date) => {setSelectedDate(date); }}
          customDatesStyles	= {(date)=>dayStyleDecider(date)}
          todayBackgroundColor={color + "a4"}
          ref={calendarRef}
        /> 
      </View>
      <NoteView selectedDate={selectedDate.toISOString()} setAllTasks={setAllTasks} allTasks={allTasks}/>
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
  header: {
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'SemiBold',
    fontSize: 30,
    paddingHorizontal: 14,
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
  }

});