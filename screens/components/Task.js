import { useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors/colors';
import * as Progress from 'react-native-progress';
import {  ActionType, textDecorator } from '../../utils/taskSetup';
import { useSelector } from 'react-redux';
import Lang from '../../assets/Lang.svg'
import Done from '../../assets/Done.svg'
import Round from '../../assets/Round.svg'
import Circle from '../../assets/Circle.svg'



export default Task = ({text, duration, index}) => {
   const color = useSelector(state => state.colors.color)['hex']
   const  TILMode  = useSelector(state => state.notes.TILMode)
   const notesGenre = useSelector(state => state.notes.notesGenre)
   


   return(
      <View style={[styles.item, {backgroundColor: color}]}>
         <View style={styles.itemLeft} >
            {!TILMode && <ActionType index={index} />}
            {(TILMode && notesGenre == 'Language Spice') && <Lang style={ styles.itemStyle} width={25} color='white' height={25} />}
            {(TILMode && notesGenre == 'Todo') && <Done style={ styles.itemStyle} width={25} color='white' height={25} />}
            {(TILMode && notesGenre == 'Self-Improvement') && <ActionType index={index} />}

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
    //flexWrap: 'wrap',
    marginRight: 0,
   minWidth: '100%',
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
itemStyle: {
   width: 24,
   height: 24,
   color: '#f2f3f4',
   marginRight: 13,
   marginLeft: 13
},
});