import 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {  Text, View, Pressable, TextInput, Vibration, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NoteView from './screens/components/NoteView';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Diary from './assets/Diary.svg';
import Paper from './assets/Paper.svg';
import Paint from './assets/Paint.svg';
import Notedown from './assets/Notedown.svg';
import Add from './assets/add.svg';
import Delete from './assets/Delete.svg';
import Edit from './assets/Edit.svg';
import Down from './assets/Down.svg';
import Todo from './assets/Todo.svg';
import InProgress from './assets/InProgress.svg';
import Complete from './assets/Complete.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SetNotesMode } from './redux/slices/notes';
import { SetTodosMode } from './redux/slices/notes';
import { SetSettingsMode } from './redux/slices/colors';
import { SetOpenedNotes } from './redux/slices/notes';
import { SetOpenedTodos } from './redux/slices/notes';
import { SetNoteFolders } from './redux/slices/notes';
import { SetForCalendarView } from './redux/slices/notes';
import { SetTips } from './redux/slices/notes';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import RBSheet from "react-native-raw-bottom-sheet";
import { Keyboard } from 'react-native';
import { SetNotesGenre } from './redux/slices/notes';
import { SetTodosGenre } from './redux/slices/notes';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Drawer = createDrawerNavigator();

export default AppWrapper = () => {
  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>  
       <RootSiblingParent>
      <App />
      </RootSiblingParent>
       </PersistGate>  
    </Provider>
  )
}

  
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const [notesGenre, setNotesGenre] = [ useSelector(state => state.notes.notesGenre), (payload) => dispatch(SetNotesGenre(payload))];
  const [todosGenre, setTodosGenre] = [ useSelector(state => state.notes.todosGenre), (payload) => dispatch(SetTodosGenre(payload))];
  const [notesMode , setNotesMode ] = [ useSelector(state => state.notes.notesMode), (payload) => dispatch(SetNotesMode(payload))];
  const [todosMode , setTodosMode ] = [ useSelector(state => state.notes.todosMode), (payload) => dispatch(SetTodosMode(payload))];
  const [settingsMode, setSettingsMode] = [ useSelector(state => state.colors.settingsMode), (payload) => dispatch(SetSettingsMode(payload))];
  const color = useSelector(state => state.colors.color)['hex']
  const [openedNotes, setOpenedNotes] = [ useSelector(state => state.notes.openedNotes), (payload) => dispatch(SetOpenedNotes(payload))];
  const [openedTodos, setOpenedTodos] = [ useSelector(state => state.notes.openedTodos), (payload) => dispatch(SetOpenedTodos(payload))];
  const [noteFolders, setNoteFolders] = [ useSelector(state => state.notes.noteFolders), (payload) => dispatch(SetNoteFolders(payload))];
  const [forCalendarView, setForCalendarView] = [ useSelector(state => state.notes.forCalendarView), (payload) => dispatch(SetForCalendarView(payload))];

  const [tips, setTips] = [ useSelector(state => state.notes.tips), (payload) => dispatch(SetTips(payload))];
  const refRBSheet2 = useRef();
  const [RBText2, setRBText2] = useState('')
  const [RBTargetID, setRBTargetID] = useState(null)

  const deleteFolder = () => {
    if(RBTargetID != noteFolders[0].id){
    setNoteFolders(noteFolders.filter((noteFolder, i) => noteFolder.id !== RBTargetID));
    setNotesGenre((noteFolders[0].text));
    refRBSheet2.current.close();
    
  }
  }

  const editFolder = () => {
    const newNoteFolders = [...noteFolders];
    const index = newNoteFolders.findIndex(noteFolder => noteFolder.id === RBTargetID);
    const newTips = [...tips];
    // find each tip with genre == newNoteFolders[index].text and change it to RBText2
    newTips.forEach((tip, i) => {
      if(tip.genre == newNoteFolders[index].text) {
        newTips[i] = {...newTips[i], genre: RBText2};
      }
    })
    setTips(newTips);

    newNoteFolders[index] = {...newNoteFolders[index], text: RBText2};


    setNoteFolders(newNoteFolders);
    refRBSheet2.current.close();
  }


  const refRBSheet = useRef();
  const [text, setText] = useState("");

  const handleAddFolder = () => {
    if(text.trim()) {
      setNoteFolders([...noteFolders, {
        text: text,
        id: `${text}_${new Date().getMilliseconds()}`,
       }]);
    setText('');
    refRBSheet.current.close()
    Keyboard.dismiss();
    setTimeout(() => {
    setForCalendarView(true);
    }, 400);
    }
  }

  useEffect(() => {
    setForCalendarView(!refRBSheet.current.state.modalVisible)
   }, [refRBSheet.current?.state.modalVisible]);

  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView {...props} keyboardShouldPersistTaps='handled'    >
      <DrawerItem
        label = {() => <Text allowFontScaling={false} style={{ color: 'white', fontFamily: 'Bold', fontSize: 30 }}>{"✵ Daily Chronicle"}</Text>}
      />
        <DrawerItem
        label = {() => <Text allowFontScaling={false} style={{ color: notesMode||todosMode ? 'white': color, fontFamily: 'SemiBold', letterSpacing: 2, fontSize: 12 }}>{"Diary"}</Text>}
        icon={({focused, size}) => (
        <>
        <Diary width={25} height={25} color={notesMode||todosMode ? 'white': color} />
        </>

        )}
        activeTintColor='white'
        activeBackgroundColor={notesMode||todosMode ? 'transparent': 'white'}
        inactiveBackgroundColor={notesMode||todosMode ? 'transparent': 'white'}
        onPress={()=> {setNotesMode(false); setTodosMode(false); props.navigation.closeDrawer(); }}
      />
        <DrawerItem
        label = {() => <Text allowFontScaling={false} style={{ color: todosMode ? color: 'white', fontFamily: 'SemiBold', letterSpacing: 2, fontSize: 12 }}>Todo</Text>}
        icon={({focused, size}) => (
        <>
        <Todo width={32} height={32} color={todosMode ? color: 'white'} />
        <Down width={25} height={25} color={todosMode ? color: 'white'} style={{ position: "absolute",right: 10,}}/>
        </>
        )}
        activeTintColor='white'
        activeBackgroundColor={todosMode? 'white': 'transparent'}
        inactiveBackgroundColor={todosMode ? 'white': 'transparent'}
        onPress={()=> {setOpenedTodos(!openedTodos); }}
      />
      {openedTodos && 
        <>
            <View  key={0}  >
            <DrawerItem
              label = {() => <Text allowFontScaling={false} style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 10, }}>{"   "}<Text allowFontScaling={false} style={{textDecorationLine: (todosMode && ("In Progress"==todosGenre))? 'underline' : 'none'}}>In Progress</Text></Text>}
              icon={({focused, size}) => {
                return (<InProgress width={20} height={20} style={{marginLeft: 10, marginRight: -20}} color='white' />)
              }}
              activeTintColor='white'
              onPress={()=> {setTodosMode(true); setNotesMode(false); props.navigation.closeDrawer(); }}
            />
            <Pressable onPress={()=>{setTodosMode(true); setNotesMode(false); props.navigation.closeDrawer(); setTodosGenre("In Progress"); }} 
            style={({ pressed })=>[{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', backgroundColor: (pressed)? '#00000011': 'transparent' }]}
             color={false ? color: 'white'} />
            </View>
            <View  key={1}  >
            <DrawerItem
              label = {() => <Text allowFontScaling={false} style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 10, }}>{"   "}<Text allowFontScaling={false} style={{textDecorationLine: (todosMode && ("Completed"==todosGenre))? 'underline' : 'none'}}>Completed</Text></Text>}
              icon={({focused, size}) => {
                return (<Complete width={20} height={20} style={{marginLeft: 10, marginRight: -20}} color='white' />)
              }}
              activeTintColor='white'
              onPress={()=> {setTodosMode(true); setNotesMode(false); props.navigation.closeDrawer(); }}
            />
            <Pressable onPress={()=>{setTodosMode(true); setNotesMode(false); props.navigation.closeDrawer(); setTodosGenre("Completed"); }} 
            style={({ pressed })=>[{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', backgroundColor: (pressed)? '#00000011': 'transparent' }]}
             color={false ? color: 'white'} />
            </View>
        </>
      }
        <DrawerItem
        label = {() => <Text allowFontScaling={false} style={{ color: notesMode ? color: 'white', fontFamily: 'SemiBold', letterSpacing: 2, fontSize: 12 }}>Notes</Text>}
        icon={({focused, size}) => (
        <>
        <Notedown width={25} height={25} color={notesMode ? color: 'white'} />
        <Down width={25} height={25} color={notesMode ? color: 'white'} style={{ position: "absolute",right: 10,}}/>
        </>
        )}
        activeTintColor='white'
        activeBackgroundColor={notesMode ? 'white': 'transparent'}
        inactiveBackgroundColor={notesMode ? 'white': 'transparent'}
        onPress={()=> {setOpenedNotes(!openedNotes); }}
      />
        {openedNotes && 
        noteFolders.map((noteFolder, index) => {
          return (
            <View  key={noteFolder.id}  >
            <DrawerItem
              label = {() => <Text allowFontScaling={false} style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 10, }}>{"   "}<Text allowFontScaling={false} style={{textDecorationLine: (notesMode && (noteFolder.text==notesGenre))? 'underline' : 'none'}}>{noteFolder.text}</Text></Text>}
              icon={({focused, size}) => {
                return (<Paper width={20} height={20} style={{marginLeft: 10, marginRight: -20}} color='white' />)
              }}
              activeTintColor='white'
              onPress={()=> {setNotesMode(true); setTodosMode(false); props.navigation.closeDrawer(); }}
            />
            <Pressable onPress={()=>{setNotesMode(true); setTodosMode(false); props.navigation.closeDrawer(); setNotesGenre(noteFolder.text); }} onLongPress= {()=> {refRBSheet2.current.open(); setRBTargetID(noteFolder.id); setRBText2(noteFolder.text)}} 
            style={({ pressed })=>[{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', backgroundColor: (pressed)? '#00000011': 'transparent' }]}
             color={false ? color: 'white'} />
            </View>
            )})
      }
      {openedNotes && <DrawerItem
              label = {() => <Text allowFontScaling={false} style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 10 }}>{"   Add More"}</Text>}
              icon={({focused, size}) => (<Add width={14} height={14} style={{marginLeft: 10, marginRight: -20}} color={false ? color: 'white'} />)}
              activeTintColor='white'
              onPress={() => {refRBSheet.current.open(); setForCalendarView(false);}}
             />}
      <DrawerItem
        label = {() => <Text allowFontScaling={false} style={{ color: 'white', fontFamily: 'SemiBold', letterSpacing: 2, fontSize: 12 }}>{"Settings"}</Text>}
        icon={({focused, size}) => (<Paint width={28} height={28} color='white' />)}
        activeTintColor='white'
        onPress={()=> {setSettingsMode(true); props.navigation.closeDrawer();}}
      />
      {/* <DrawerItemList {...props} /> Made all custom, GG*/ }
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={100}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#f1f2f3'
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
      <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
        <TextInput allowFontScaling={false} style={[{ paddingVertical: 15, paddingHorizontal: 13, backgroundColor: '#FFF', marginVertical: 20, marginHorizontal: 10,
    borderRadius: 60, borderWidth: 2, borderColor: color, width: '80%', fontFamily: 'Regular', fontSize: 12}]} blurOnSubmit={false} 
        placeholder={"Add a new notes folder"} placeholderTextColor={'#708090'}
          onChangeText={text => setText(text)} value={text} onSubmitEditing={() => { handleAddFolder() }}  
          maxLength={17} 
          />
        <TouchableOpacity style={{marginLeft:5, borderRadius: 10, borderColor: 'white', borderWidth: 0, padding: 6, }} onPress={()=>{
          handleAddFolder()
        }}>
        <Add  width={27} height={27} color={color} />
        </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={false}
        closeOnPressMask={true}
        height={100}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",

          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#f2f3f4',
            borderWidth: 1,
            borderColor: color
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
        }}
      >
      <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
      <TouchableOpacity style={{marginLeft:5, borderRadius: 10, borderColor: 'white', borderWidth: 0, padding: 6, }} onPress={()=>{
          deleteFolder()
        }}>
        <Delete  width={27} height={27} color={color} />
        </TouchableOpacity>
        <TextInput allowFontScaling={false} style={[{ paddingVertical: 15, paddingHorizontal: 13, backgroundColor: '#FFF', marginVertical: 20, marginHorizontal: 10,
    borderRadius: 60, borderWidth: 2, borderColor: color, width: '70%', fontFamily: 'Regular', fontSize: 12}]} blurOnSubmit={false} 
        placeholderTextColor={'#708090'}
          onChangeText={text => setRBText2(text)} value={RBText2} onSubmitEditing={() => { editFolder() }}  
          maxLength={17} 
          />
        <TouchableOpacity style={{marginLeft:5, borderRadius: 10, borderColor: 'white', borderWidth: 0, padding: 6, }} onPress={()=>{
          editFolder()
        }}>
        <Edit  width={32} height={32} color={color} />
        </TouchableOpacity>
        </View>
      </RBSheet>

    </DrawerContentScrollView>
    </View>
  );
}

 function App() {
  const color = useSelector(state => state.colors.color)['hex']


  const [fontsLoaded] = useFonts({
    'Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'ExtraBoldItalic': require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  });
  if (!fontsLoaded) return null;
  

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
    drawerStyle: {
      backgroundColor: color,
      width: 270,
    },
    drawerLabelStyle: {
      color: 'white',
      fontFamily: 'SemiBold',
      letterSpacing: 2
    },
    drawerActiveTintColor: 'white',
    initialRouteName: 'Diary',

  
  }}
  useLegacyImplementation
  drawerContent={(props) => <CustomDrawerContent {...props}/>}
  >
       <Drawer.Screen  name="Diary" component={HomeScreen} 
       options={{headerShown: false,}}/> 

      <Drawer.Screen  name="Todo" 
       options={{headerShown: false, }}
       component={HomeScreen} /> 

       <Drawer.Screen  name="Notes" 
       options={{headerShown: false, }}
       component={HomeScreen} /> 

       <Drawer.Screen  name="Settings"
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Paint width={28} height={28} color='white' 
            />)
         }}
       component={NoteView} /> 
      </Drawer.Navigator>
      
    </NavigationContainer> 
  );
}
