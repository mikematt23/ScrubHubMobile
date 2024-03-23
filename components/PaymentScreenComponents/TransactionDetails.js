import {Platform, View, Text, StyleSheet, Dimensions, Alert } from "react-native"
import { useState,useEffect } from "react"
import {Picker} from '@react-native-picker/picker'
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from "../../Store/Order";
import Button from "../UI/Button";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TransactionDetails = (props)=>{

  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });

  const dispatch = useDispatch()
  const carType = useSelector((state)=> state.order.carType)

  const [level,setLevel] = useState()
  const [price, setPrice] = useState()
  const [useWater,setUseWater] = useState()
  const [message,setMessage] = useState('')
  const [message2,setMeassge2] = useState('')

  useEffect(()=>{
  
    if(level === "1"){
      setMessage("PackLevel1")
      if(carType.payload === "Car"){
        setPrice(45)
      }
      if(carType.payload === "Truck"){
        setPrice(50)
      }
      if(carType.payload === "SUV"){
        setPrice(55)
      }
      setMessage(`This is basic exterior Wash and Basic Wheel clean`)
    }
    if(level === "2"){
      if(carType.payload === "Car"){
        setPrice(50)
      }
      if(carType.payload === "Truck"){
        setPrice(55)
      }
      if(carType.payload === "SUV"){
        setPrice(60)
      }
      setMessage(`This includes Wash Level 1 plus an exterior wax`)
    }
    if(level === "3"){
      if(carType.payload === "Car"){
        setPrice(65)
      }
      if(carType.payload === "Truck"){
        setPrice(70)
      }
      if(carType.payload === "SUV"){
        setPrice(75)
      }
   
      setMessage(`This includes Wash Level 2 plus an interior Clean and Vacuum`)
    }
    if(level === "4"){
      if(carType.payload === "Car"){
        setPrice(40)
      }
      if(carType.payload === "Truck"){
        setPrice(50)
      }
      if(carType.payload === "SUV"){
        setPrice(60)
      }
   
      setMessage(`This includes an Interior Clean and Vacuum Only`)
    }
  },[level])

  const handlePicker = (itemValue,itemIndex)=>{
    setLevel(itemValue)
  }
  const handleWater = (itemValue,itemIndex)=>{
    if(itemValue === true || itemValue === 'true'){
      setMeassge2("You Must Have A Water Source For Us To Connect To")
    }else {
      setMeassge2('')
    }
    setUseWater(itemValue)
  }
  const handleNext = ()=>{
    console.log(useWater, level)
    if(level === '0'|| useWater === undefined){
      return Alert.alert("You Must Complete The Form")
    }
    dispatch(orderAction.setPrice(price))
    dispatch(orderAction.setPackageLevel(level))
    dispatch(orderAction.setUseWater(useWater))
    props.showPayment()
  }
  if(!fontsLoaded){
    return null
  } else{
    return(
      <View style={styles.holder}>
        <Text style={{fontFamily:'Nunito_700Bold'}}>Please Select The Wash Level You Would Like Click The level to find out more</Text>
        <View style={styles.infoHolder}>
          <Picker
            selectedValue={level}
            onValueChange={handlePicker}
            mode="dialog"
          >
            <Picker.Item label="" value = "0"/>
            <Picker.Item label="Wash Level 1" value="1"/>
            <Picker.Item label="Wash Level 2" value="2"/>
            <Picker.Item label="Wash Level 3" value="3"/>
          </Picker>
          <View >
            <Text style={{fontFamily:'Nunito_300Light',fontSize:windowHeight/55}}>{message}</Text>
          </View>
        </View>
        <Text style={{fontFamily:'Nunito_700Bold', marginTop:windowHeight/40}}>Do You Want Us to Bring Our Water (+$10)</Text>
        <View style={styles.infoHolder}> 
          <Picker
            selectedValue={useWater}
            onValueChange={handleWater}
          > 
            <Picker.Item label="" value='0'/>
            <Picker.item label="Bring Water(+$10.00)" value={false}/>
            <Picker.item label="Use My Water" value={true}/>
          </Picker>
          <Text style={{fontFamily:'Nunito_300Light',fontSize:windowHeight/55}}>{message2}</Text>
        </View>
        <Button style={styles.button} title="Next" onPress ={handleNext}/>
      </View>
     )
  }
}

const styles = StyleSheet.create({
  holder:{
    justifyContent:'center'
  },
  infoHolder:{
    height:windowHeight/8,
    backgroundColor:"white",
    borderRadius:5,
    marginBottom:windowHeight/15,
    marginTop:windowHeight/30,
    paddingVertical:windowHeight/50,
    justifyContent:"center",
  },
 button:{
    height:windowHeight/20,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    marginTop:windowHeight/50
  },
  message:{
   justifyContent:"center",
    alignItems:"center",
    backgroundColor:'white',
    borderRadius:5,
    marginBottom:windowHeight/50
  }
})

export default TransactionDetails