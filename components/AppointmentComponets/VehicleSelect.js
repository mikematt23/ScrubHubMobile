import { StyleSheet, Text, View,SectionList, FlatList,SafeAreaView, Pressable,Dimensions, ImageBackground } from 'react-native';
import { useState } from 'react';
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VehicleSelect = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });

  const [carClass,setCarClass] =useState(style.type)
  const [suvClass,setSuvClass] =useState(style.type)
  const [truckClass,setTruckClass] =useState(style.type)

  const handleCarPress =()=>{
    setCarClass(style.selectedType)
    setSuvClass(style.type)
    setTruckClass(style.type)
    props.handleVehicleSelect(true,"Car")
  }
  const handleSUVPress =()=>{
    setCarClass(style.type)
    setSuvClass(style.selectedType)
    setTruckClass(style.type)
    props.handleVehicleSelect(true,"SUV")
  }
  const handleTruckPress =()=>{
    setCarClass(style.type)
    setSuvClass(style.type)
    setTruckClass(style.selectedType)
    props.handleVehicleSelect(true,"Truck")
  }
  if(!fontsLoaded){
    return null
  }else{
    return(
      <View style={style.holder}>
        <Text style={{fontFamily:'Nunito_700Bold'}}>Please Select The Vehicle To Wash</Text>
        <SafeAreaView style={style.vehicleHolder}>
          <Pressable style={carClass} onPress={handleCarPress} >
          <ImageBackground style={style.image} source ={require('../UI/vehiclePics/car.png')} imageStyle={{ borderRadius: 6}}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Car</Text>
          </ImageBackground>
          </Pressable>
          <Pressable style={suvClass} onPress={handleSUVPress} >
          <ImageBackground style={style.image} source ={require('../UI/vehiclePics/suv.png')} imageStyle={{ borderRadius: 4}}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>SUV</Text>
          </ImageBackground>
          </Pressable>
          <Pressable style={truckClass} onPress={handleTruckPress} >
          <ImageBackground style={style.image} source ={require('../UI/vehiclePics/truck.png')} imageStyle={{ borderRadius: 4}}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Truck</Text>
          </ImageBackground>
          </Pressable>
        </SafeAreaView>
      </View>
     )
  }
}

const style = StyleSheet.create({
  vehicleHolder:{
    height:windowHeight/8,
    borderRadius:8,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  },
 holder:{
  alignItems:"center"
 },
  type:{
    backgroundColor: "white",
    opacity:.8,
    width:windowWidth/4.8,
    height: windowHeight/11,
    margin:windowHeight/150,
    borderRadius:5,
    borderWidth:2
  },
  selectedType:{
    backgroundColor: "#1692cd",
    opacity:.2,
    width:windowWidth/4.8,
    height: windowHeight/11,
    margin:windowHeight/150,
    borderRadius:5,
    borderWidth:2
  },
  text:{
    color:"white",
  },
  image: {
    height: windowHeight/11.5,
    borderRadius:9,
    resizeMode: 'cover',
  }
})

export default VehicleSelect