import React, { FC } from "react";
import { Text, View, StyleSheet, Pressable, } from "react-native";

export const ButtonComponent: FC<{
  onPress?: () => void;
  text?: string;
  type?: string;
  backColor?: string;
  fgColor?: string;
}> = ({ onPress, text, type = "primary", backColor, fgColor }) => {
  return (
    <Pressable onPress={onPress}
     style={[
      styles.container,
       styles[`container_${type}`],
       backColor ? {backgroundColor: backColor} : {}
       ]} >
      <Text style={[
        styles.text,
         styles[`text_${type}`],
         fgColor ? {color: fgColor} : {}
         ]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({

  container:{
    width: '100%',
    padding: 15,
    marginVertical: 12,
    alignItems:'center',
    borderRadius: 5
  },

  container_primary:{
    backgroundColor: '#3B71F3',
  },

  container_tertiary: {
  },

  text: {
    fontWeight: 'bold',
    color: 'white'
  },

  text_tertiary: {
    color: 'grey',
  }
});
