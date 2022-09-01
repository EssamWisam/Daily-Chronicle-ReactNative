import { PieChart } from "react-native-gifted-charts";
import {View, StyleSheet, Text } from "react-native";

export default PieScreen = () => {
  const pieData = [
  {value: 47, color: '#009FFF', gradientCenterColor: '#006DFF',},
  {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
  {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
  {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
];

const renderDot = color => {
  return (
    <View style={{height: 10,width: 10,borderRadius: 5,backgroundColor: color, marginRight: 10, }} />
  );
};

const renderLegendComponent = () => {
  return (
    <>

      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20,}}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Good: 40%</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Poor: 3%</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20,}}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Good: 40%</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Poor: 3%</Text>
        </View>
      </View>
      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120, marginRight: 20,}}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Good: 40%</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Poor: 3%</Text>
        </View>
      </View>
    </>
  );
};

return (
  <View style={{ paddingVertical: 100, backgroundColor: '#34448B', flex: 1, }}>
    <View style={{ margin: 20, padding: 16, borderRadius: 20, backgroundColor: '#232B5D',}}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}> Performance</Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}> 47%</Text>
                <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  </View>);
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});