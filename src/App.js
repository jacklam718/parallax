import React from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './constants';
import Row from './Row';
import data from './data';

const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A212E',
    paddingTop: 230,
  },
  background: {
    height: deviceHeight - (PREVIEW_HEIGHT / 3),
    backgroundColor: '#0A212E',
  }
});

export default class App extends React.Component {
  scrollRef = React.createRef();
  scrollY = new Animated.Value(0);
  state = {
    height: 0,
  }

  onLayout = e => {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  };

  scrollTo = (index) => {
    this.scrollRef.current._component.scrollTo({
      y: ROW_HEIGHT * index,
      animated: true,
    });
  }

  render() {
    return (
      <Animated.ScrollView
        ref={this.scrollRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets
        bounces={false}
        snapToInterval={ROW_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={1}
        onLayout={this.onLayout}
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
          }
        )}
      >
        {data.map((item, index) => (
          <Row
            key={item.title}
            scrollY={this.scrollY}
            title={item.title}
            image={item.image}
            index={index}
            onPress={() => {
              this.scrollTo(index);
            }}
          />
        ))}
        <View style={styles.background}/>
      </Animated.ScrollView>
    );
  }
}
