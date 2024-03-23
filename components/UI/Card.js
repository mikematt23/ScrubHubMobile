import React from "react";
import {Platform, View,ScrollView ,StyleSheet, Dimensions, KeyboardAvoidingView, ImageBackground} from 'react-native';
import Title from "./Title";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Card = (props)=>{

   return(
    <ScrollView>
      <View behavior="padding">
        <ImageBackground style={style.image} source={require('./navPics/bubbles-5024929.webp')}>
        <Title/>
        <View style={style.Card}>
          {props.children}
        </View>
        </ImageBackground>
      </View>
    </ScrollView>
   )
}

const style = StyleSheet.create({
 Card:{
  height:Platform.OS === 'ios' ? windowHeight/1.50: windowHeight/1.45,
  margin : windowWidth/10,
  backgroundColor: "#52b9e0",
  opacity:.8,
  padding: 10,
  borderRadius: 8
 },
 image: {
  resizeMode:"stretch",
}
})

export default Card