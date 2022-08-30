import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NoteView from './screens/components/NoteView';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetScreen from './screens/ResetScreen';
import { Provider } from 'react-redux';
import { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { colors } from './assets/colors/colors';

const Stack = createNativeStackNavigator();

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
  const color = colors[1]
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
      <Stack.Navigator>
      <Stack.Screen 
              options={{
                headerShown: false,
                title: '✦ Daily Memoir',
                headerStyle: {
                  backgroundColor: '#f2f3f4',  shadowColor: color, 
                  elevation: 1, 
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontFamily: 'Bold', color: 'black', fontSize: 19, textAlign: 'center'
                },
              
              }}
      name="Home" component={HomeScreen} /> 
       <Stack.Screen options={{headerShown: false}} name="Note" component={NoteView} /> 
       <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} /> 
       <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} /> 
       <Stack.Screen options={{headerShown: false}} name="Reset" component={ResetScreen} /> 
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

// /Users/essam/Desktop/FirebaseAuth/node_modules