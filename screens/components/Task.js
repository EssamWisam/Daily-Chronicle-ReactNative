import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/colors/colors';

export default Task = ({text}) => {
   const color = colors[0]
   return(
      <View style={[styles.item, {backgroundColor: color}]}>
         <View style={styles.itemLeft} >
            <TouchableOpacity style={styles.circle}></TouchableOpacity>
            <Text style={styles.itemText}>{text}</Text>
         </View>
         {/* <View style={styles.itemRight}></View> */}
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
    marginTop: 0
},
itemLeft: {
   flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
}, 
circle: {
   width: 24,
    height:24,
    backgroundColor: '#f2f3f4',//'#55BCF6',
    opacity: 0.9,
    borderRadius: 20,
    marginRight: 15
},
itemText: {
   maxWidth: '90%',
    fontFamily: 'Regular',
      fontSize: 15,
      color: '#f2f3f4',
},
itemRight: {
   width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5
},
});