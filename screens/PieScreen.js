import { useEffect } from 'react';
import { PieChart } from "react-native-gifted-charts";
import {View, StyleSheet, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { hexToHsv } from '../utils/taskSetup';

export default PieScreen = ({ currentDate, pieMode, dateText}) => {
  const actionObjects = useSelector(state => state.notes.actionObjects)
  const actionColors = actionObjects.map((action) => action.color);
  const values = actionObjects.map((action) => action.value);
  const actions = actionObjects.map((action) => action.name);
  const color = useSelector(state => state.colors.color)['hex']
  const modActionColors = actionColors.map((c) => {
  const [_h, s, l] = hexToHsv(c)
  const [new_h, _s, _l] = hexToHsv(color)
  return 'hsl(' + new_h + ', ' + s + '%, ' + l + '%)'
  }
  );
  
  const allTasks = useSelector(state => state.notes.allTasks)

  useEffect(() => {
      values.forEach((value, index) => {
        values[index] = 0.0; 
      })
      
  }, [allTasks])


  const asArray = Object.entries(allTasks);
  const filtered = asArray.filter(([key, value]) => ((key.substring(0, 8) === currentDate.substring(0, 8)) && parseInt(key.substring(8, 10)) <= parseInt(currentDate.substring(8, 10))));

  const sampleData = Object.fromEntries(filtered);
  
  // combine all arrays in sampleData into one array
  const allData = Object.values(sampleData).flat();

  
  for(let i=0; i<allData.length; i++) {
    actionIndex = actions.indexOf(allData[i].action.name);
    if(actionIndex != -1) values[actionIndex] += allData[i].duration;
    else values[actions.indexOf('Other')] += allData[i].duration;
  }

  let sum = values.reduce((partialSum, a) => partialSum + a, 0);
  sum = (sum)? sum : -1;
  const round = (num) => Math.round( (num * 100) * 10 + Number.EPSILON ) / 10
  
  
  const pieData = []
  for(let i=0; i<values.length; i++) {
    if(values[i] != 0.0 || (i==values.length-1)) {
      pieData.push({value: round(values[i]/sum), color: modActionColors[i], gradientCenterColor: modActionColors[i], label: actions[i]})
    }
  }

  const big = (sum != -1) ? pieData.reduce((a, b) => a.value > b.value ? a : b):0
 
const renderDot = color => {
  return (
    <View style={{height: 10,width: 10,borderRadius: 5,backgroundColor: color, marginLeft:5, marginRight: 10, }} />
  );
};  


  if(pieData.length % 2 != 0) {
    pieData.push({value: '', color: 'transparent', gradientCenterColor: 'transparent', label: ''})
  }

  const renderLegendComponent = () => {
    const RowComponent = ({label1, label2, percent1, percent2, color1, color2}) => {
      // check label1 is longer than 10 characters
      if(label1.length > 8) {
        label1 = label1.substring(0, 8) + '... '
      }
      if(label2 && label2.length > 8) {
        label2 = label2.substring(0, 8) + '... '
      }

      return (
        <View style={[styles.rowStyle, {marginBottom: 12, marginLeft: 3, borderWidth: 0}]}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 60,}}>
          {renderDot(color1)}
          <Text allowFontScaling={false} style={{color: 'black', fontFamily: 'SemiBold', width: 100, fontSize: 11}}>{label1}: {percent1}%</Text>
        </View>
        {label2 && <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot(color2)}
          <Text allowFontScaling={false} style={{color: 'black', fontFamily: 'SemiBold', width: 100, fontSize: 11}}>{label2}: {percent2}%</Text>
        </View>}
      </View>
      )
    }
  
    if(pieData.length % 2 != 0) {
      pieData.push({value: '', color: 'transparent', gradientCenterColor: 'transparent', label: ''})
    }
    const pieDataPairs = pieData.reduce(function (rows, key, index) {
      return (index % 2 == 0 ? rows.push([key])
        : rows[rows.length-1].push(key)) && rows;
    }, []);
    
    let pieRows = [];
    for (var i = 0; i < pieDataPairs.length; i++) {
        pieRows.push(<RowComponent key={i} label1={pieDataPairs[i][0].label} label2={pieDataPairs[i][1].label} 
          color1={pieDataPairs[i][0].color} 
          color2={pieDataPairs[i][1].color} percent1={pieDataPairs[i][0].value} percent2={pieDataPairs[i][1].value}/>);
    }

  return   (
  <View >
  <ScrollView  contentContainerStyle={{flexDirection: 'row', alignItems: 'center',  borderWidth: 0,  marginHorizontal: 25, flexWrap: 'wrap', height: 290}}>
    {pieRows}
  </ScrollView>
  </View>)

};



return (
  <View style={{ paddingVertical: 10, backgroundColor: color, flex: 1, marginTop: 10, marginBottom: -20,
    display: (pieMode)?'flex':'none', zIndex: 999}}>
     <View style={{  padding: 16, borderRadius: 25, backgroundColor: '#f2f3f4', height: '100%', width: '100%',}}>
      <Text allowFontScaling={false} style={{color: 'black', fontSize: 14, fontFamily: 'SemiBold', textAlign: 'center', color: color}}> <Text allowFontScaling={false} style={{color: "black"}}>Statistics of the Month as of </Text>{dateText}</Text>
      {(sum != -1 && pieData.length>1)?<>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          radius={90}
          innerRadius={60}
          font={'Regular'}
          innerCircleColor={'#f2f3f4'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text allowFontScaling={false} style={{fontSize: 21, color: 'black', fontFamily: 'Bold'}}> {big.value}%</Text>
                <Text allowFontScaling={false} style={{fontSize: 13, color: 'black', fontFamily: 'Regular'}}>{big.label}</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
      </>
      : <Text allowFontScaling={false} style={{textAlign: 'center', fontFamily: 'Regular', color: '#696969', paddingTop: 20}}> {"Looks like you haven't done much so far.\n \n Remember that you need to be logging times of labeled activities to use this feature."}</Text>}
    </View>
  </View>);
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});