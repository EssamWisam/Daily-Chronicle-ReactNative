// drawer and general
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// redux and friends
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useDispatch, useSelector } from 'react-redux';

// main components
import HomeScreen from './components/HomeScreen';
import NoteView from './components/NoteView/NoteView';
import CustomDrawerContent from './components/Drawer/CustomDrawerContent';

// ignore logs
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

  const drawerStyles = {
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
  }

  if (!fontsLoaded) return null;


  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={drawerStyles}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}>

        <Drawer.Screen name="Diary" component={HomeScreen} options={{ headerShown: false, }} />

        <Drawer.Screen name="Todo" options={{ headerShown: false, }} component={HomeScreen} />

        <Drawer.Screen name="Notes" options={{ headerShown: false, }} component={HomeScreen} />

        <Drawer.Screen name="Settings" options={{ headerShown: false }} component={NoteView} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
