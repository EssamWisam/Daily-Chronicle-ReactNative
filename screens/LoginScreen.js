import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Pressable} from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { handleLogin, auth, onAuthStateChanged} from '../utils/authentication';
import EmailIcon from '../assets/email.svg'
import PasswordIcon from '../assets/password.svg'
import { colors } from '../assets/colors/colors';


const LoginScreen = () => {
   // input fields
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   // whether or not they are focused
   const [emailFocused, setEmailFocused] = useState(false)
   const [passwordFocused, setPasswordFocused] = useState(false)
   const textFocusedStyle = {
      color: 'black',
      fontFamily: 'Bold',
   }
   const transformedStyle = {
         transform: [
           { scaleX: 1.1 },
           { scaleY: 1.1 }
         ]
   }

   // navigation
   const navigation = useNavigation()

   // colors
   const color = colors[1]
   
   // Debugging
   useEffect(()=> {
      const unsubscribe = onAuthStateChanged(auth, user => {
         if (user) {
            //navigation.replace('Home')
            console.log(user.photoURL)
            console.log(user.displayName)
            console.log(user.emailVerified)
            // removes back button in header (replace )
         } else {
            console.log('user is not logged in')
         }
      })
      return unsubscribe;
   }, []);


  return (
   <KeyboardAvoidingView style={styles.container}>
   <View style={styles.heading}>
      <Text style={styles.welcome}>Login</Text>
      <Text style={styles.instructions}>Please sign in to continue.</Text>
   </View>
   <View style={styles.inputsContainer} >
    <View style={[styles.inputBoxContainer]} >
     <EmailIcon width={18} height={18} style={[styles.inputIcon, emailFocused && textFocusedStyle]}></EmailIcon>
     <TextInput underlineColorAndroid='transparent' placeholder="Organizational Email" autoCorrect={false} value={email} 
     onChangeText={(text)=>setEmail(text)} onFocus={()=>setEmailFocused(true)} onBlur={()=>(email)?{}:setEmailFocused(false)} 
     style={[styles.input, emailFocused && textFocusedStyle]}/>
    </View>
    <View style={[styles.inputBoxContainer]} >
     <PasswordIcon width={20} height={20} fill="black" style={[styles.inputIcon, passwordFocused && textFocusedStyle]}></PasswordIcon>
     <TextInput placeholder="Password" value={password} onChangeText={(text)=>setPassword(text)} 
     onFocus={()=>setPasswordFocused(true)} onBlur={()=>(password)?{}:setPasswordFocused(false)}  
     style={[styles.input, passwordFocused && textFocusedStyle]} secureTextEntry={true}/>
     <TouchableOpacity onPress={()=>navigation.navigate('Reset')} style={[styles.msgContainer]}><Text 
     style={[styles.msg, {color: color}]}>FORGOT</Text></TouchableOpacity>
     </View>
   </View>
   <View style={[styles.buttonContainer, {shadowColor: color}]}>
   <Pressable style={({pressed})=>[styles.button, {backgroundColor: color}, pressed && transformedStyle]} 
   onPress={() => {handleLogin(email, password, color, navigation.replace, 'Home')}}>
    <View><Text style={[styles.buttonText]} >LOGIN ➔ </Text></View>
   </Pressable>
   </View>
   <View style={styles.footer}>
    <Text style={[styles.footerText]}> Not a member yet? <Text onPress={()=>navigation.replace('Register')} style={{color:color}}>Register now</Text> </Text>
   </View>
    </KeyboardAvoidingView>
  )
}



export default LoginScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   heading: {
      width: '80%',
      marginBottom: 40
   },
      welcome: {
         fontSize: 37,
         textAlign: 'left',
         fontFamily: 'ExtraBold',
      },
      instructions: {
         fontSize: 20,
         textAlign: 'left',
         fontFamily: 'Bold',
         color: 'grey',
      },

   inputsContainer: {
      width: '85%',
      },
      inputBoxContainer: {
         marginBottom: 10,
         backgroundColor: 'white',
         borderRadius: 10,         
      },
      inputIcon: {
         width: 20,
         height: 20,
         marginLeft: 10,
         position: 'absolute',
         zIndex: 1, 
         top: '35%',
         color: 'grey',
      },
      input: {
         backgroundColor: 'white',
         paddingLeft: 40,
         paddingRight: 15,
         paddingVertical: 10,
         borderRadius: 10,
         marginTop: 5,
         fontFamily: 'Regular',
         fontSize: 15,
         color: 'grey',
         },
      msgContainer: {
         position: 'absolute',
         left: '80%',
         top: '35%'
      },
      msg: {
         fontFamily: 'Bold',
         fontSize: 13,
   
      },
   buttonContainer: {
      marginLeft: '48%',
      width: '40%',
      marginTop: 15,
      borderRadius: 40,
      backgroundColor: 'white',
      shadowOffset: { width: 10, height: 10},
      shadowOpacity: 1.0,
      shadowRadius: 10,
      elevation: 30,

      },
   button: {
      backgroundColor: '#00bfff',
      paddingVertical: 13,
      paddingHorizontal: 5,
      borderRadius: 40,
      alignItems: 'center',
      },
   buttonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'SemiBold',
      letterSpacing: 2
      },
   footer: {
      width: '80%',
      position: 'absolute',
      top: '95%'
   },
   footerText: {
      fontSize: 15,
      textAlign: 'center',
      fontFamily: 'SemiBold',
      color: 'grey',
   }



});