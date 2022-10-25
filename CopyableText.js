import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import styled from 'styled-components/native';

import * as Clipboard from 'expo-clipboard';

export default function CopyableText({ text, title }) {
	return (
		<>	
			{title && <Text style={styles.center}>
				{title}
			</Text>}

			<TouchableOpacity onPress={() => Clipboard.setString(text)}>
				<View>
					<Text style={styles.text}>
						{text}
					</Text>
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
  text: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  center: {
  	textAlign: "center",
  	fontWeight: "bold"
  }
});