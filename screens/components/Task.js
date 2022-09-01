import { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors/colors';
import * as Progress from 'react-native-progress';
import {  ActionType, textDecorator } from '../../utils/taskSetup';


export default Task = ({text, duration, index, TILMode}) => {
   const color = colors[0]

   return(
      <View style={[styles.item, {backgroundColor: color}]}>
         <View style={styles.itemLeft} >
            <ActionType index={index} />
            <Text style={styles.itemText}>{(duration)?textDecorator(text):text}</Text>
         </View>
         <Progress.Pie progress={duration} size={25} color='#f2f3f4' style={{display: (TILMode)? 'none': 'flex'}}  />
      </View>
   )
}

const styles = StyleSheet.create({

item: {
   //backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ededed',
    marginTop: 0,
    //minWidth: '100%',
    //maxWidth: '100%'
},
itemLeft: {
   flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 0
}, 
circle: {
   width: 24,
    height:24,
    borderRadius: 50,
    backgroundColor: '#f2f3f4',
    opacity: 1.0,
   
},
itemText: {
   maxWidth: '75%',
    fontFamily: 'Regular',
      fontSize: 15,
      color: '#f2f3f4',
},
itemRight: {
    width: 24,
    height: 24,
    color: '#f2f3f4',
    marginRight: 15,
    marginLeft: 10

},
});