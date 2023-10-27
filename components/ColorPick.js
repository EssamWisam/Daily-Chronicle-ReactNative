import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker, { Swatches,  HueSlider, BrightnessSlider } from 'reanimated-color-picker';
import { useSelector, useDispatch } from 'react-redux';
import { SetColor } from '../redux/slices/colors';

export default function ColorPick() {
  const dispatch = useDispatch();
  // color state
  const [selectedColor, setSelectedColor] = [ useSelector(state => state.colors.color), (payload) => dispatch(SetColor(payload))];
  const onSelectColor = (color) => {
    setSelectedColor(color);
  };
  const customSwatches = [
    '#0072B5',
    '#005f73',
    '#232B5D',
    '#399806',
    '#000000',
  ];

  return (
    <>
          <ColorPicker value={selectedColor.hex} sliderThickness={25} thumbSize={30} 
          style={{ width: '75%', justifyContent: 'center' }} onComplete={(color) => onSelectColor(color)}>
            <View style={styles.hueOpacityPreviewContainer}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <HueSlider  style={[{ marginBottom: 20 }, styles.shadow]} thumbColor='#f2f3f4' thumbShape='pill' />
                <BrightnessSlider  style={[{ marginBottom: 20 }, styles.shadow]} thumbColor='#f2f3f4' thumbShape='pill' reverse={true} />
              </View>
            </View>
            <Swatches swatchStyle={styles.swatchStyle} colors={customSwatches} />
          </ColorPicker>
    </>
  );
}
const styles = StyleSheet.create({

  hueOpacityPreviewContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,

  },

  swatchStyle: {
    borderRadius: 20,
    height: 40,
    width: 40,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});