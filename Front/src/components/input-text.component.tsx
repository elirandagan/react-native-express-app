import React, { Dispatch, FC, SetStateAction } from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View, Text } from "react-native";

export const InputComponent: FC<{
  setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  value?: string;
  minLength?: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}> = ({
  setValue,
  placeholder,
  value,
  minLength,
  maxLength,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={style.container}>
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        style={style.input, style[`input_${minLength}`]}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}

      />
    </View>
  );
};

const style = StyleSheet.create({
container:{
  backgroundColor: 'white',
  borderColor: '#61dafb6b',
  borderWidth: 1,
  borderRadius: 5,
  marginVertical: 10
},

  input: {
    borderColor: "#e8e8e8",
    borderWidth: 2,
    borderRadius: 5,
    height: 35
  },
  
  input_L:{
    minWidth: 300
  }
});
