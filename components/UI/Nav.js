import React,{useState} from "react";
import { View, StyleSheet, Dimensions, ImageBackground, Pressable,Text} from 'react-native';

import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Nav =(props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  const [profile,setProfile] =useState(style.falseStyle)
  const [schedule, setSchedule] =useState(style.falseStyle)
  const [currentWash,setCurrentWash] =useState(style.falseStyle)

 
  const profilePressHandle = (event)=>{
    if(!props.profile){
      props.nav.navigate('profile')
    } 
  }
  const schedulePressHandle = ()=>{
    if(!props.schedule){
      props.nav.navigate('appointment')
    } 
  }
  const currentWashPressHandle = ()=>{
    if(!props.currentWash){
      props.nav.navigate('currentOrder')
    }
  }
  if(!fontsLoaded){
    return null
  }else{
    return(
      <View style={style.navHolder}>
        <View  style={style.falseStyle}>
          <Pressable onPress={profilePressHandle}>
            <ImageBackground style={style.image} source={require('./navPics/user.png')}>
            </ImageBackground>
          </Pressable>
        </View>
        <View  style={style.falseStyle} >
          <Pressable onPress={schedulePressHandle}>
            <ImageBackground style={style.image} source={require('./navPics/calendar2.png')}>
            </ImageBackground>
          </Pressable>
        </View>
        <View style={style.falseStyle}>
          <Pressable onPress={currentWashPressHandle}>
            <ImageBackground style={style.image2} source={require('./navPics/shoppingCart.png')}>
            </ImageBackground>
          </Pressable>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
   navHolder:{

     height: windowHeight/2,
     width:windowWidth,
     display:'flex',
     flexDirection:'row',
   
   }, 
   falseStyle:{
     opacity:.7,
     backgroundColor:"#52b9e0",
     height: windowHeight/8,
     width:windowWidth/3,
     marginHorizontal:windowWidth/500,
     color:'white',
     alignItems:'center',
   },
   image:{
    height: windowHeight/20,
    width:windowWidth/9,
    borderRadius:9,
    resizeMode:"stretch",
    opacity:.9
   },
   text:{
    height: windowHeight/15,
    width:windowWidth/4,
    color:'white',
    marginLeft:windowWidth/10
   },
   profile:{
    height: windowHeight/15,
    width:windowWidth/4,
    color:'white',
    marginLeft:windowWidth/6.6
   },

  currentOrders:{
    height: windowHeight/15,
    width:windowWidth/4,
    color:'white',
    marginLeft:windowWidth/20
  },
  image2:{
    height: windowHeight/20,
    width:windowWidth/7,
    borderRadius:9,
    // resizeMode:"stretch",
    // opacity:.9
   },
   image3:{
    height: windowHeight/30,
    width:windowWidth/10,
    borderRadius:9,
    resizeMode:"stretch",
    opacity:.9
   },
})

export default Nav