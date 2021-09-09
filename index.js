/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {
    StyleSheet,
    View,
  } from 'react-native';
// import the component
import RootNavigator from 'Kliq/Views/RootNavigator';
// to get rid of yellow warning screen at the bottom
console.disableYellowBox = true;

import React from 'react';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  });

  class Kliq extends React.Component {
      render() {
          return(
              <View style={styles.container}>
                  {/* RootNavigator- incharge of displaying the correct screen*/}
                  <RootNavigator ref="rootNavigator" />
              </View>
          )
      }
  }
AppRegistry.registerComponent('Kliq', () => Kliq);
