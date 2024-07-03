import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import NotesScreen from './components/notesScreen';
import React from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";
import {styles as GlobalStyles} from './utils/styles';
import { Header } from './components/Header';

export default function Index() {
  return (
    <LinearGradient style={styles.root} colors={GlobalStyles.appBackgroundColors}>
		<StatusBar style='auto' />
		<Header title='Todo App!' />
      <View style={styles.container}>
        <NotesScreen />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
		flex: 1,
		paddingRight: 12,
		paddingLeft: 12,
    paddingBottom: 12,
	},
  container: {
    flex: 4,
		padding: 10,
    backgroundColor: '#fff',
  },
});
