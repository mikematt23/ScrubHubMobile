import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Card from "../components/UI/Card";
import Nav from "../components/UI/Nav";
import Button from "../components/UI/Button";
import AddressChanger from "../components/ProfileComponents/AddressChanger";
import PhoneNumberChanger from "../components/ProfileComponents/PhoneNumberChanger";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let bold 
let light
const ProfileScreen = (props)=>{

  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  light = 'Nunito_300Light'
  bold = 'Nunito_700Bold'
  const [addressInput,setAddressInput] = useState(false)
  const [phoneInput,setPhoneInput] = useState(false)
  const [wantsToDelete, setWantsToDelete] =useState(false)
  const [changeAddress,setChangeAddress] =useState(false)
  
  const LogInUser = useSelector((state)=> state.user.user)
  const handleWantsToDelete = ()=>{
    setWantsToDelete(!wantsToDelete)
  }
  const handleDelete = async()=>{
    const response = await fetch("https://restapi-production-b64d.up.railway.app/deleteData",{
    headers:{
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({user: LogInUser.payload.email,userName: LogInUser.payload.UserName})
  })
  const user = await response.json()
  props.navigation.navigate("LogIn")
  }
  const handleAddressViewChange =()=>{
    setChangeAddress(!changeAddress)
    setAddressInput(!addressInput)
  }
  const handleAddressUi = ()=>{
    setChangeAddress(!changeAddress)
  }
  const handlePhoneNumberChange =()=>{
    setPhoneInput(!phoneInput)
  }
  const CancelViewChange = ()=>{
    setPhoneInput(false)
    setAddressInput(false)
  }
  if(!fontsLoaded){
    return null
  }else{
    return (
      <View style={styles.holder}>
        <Card >
          <Text style={{fontFamily:'Nunito_700Bold',fontSize:windowHeight/34,marginLeft:windowWidth/15}}>Welcome Back {LogInUser.payload.UserName}</Text>
          {!wantsToDelete && <View style={styles.infoHolder}>
            {!changeAddress &&<Text style={{fontFamily:'Nunito_300Light',marginBottom:windowHeight/50}}>
              This Is the info We have On file If you Would like to Change It please Click the "Change" Button 
              and Complete the form
            </Text>}
            {!addressInput &&<View style={styles.buttonHolder}>
              <View></View>
              <Text style={{fontFamily:'Nunito_700Bold'}}>ADDRESS: {LogInUser.payload.address}, {LogInUser.payload.city}</Text> 
              <Button title="Change" style={styles.button} onPress = {handleAddressViewChange}/>
            </View>}
            {addressInput && <AddressChanger addressUi ={handleAddressUi} cancel ={CancelViewChange} viewChange={handleAddressViewChange}/>}
            {!phoneInput&& !changeAddress &&<View style={styles.buttonHolder}>
              <Text style={{fontFamily:'Nunito_700Bold'}}>PHONE NUMBER: {LogInUser.payload.phoneNumber}</Text>
              <Button title="Change" style={styles.button} onPress={handlePhoneNumberChange}/>
            </View>}
            {phoneInput && <PhoneNumberChanger cancel={CancelViewChange} viewChange={handlePhoneNumberChange}/>} 
          </View>}
          {!wantsToDelete &&<Button title='Delete Profile' style={styles.backButton} onPress={handleWantsToDelete}></Button>}
          {wantsToDelete && <View>
             <Text>Are You Sure You Want To Delete Profile</Text>
             <Button title="Yes, I want to delete Profile" style={styles.backButton} onPress={handleDelete}></Button>
             <Button title="No don't delete Profile" style={styles.dontDeleteButton} onPress={handleWantsToDelete}></Button>  
          </View>}
        </Card>
        <Nav  nav = {props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 holder:{

 },
 infoHolder:{
  backgroundColor:"white",
  height:windowHeight/2,
  width:windowWidth/1.5,
  borderRadius:5,
  marginLeft: windowWidth/25,
  marginTop:windowHeight/25,
  alignItems:"center",
  justifyContent:'center',
 },
 buttonHolder:{
   display: "flex",
   alignItems:'center',
   margin: windowHeight/100
 },
 button:{
  height:40,
  width: windowWidth/1.7,
  backgroundColor: "#1692cd",
  borderRadius:5,
  justifyContent:"center",
  alignItems:"center",
  borderWidth:1
 },
 text:{
  width:windowWidth/1.6,
  fontFamily:bold
 },
 backButton:{
  height:40,
  width: windowWidth/1.3,
  backgroundColor: "#ff9192",
  borderRadius:5,
  justifyContent:"center",
  alignItems:"center",
  marginTop:windowHeight/60,
  borderWidth:1
},
dontDeleteButton:{
  height:40,
  width: windowWidth/1.3,
  backgroundColor: "#1692cd",
  borderRadius:5,
  justifyContent:"center",
  alignItems:"center",
  marginTop:windowHeight/60,
  borderWidth:1
}
})

export default ProfileScreen