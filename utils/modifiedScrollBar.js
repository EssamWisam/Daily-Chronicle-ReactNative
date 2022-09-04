import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, View, Animated} from 'react-native';
import PropTypes from 'prop-types';

export default function ColoredScrollBar({
  indicatorColor = '#CFD8DC',
  indicatorBackground = '#455A64',
  indicatorWidth = 6,
  persistent = false,
  style,
  children,
  hideCalendar,
  added,
  selectedDate,
  timeBeforeFadeAway
}) {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const [indicatorOpacity, setOpacity] = useState(new Animated.Value(0));
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  // scroll to end whenever added is true
  const scrollViewRef = useRef(null);
    useEffect(() => {
     
        scrollViewRef.current.scrollToEnd({animated: true});
      
    }, [added]);

    // scroll to top whenever selectedDate changes
    useEffect(() => {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }, [selectedDate]);

    // scroll to top whenever hideCalendar is true
    useEffect(() => {
      if (hideCalendar) {
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      }
    }, [hideCalendar]);

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  const fade = value => {
    Animated.timing(indicatorOpacity, {
      toValue: value,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const Indicator = () => (
    <Animated.View
      style={{
        opacity: persistent ? 1 : indicatorOpacity,
        height: '100%',
        width: indicatorWidth,
        backgroundColor: indicatorBackground,
        borderRadius: 8,
      }}>
      <Animated.View
        style={{
          width: indicatorWidth,
          borderRadius: 8,
          backgroundColor: indicatorColor,
          height: scrollIndicatorSize,
          transform: [{translateY: scrollIndicatorPosition}],
        }}
      />
    </Animated.View>
  );
  return (
    <>
      <View style={{flexDirection: 'row', ...style}}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{paddingRight: 14}}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(width, height) => {
            setCompleteScrollBarHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: {height},
            },
          }) => {
            setVisibleScrollBarHeight(height);
          }}
          onScroll={(Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
            {useNativeDriver: false},
          ))}
          onMomentumScrollEnd={() => setTimeout(()=>fade(0), timeBeforeFadeAway)}
          onScrollBeginDrag={() => fade(1)}
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
        <Indicator />
      </View>
    </>
  );
}

ColoredScrollBar.propTypes = {
  indicatorColor: PropTypes.string,
  indicatorBackground: PropTypes.string,
  innerWidth: PropTypes.number,
  style: PropTypes.object,
  persitent: PropTypes.bool,
  hideCalendar: PropTypes.bool,
  added: PropTypes.bool,
  selectedDate: PropTypes.string,
  timeBeforeFadeAway: PropTypes.number,
};
