import React from "react";
import { View, StyleSheet, Dimensions,  KeyboardAvoidingView,Text} from 'react-native';

import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Title = ()=>{

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
   if(!fontsLoaded){
     return null
   }
   else{
    return(
      <View style= {style.title}>
        <Text style={{fontFamily: 'Pacifico_400Regular',color:"white",marginTop:windowHeight/30,fontSize:windowHeight/25}}>ScrubHub</Text>
        <Text style={{fontFamily: 'Pacifico_400Regular',color:"white"}}>Your Ride Is Our Pride</Text>
      </View>
     )
   }
}
const style = StyleSheet.create({
  title:{
    opacity:1,
    backgroundColor:"#1692cd",
    paddingVertical:windowHeight/100,
   
    height:windowHeight/6,
    alignItems:"center"
  }
})
export default Title