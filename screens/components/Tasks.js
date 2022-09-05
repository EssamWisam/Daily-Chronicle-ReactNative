import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import {  ActionType, textDecorator } from '../../utils/taskSetup';
import { useSelector, useDispatch } from 'react-redux';
import { SetTips } from '../../redux/slices/notes';
import Lang from '../../assets/Lang.svg'
import Done from '../../assets/Done.svg'


export default Task = ({text, duration, index, id}) => {
   const color = useSelector(state => state.colors.color)['hex']
   const  TILMode  = useSelector(state => state.notes.TILMode)
   const notesGenre = useSelector(state => state.notes.notesGenre)
   const dispatch = useDispatch();
   const [tips, setTips] = [ useSelector(state => state.notes.tips), (payload) => dispatch(SetTips(payload))];

   const completeTask = (target) => {
        setTips(tips.filter((tip, i) => tip.id !== target));
    }
   
   return(
      <View style={[styles.item, {backgroundColor: color, paddingRight: (TILMode)? 5:15 }]}>
         <View style={styles.itemLeft} >
            {!TILMode && <ActionType index={index} />}
            {(TILMode && notesGenre == 'Language Spice') && <Lang style={ styles.itemStyle} width={22} color='white' height={22} />}
            {(TILMode && notesGenre == 'Todo') && <Done onPress={()=>completeTask(id)} style={ styles.itemStyle} width={25} color='white' height={25} />}
            {(TILMode && notesGenre == 'Self-Improvement') && <ActionType index={index} />}
            <Text style={[styles.itemText, {maxWidth: (TILMode)? (!(['Language Spice', 'Todo', 'Self-Improvement'].includes(notesGenre))?'100%':'85%'):'75%'}]}>{(duration)?textDecorator(text):text}</Text>
         </View>
         <Progress.Pie progress={duration} size={25} color='#f2f3f4' style={{display: (TILMode)? 'none': 'flex'}}  />
      </View>
   )
}

const styles = StyleSheet.create({

item: {
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ededed',
    marginTop: 0,
    marginRight: -11,

},
itemLeft: {
   flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginRight: 0,
}, 
circle: {
   width: 24,
    height:24,
    borderRadius: 50,
    backgroundColor: '#f2f3f4',
    opacity: 1.0,
   
},
itemText: {
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