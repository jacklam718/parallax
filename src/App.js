import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './constants';
import Row from './Row';
import data from './data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A212E',
    paddingTop: 225
  },
});

export default class App extends React.Component {
  scrollY = new Animated.Value(0);

  state = {
    height: 0,
  }

  onScroll = e => {
    // console.log(e.nativeEvent.contentOffset.y)
  }

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  };

  render() {
    return (
        <Animated.ScrollView
          style={styles.container}
          onLayout={this.onLayout}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
              listener: this.onScroll,
            }
          )}
          snapToInterval={ROW_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={1}
        >
          {data.map((item, index) => (
            <Row
              key={item.title}
              scrollY={this.scrollY}
              title={item.title}
              image={item.image}
              index={index}
            />
          ))}
          <View style={{ height: 800, backgroundColor: '#0A212E' }}/>
        </Animated.ScrollView>
    );
  }
}
