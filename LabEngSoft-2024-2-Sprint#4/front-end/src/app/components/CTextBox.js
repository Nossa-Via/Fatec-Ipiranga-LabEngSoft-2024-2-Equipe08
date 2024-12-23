import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useEffect, useRef } from "react";

export default function CTextBox(props) {
  const textInputRef = useRef(null);

  useEffect(() => {
    if (props.focusOnLoad && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [props.focusOnLoad]);

  return (
    <View style={{ width: "100%", margin: 8 }}>
      <TextInput
        ref={textInputRef}
        style={
          props.inputStyle
            ? props.error
              ? { ...styles.input, ...props.inputStyle, borderColor: "#ff0022" }
              : { ...styles.input, ...props.inputStyle }
            : props.error
            ? { ...styles.input, borderColor: "#ff0022" }
            : styles.input
        }
        placeholder={props.placeholder}
        value={props.state}
        multiline={true}
        placeholderTextColor="#555555"
        maxLength={props.maxLength}
        onChangeText={(text) => {
          if (props.setState) {
            props.setState(text);
          }
        }}
      ></TextInput>
      {props.error && props.errorMessage && (
        <Text style={{ color: "#ff0022" }}>{props.errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    padding: 10,
    textAlignVertical: "top",
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555555",
    width: "100%",
    fontSize: 18,
    outlineStyle: "none",
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
