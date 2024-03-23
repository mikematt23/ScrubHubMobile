import React from "react";
import { TextInput, StyleSheet, Dimensions} from 'react-native';
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Input = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  return <TextInput 
           style={props.style||[style.input,{fontFamily: 'Nunito_300Light'}]}
           autoCapitalize="none" 
           placeholder={props.placeholder} 
           secureTextEntry={props.secure} 
           onChangeText={props.onChangeText}
           keyboardType={props.keyboardType}
          />
}

const style = StyleSheet.create({
  input:{
    margin: 5,
    borderRadius : 7,
    padding: 10,
    backgroundColor: "#91ccec",
    width: windowWidth/1.4
  }
})


export default Input