import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, StyleSheet, View, ScrollView, Dimensions, Alert } from 'react-native';
import Card from "../components/UI/Card.js";
import Input from "../components/UI/Input.js";
import { userAction } from "../Store/User.js";
import { customerAction } from "../Store/Customer.js";
import Button from "../components/UI/Button.js";
import { registerIndieID, unregisterIndieDevice } from 'native-notify';
import axios from 'axios';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = (props)=>{
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    Nunito_300Light,
    Nunito_700Bold
  });

  const dispatch = useDispatch()
  const loggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const LogInUser = useSelector((state)=> state.user.user)
  const [message,setMessage] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [userName, setUserName] =useState('')
  const [password, setPassword] =useState('')

  const onUserNameChange = (text)=>{
    setUserName(text)
  }

  const onPasswordChange = (text)=>{
    setPassword(text)
  }

  const  handleLogIn = async ()=>{
   setIsLoading(true)
   const response = await fetch("https://restapi-production-b64d.up.railway.app/WashAppLogIn",{
    headers:{
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({user:userName, password: password })
  })
   const user = await response.json()
   if(user.message === 'password not correct'){
    setIsLoading(false)
    return Alert.alert("UserName or Password Incorrect")
   }
   if(user.user === undefined){
    setIsLoading(false)
    return Alert.alert("UserName or Password Incorrect")
   }
   dispatch(userAction.setUser(user.user))
   dispatch(customerAction.setCustomer(user.customer.data[0]))
   registerIndieID(`"${user.user.UserId}"`, 18683, 'mGHPdD96WcoudZDRbyZiM4');
   setIsLoading(false)
   props.navigation.navigate("appointment")
  }

  const handleSignUp =()=>{
    props.navigation.navigate('signUp')
  }
  if(!fontsLoaded){
    return null
   }else{
    return(
      <ScrollView>
        <Card>
          <View style={styles.scrollView}>
            <Text style={{fontFamily:'Nunito_700Bold',color:"black",fontSize:windowHeight/40}}>Welcome Please Sign In </Text>
            <View  >
              <Text>{message}</Text>
            </View>
            <View style={styles.inputHolder}> 
              <Input placeholder = "User Name" secure ={false} onChangeText = {onUserNameChange} />
              <Input placeholder = "Password" secure = {true} onChangeText = {onPasswordChange}/>
            </View>
            {isLoading && <Text>Loading...</Text>}
            {!isLoading && <Button style={styles.button3} title= "Log in" onPress={handleLogIn}/>}
            {!isLoading &&<Button style={styles.button3} title ="Sign Up" onPress={handleSignUp}/>}
          </View>
        </Card>
        <View style={styles.fakeNav}></View>
      </ScrollView>

    )
   }

}

const styles =StyleSheet.create({
  scrollView:{
     marginTop:windowHeight/6,
     display:'flex',
     alignItems:"center"
  },
  button3:{
    height:40,
    width: windowWidth/1.4,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    margin:2,
    opacity:.9,
    borderWidth:1,
    boxShadow:""
  },
  inputHolder:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:windowHeight/70,
    paddingVertical:windowHeight/100
  },
  fakeNav:{
    opacity:.7,
    backgroundColor:"#52b9e0",
    height:windowHeight/10
  }
})


export default LoginScreen