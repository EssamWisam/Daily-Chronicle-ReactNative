import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { handleReset }  from '../utils/authentication';
import { colors } from '../assets/colors/colors';
import EmailIcon from '../assets/email.svg'

const ResetScreen = () => {
   const [email, setEmail] = useState('')
   const [emailFocused, setEmailFocused] = useState(false)
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

  return (
   <KeyboardAvoidingView style={styles.container} >
   <View style={styles.heading}>
      <Text style={styles.welcome}>Forgot Password?</Text>
      <Text style={styles.instructions}>No worries. We've got you.</Text>
   </View>
   <View style={styles.inputsContainer}>
   <View style={[styles.inputBoxContainer]} >
     <EmailIcon width={18} height={18} style={[styles.inputIcon, emailFocused && textFocusedStyle]}></EmailIcon>
     <TextInput underlineColorAndroid='transparent' placeholder="Organizational Email" autoCorrect={false} value={email} 
     onChangeText={(text)=>setEmail(text)} onFocus={()=>setEmailFocused(true)} onBlur={()=>(email)?{}:setEmailFocused(false)} 
     style={[styles.input, emailFocused && textFocusedStyle]}/>
    </View>
   </View>
   <View style={[styles.buttonContainer, {shadowColor: color}]}>
   <Pressable style={({pressed})=>[styles.button, {backgroundColor: color}, pressed && transformedStyle]} 
   onPress={() => {handleReset(email, navigation.replace, 'Login', color)}}>
    <View><Text style={[styles.buttonText]}>RESET ➔  </Text></View>
   </Pressable>
   </View>
    </KeyboardAvoidingView>
  )
}

export default ResetScreen


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
      width: '40%',
      marginLeft: '44%',
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