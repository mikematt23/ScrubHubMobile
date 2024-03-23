import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const Button = (props)=>{
  return (
    <Pressable style={props.style} onPress = {props.onPress} disabled={props.disabled}>
      <Text style={props.titleStyle}>{props.title}</Text>
    </Pressable>
  )
}

export default Button