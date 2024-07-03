import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles as GlobalStyles } from '../utils/styles';
interface HeaderProps {
	title: string
}
export const Header = (props:HeaderProps) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>{props.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flex:1,
		height: 5,
		textAlign: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontSize: GlobalStyles.headerFontSize,
		color: GlobalStyles.fontColor,
		fontWeight: '800'
	}
});