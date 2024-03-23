import React,{useState, useEffect, forceUpdate} from "react";
import { StyleSheet, Text, View,  Dimensions, Alert } from 'react-native';
import { useSelector, useDispatch} from "react-redux";
import { orderAction } from "../Store/Order.js";
import Button from "../components/UI/Button.js";
import Card from "../components/UI/Card.js";
import Calender from "../components/AppointmentComponets/Calender.js";
import Times from "../components/AppointmentComponets/Times.js";
import VehicleSelect from "../components/AppointmentComponets/VehicleSelect.js";
import ConfirmAddress from "../components/AppointmentComponets/ConfrimAddress.js";
import CancelOrder from "../components/AppointmentComponets/CancelOrder.js";
import Nav from "../components/UI/Nav.js";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AppointmentScreen = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  const dispatch = useDispatch()
  const onFileAddress = useSelector((state)=> state.user.user.payload.address)
  const city = useSelector((state)=> state.user.user.payload.city)
  const user = useSelector((state)=> state.user.user.payload)
  const UI = useSelector((state)=> state.UI.update)
  
  
  const [showCalender, setShowCalender] = useState(false)
  const [selectedTime, setSelectedTime] = useState()
  const [showTime,setShowTime] = useState(false)
  const [date, setDate] = useState(new Date())
  const [vehicleType,setVehicleType] = useState('')
  const [selectedVehicle,setSelectVehicle] =useState(false)
  const [hasOrder,setHasOrder] = useState(false)
  const [order,setOrder] =useState()
  const [address,setAddress] = useState({
    address:onFileAddress,
    city:city
  })
  const [hasLoaded,setHasLoaded] = useState(false)
 
  useEffect(()=>{
    const fetchFunction = async()=>{
      const response = await fetch("https://restapi-production-b64d.up.railway.app/getUserOrder",{
        headers:{
          'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({user:user.UserId})
      })
     const userOrder = await response.json()
     if(userOrder.message === "No Orders"){
      setHasOrder(false)
      setHasLoaded(true)
      return
     }
     setHasOrder(true)
     setOrder(userOrder)
     setHasLoaded(true)
    }
    fetchFunction()
  
  },[UI])
 
  const [showAddress,setShowAddress] = useState(false)

  dispatch(orderAction.setDay(date.getDate()))
  
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const handleCalender = ()=>{
     setShowTime(false)
     setShowCalender(true) 
  }

  const handleCalenderSubmit = (bool,selectedDate)=>{
    setShowCalender(bool)
    setDate(selectedDate)
  }

  const handleTimeSubmit = (bool,time)=>{
    setShowTime(bool)
  }

  const handleChangeTime = ()=>{
    setShowTime(false)
  }

  const handleVehicleSelect = (bool,type)=>{
    setVehicleType(type)
    setSelectVehicle(bool)
  }
  const handleAddressChange = (address,city)=>{
    setAddress({
      address:address,
      city:city
    })
  }
  const handleAddressViewChange = (bool)=>{
    setShowAddress(true)
  }

  const handleRefund= ()=>{
    setHasOrder(false)
  }

if(!fontsLoaded){
 return null
}else{
  return (
    <View>
      <Card>
        {hasLoaded && hasOrder && <CancelOrder handleRefund = {handleRefund} order={order}/>}
        {  !hasOrder &&
        <View style={style.profileScreen}>
          <View style={style.dateChanger}>
            <View style={style.title}>
              <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/43}} >Schedule An Appointment </Text>
            </View>
            <View style={style.holder}>
              <View style={style.dateHolder}>
                  <Text style={style.date}>{monthNames[date.getMonth()]},{date.getDate()}</Text>
                </View>
              <Button titleStyle = {StyleSheet.titleStyle} title="Change Date" onPress={handleCalender} style={style.button2}/>
            </View>
          </View>
          {!showAddress && <ConfirmAddress 
            address={address}  
            handleAddressChange={handleAddressChange} 
            handleAddressViewChange={handleAddressViewChange}
          />}
          {!showTime && showAddress && <VehicleSelect 
            handleVehicleSelect ={handleVehicleSelect}
          />}     
          {showCalender  && <Calender 
            date={date} 
            handleCalenderSubmit = {handleCalenderSubmit}
          />}
          {!showTime&&selectedVehicle&&showAddress && <Times 
            nav={props.navigation} 
            date={date}  
            handleTimeSubmit= {handleTimeSubmit} 
            vehicleType = {vehicleType} 
            address ={address}
            selectedTime={selectedTime} 
            handleChangeTime={handleChangeTime} 
            monthNames={monthNames} 
            handleAddressViewChange = {handleAddressViewChange}
          />}
        </View>}
      </Card>
      <Nav nav = {props.navigation} />
    </View>
  )
} 
}

const style = StyleSheet.create({
    profileScreen:{
      marginTop: windowHeight/15
    },
    dateChanger:{
      marginBottom:windowHeight/15
    },
    dateHolder: {
      height:40,
      backgroundColor: "white",
      width: windowWidth/4,
      padding: windowWidth/80,
      borderRadius: 5,
      margin: windowWidth/45,
      alignItems:'center',
      justifyContent:'center'
    },
    date:{
      color:'blue',
      margin: windowWidth/100
    },
    button3:{
      height:40,
      width: windowWidth/1.3,
      backgroundColor: "#1692cd",
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
    },
    button2:{
      height:40,
      width: windowWidth/4,
      backgroundColor: "#1692cd",
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
      margin: windowWidth/45
    },
    title:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    },
    holder:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    }
})

export default AppointmentScreen