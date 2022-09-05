import 'react-native-gesture-handler';
import { useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import {  Text, View, Pressable, TextInput, Vibration } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { SetTILMode } from './redux/slices/notes';
import { SetColorMode } from './redux/slices/colors';
import { SetOpenedNotes } from './redux/slices/notes';
import { SetNoteFolders } from './redux/slices/notes';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import RBSheet from "react-native-raw-bottom-sheet";
import { Keyboard } from 'react-native';
import { SetNotesGenre } from './redux/slices/notes';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs(true)

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
  const [ TILMode , setTILMode ] = [ useSelector(state => state.notes.TILMode), (payload) => dispatch(SetTILMode(payload))];
  const [colorMode, setColorMode] = [ useSelector(state => state.colors.colorMode), (payload) => dispatch(SetColorMode(payload))];
  const color = useSelector(state => state.colors.color)['hex']
  const [openedNotes, setOpenedNotes] = [ useSelector(state => state.notes.openedNotes), (payload) => dispatch(SetOpenedNotes(payload))];
  const [noteFolders, setNoteFolders] = [ useSelector(state => state.notes.noteFolders), (payload) => dispatch(SetNoteFolders(payload))];
  const deleteFolder = (target) => {
    if(target != noteFolders[0]){
    setNoteFolders(noteFolders.filter((noteFolder, i) => noteFolder.id !== target.id));
    if (target.text == notesGenre)  setNotesGenre((noteFolders[0].text));
    Vibration.vibrate(50);}
  }
  const refRBSheet = useRef();
  const [text, setText] = useState("");

  const handleAddFolder = () => {
    if(text) {
      setNoteFolders([...noteFolders, {
        text: text,
        id: `${text}_${new Date().getMilliseconds()}`,
       }]);
    setText('');
    refRBSheet.current.close()
    Keyboard.dismiss();
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label = {() => <Text style={{ color: 'white', fontFamily: 'Bold', fontSize: 35 }}>{"✵ Daily Chronicle"}</Text>}
      />
        <DrawerItem
        label = {() => <Text style={{ color: TILMode ? 'white': color, fontFamily: 'SemiBold', letterSpacing: 2 }}>{"Diary"}</Text>}
        icon={({focused, size}) => (<Diary width={25} height={25} color={TILMode ? 'white': color} />)}
        activeTintColor='white'
        activeBackgroundColor={TILMode ? 'transparent': 'white'}
        inactiveBackgroundColor={TILMode ? 'transparent': 'white'}
        onPress={()=> {setTILMode(false); props.navigation.closeDrawer(); }}
      />
        <DrawerItem
        label = {() => <Text style={{ color: TILMode ? color: 'white', fontFamily: 'SemiBold', letterSpacing: 2 }}>Notes</Text>}
        icon={({focused, size}) => (<Notedown width={25} height={25} color={TILMode ? color: 'white'} />)}
        activeTintColor='white'
        activeBackgroundColor={TILMode ? 'white': 'transparent'}
        inactiveBackgroundColor={TILMode ? 'white': 'transparent'}
        onPress={()=> {setOpenedNotes(!openedNotes); }}
      />
        {openedNotes && 
        noteFolders.map((noteFolder, index) => {
          return (
            <View  key={noteFolder.id}  >
            <DrawerItem
              label = {() => <Text style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 13, }}>{"   "}<Text style={{textDecorationLine: (TILMode && (noteFolder.text==notesGenre))? 'underline' : 'none'}}>{noteFolder.text}</Text></Text>}
              icon={({focused, size}) => {
                return (<Paper width={20} height={20} style={{marginLeft: 10, marginRight: -20}} color='white' />)
              }}
              activeTintColor='white'
              //activeBackgroundColor={TILMode ? 'white': 'transparent'}
              //inactiveBackgroundColor={TILMode ? 'white': 'transparent'}
              onPress={()=> {setTILMode(true); props.navigation.closeDrawer(); }}
            />
            <Pressable onPress={()=>{setTILMode(true); props.navigation.closeDrawer(); setNotesGenre(noteFolder.text); }} onLongPress= {()=>deleteFolder(noteFolder)} 
            style={({ pressed })=>[{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', backgroundColor: (pressed)? '#00000011': 'transparent' }]}
             color={false ? color: 'white'} />
            </View>
            )})
      }
      {openedNotes && <DrawerItem
              label = {() => <Text style={{ color:  'white', fontFamily: 'SemiBold', letterSpacing: 1, fontSize: 13 }}>{"   Add More"}</Text>}
              icon={({focused, size}) => (<Add width={14} height={14} style={{marginLeft: 10, marginRight: -20}} color={false ? color: 'white'} />)}
              activeTintColor='white'
              onPress={() => refRBSheet.current.open()}
             />}
      <DrawerItem
        label = {() => <Text style={{ color: 'white', fontFamily: 'SemiBold', letterSpacing: 2 }}>{"Settings"}</Text>}
        icon={({focused, size}) => (<Paint width={28} height={28} color='white' />)}
        activeTintColor='white'
        onPress={()=> {setColorMode(true); props.navigation.closeDrawer();}}
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
        <TextInput style={[{ paddingVertical: 15, paddingHorizontal: 13, backgroundColor: '#FFF', marginVertical: 20, marginHorizontal: 10,
    borderRadius: 60, borderWidth: 2, borderColor: color, width: '90%', fontFamily: 'Regular',}]} blurOnSubmit={false} 
        placeholder={"Add a new notes folder"} placeholderTextColor={'#708090'}
          onChangeText={text => setText(text)} value={text} onSubmitEditing={() => { handleAddFolder() }}  
          maxLength={15} 
          />

      </RBSheet>

    </DrawerContentScrollView>
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
      width: 280,
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
