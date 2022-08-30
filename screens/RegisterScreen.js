import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, TextInput, Image } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { isInvalidEmail, isInvalidName, isInvalidPassword, isWeakPassword } from '../utils/validate';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { handleSignUp } from '../utils/authentication';
import EmailIcon from '../assets/email.svg'
import PasswordIcon from '../assets/password.svg'
import ProfileIcon from '../assets/profile.svg'
import EyeIconOpen from '../assets/show.svg'
import EyeIconClosed from '../assets/hide.svg'
import useKeyboardOpen from "../utils/keyboard";
import { printError } from '../utils/authentication';
import { colors } from '../assets/colors/colors';


const RegisterScreen = () => {

   const isKeyboardOpen = useKeyboardOpen();

   // input fields
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [fname, setFname] = useState('')
   const [lname, setLname] = useState('')
   //whether or not they are focused
   const [emailFocused, setEmailFocused] = useState(false)
   const [passwordFocused, setPasswordFocused] = useState(false)
   const [fnameFocused, setFnameFocused] = useState(false)
   const [lnameFocused, setLnameFocused] = useState(false)
   const [weakPassword, setWeakPassword] = useState(false)
   const textFocusedStyle = {
      color: 'black',
      fontFamily: 'Bold',
   }

   // validation
   const [errorFname, setErrorFname] = useState('')
   const [errorLname, setErrorLname] = useState('')
   const [errorEmail, setErrorEmail] = useState('')
   const [errorPassword, setErrorPassword] = useState('')
   const [shownPassword, setShownPassword] = useState(false)
   
   const navigation = useNavigation()

   // colors
   const color = colors[1]

   const transformedStyle = {
      transform: [
        { scaleX: 1.1 },
        { scaleY: 1.1 }
      ]
   }

   const handleSignUpWrapper =() => {
      if (isInvalidName(fname) || isInvalidName(lname) || isInvalidEmail(email) || isInvalidPassword(password)) {
         setErrorFname('Invalid first name')
         setErrorLname('Invalid last name')
         setErrorEmail('Invalid email')
         setErrorPassword('Invalid password')
         printError("Couldn't sign up. ")
      }
      else {
         handleSignUp(fname, lname, email, password, navigation.replace, 'Login', color);
      }
   }
   

  return (
   <KeyboardAvoidingView style={styles.container} >
   {!isKeyboardOpen && <View style={styles.heading}>
      <Text style={styles.welcome}>Enroll Now!</Text>
      <Text style={styles.instructions}>Join your organization on Poll-ups by signing up now.</Text>
   </View>}
    <View style={styles.inputsContainer}>
    <View style={[styles.inputBoxContainer, {borderColor: errorFname ? '#BC243C' : 'transparent'}]} >
    <ProfileIcon width={18} height={18} style={[styles.inputIcon, (fnameFocused||fname) && textFocusedStyle]}></ProfileIcon>
     <TextInput placeholder="First Name" value={fname} style={[styles.input, (fnameFocused||fname) && textFocusedStyle]} 
        onBlur={() => {setErrorFname(isInvalidName(fname)); setFnameFocused(false)}} onFocus={() => {setFnameFocused(true)}}
        onChangeText={(text)=>{ setFname(text); if(errorFname !== '')   setErrorFname(isInvalidName(text)) }} />
    </View>
    { errorFname && <View style={styles.errmsgCont}>
       <Text style={[styles.errmsg, {color: '#BC243C'}]}>{errorFname}</Text>
    </View> }
    <View style={[styles.inputBoxContainer, {borderColor: errorLname ? '#BC243C' : 'transparent'}]} >
    <ProfileIcon width={18} height={18} style={[styles.inputIcon, (lnameFocused||lname)&& textFocusedStyle]}></ProfileIcon>
     <TextInput placeholder="Last Name" value={lname} style={[styles.input, (lnameFocused||lname) && textFocusedStyle]} 
       onBlur={() => {setErrorLname(isInvalidName(lname)); setLnameFocused(false)}} onFocus={() => setLnameFocused(true)}
        onChangeText={(text)=>{ setLname(text); if(errorLname !== '')   setErrorLname(isInvalidName(text)) }} />
     </View>
     { errorLname && <View style={styles.errmsgCont}>
        <Text style={[styles.errmsg, {color: '#BC243C'}]}>{errorLname}</Text> 
     </View>}
     <View style={[styles.inputBoxContainer, {borderColor: errorEmail ? '#BC243C' : 'transparent'}]} >
     <EmailIcon width={18} height={18} style={[styles.inputIcon, (emailFocused||email) && textFocusedStyle]}></EmailIcon>
     <TextInput placeholder="Organizational Email" value={email} style={[styles.input, (emailFocused||email) && textFocusedStyle]} 
        onBlur={() => {setErrorEmail(isInvalidEmail(email)); setEmailFocused(false)}} onFocus={() => setEmailFocused(true)}
        onChangeText={(text)=>{ setEmail(text); if(errorEmail !== '')   setErrorEmail(isInvalidEmail(text)) }} />
     </View>
     { errorEmail && <View style={styles.errmsgCont}>
        <Text style={[styles.errmsg, {color: '#BC243C'}]}>{errorEmail}</Text>
     </View> }
     <View style={[styles.inputBoxContainer, {borderColor: errorPassword ? ((weakPassword && (passwordFocused && password))? '#EFC050': '#BC243C') : 'transparent'}]} >
     <PasswordIcon width={20} height={20}  style={[styles.inputIcon,  passwordFocused && textFocusedStyle]}/>
     {(!shownPassword)?
      <EyeIconOpen width={20} height={20}  style={[styles.inputIcon, styles.eyeIcon, passwordFocused && textFocusedStyle]} onPress={() => setShownPassword(!shownPassword)}/>
     :
       <EyeIconClosed width={20} height={20}  style={[styles.inputIcon, styles.eyeIcon, passwordFocused && textFocusedStyle]} onPress={() => setShownPassword(!shownPassword)}/>
     }
     <TextInput placeholder="Password" value={password} style={[styles.input, (passwordFocused||password) && textFocusedStyle]} 
        onBlur={() => {setErrorPassword(isInvalidPassword(password)); setPasswordFocused(false)}} onFocus={() => setPasswordFocused(true)}
        onChangeText={(text)=>{ setPassword(text); setErrorPassword(isWeakPassword(text)); setWeakPassword(isWeakPassword(text))}}
        secureTextEntry={!shownPassword} />
    </View>
    { errorPassword && <View style={styles.errmsgCont}>
       <Text style={[styles.errmsg, {color: (passwordFocused && password)?'#EFC050':'#BC243C'}]}>{errorPassword}</Text>
    </View> }
    </View>
    <View style={[styles.buttonContainer, {shadowColor: color}]}  >
    <Pressable style={({pressed})=>[styles.button, {backgroundColor: color}, pressed && transformedStyle]} 
   onPress={() => {handleSignUpWrapper(fname, lname, email, password, navigation.replace, 'Login', color)}}>
    <View><Text style={[styles.buttonText]}>SIGN UP ➔ </Text></View>
   </Pressable>
    </View>
    <View style={styles.footer}>
    <Text style={[styles.footerText]}> Already a member? <Text onPress={()=>navigation.replace('Login')} style={{color:color}}>Sign in</Text> </Text>
   </View>   
   </KeyboardAvoidingView>
  )
   }


export default RegisterScreen


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
         borderWidth: 2,
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
      errmsgCont: {
         marginLeft: '1%'
      },
      errmsg: {
         fontFamily: 'Bold',
         fontSize: 13,
   
      },
   buttonContainer: {
      width: '50%',
      marginLeft: '48%',
      width: '40%',
      marginTop: 15,
      borderRadius: 40,
      backgroundColor: 'transparent',
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
   }, 
   eyeIcon: {
      width: 30,
      height: 30,
      position: 'absolute',
      right: '6%',
      top: '35%',
      zIndex: 1,
      color: 'grey',
   }


});