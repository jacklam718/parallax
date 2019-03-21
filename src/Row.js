import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './constants';

const styles = StyleSheet.create({
  container: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PREVIEW_HEIGHT,
    overflow: 'hidden',
    padding: 16,
    justifyContent: 'center',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: '#ffffff',
    alignSelf: 'center',
  },
});

export default class Row extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.any,
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  inputRange = [
    ROW_HEIGHT * (this.props.index-1),
    ROW_HEIGHT * this.props.index,
  ];

  render() {
    const { scrollY, image, title, index } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.preview,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: this.inputRange,
                    outputRange: [0, -PREVIEW_HEIGHT + ROW_HEIGHT],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.Image
            source={{ uri: image }}
            resizeMode="cover"
            style={[
              StyleSheet.absoluteFill,
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: this.inputRange,
                      outputRange: [-PREVIEW_HEIGHT / 16, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.previewOverlay,
              {
                opacity: scrollY.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [0.4, 0.1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          />

          <Animated.Text
            style={[
              styles.title,
              {
                fontSize: scrollY.interpolate({
                  inputRange: this.inputRange,
                  outputRange: [18, 30],
                  extrapolate: 'clamp',
                }),
              },
              {
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [
                        ROW_HEIGHT * (index-1),
                        ROW_HEIGHT * (index),
                      ],
                      outputRange: [-ROW_HEIGHT , 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            {title}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

