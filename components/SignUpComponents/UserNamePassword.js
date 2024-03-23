import { View,Text, StyleSheet, Dimensions, Alert } from "react-native"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { signUpAction } from "../../Store/SignUp";
import Button from "../UI/Button"
import Input from "../UI/Input"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserNamePassword = (props)=>{
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmedPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const handleUserNameChange =(text)=>{
    setUserName(text)
  }
  const handlePasswordChange = (text)=>{
    setPassword(text)
  }
  const handleConfirmPasswordChange =(text)=>{
    setConfirmedPassword(text)
  }
  const handleSubmit = async ()=>{
    setIsLoading(true)
    if(userName === ''|| password === ''|| confirmPassword === ""){
      setIsLoading(false)
      return Alert.alert("You Must Complete The Form")
    }
    if(password !== confirmPassword){
      setIsLoading(false)
      return Alert.alert("Password Does Not Match")
    }
    dispatch(signUpAction.setPassword(password))
    const response = await fetch("https://restapi-production-b64d.up.railway.app/userNameCheck",{
      headers:{
        'Content-type':'application/json'
      },
      method:"POST",
      body:JSON.stringify({userName:userName})
    })
   setIsLoading(false)
   const newMessage = await response.json()
   if(newMessage.message === "Available"){
     props.confirmed()
     return dispatch(signUpAction.setUserName(userName))
   }
   if(newMessage.message === "Taken"){
    Alert.alert("User Name Is Taken")
   }
  }

  return(
    <View >
      <View style={styles.info}>
        <Input placeholder="UserName" onChangeText={handleUserNameChange}/>
        <Input placeholder="Password" secure = {true} onChangeText={handlePasswordChange}/>
        <Input placeholder="Confirm Password" secure = {true} onChangeText={handleConfirmPasswordChange}/>
      </View>
      {!isLoading &&<Button style={styles.button3} title="Continue" onPress={handleSubmit}/>}
      {isLoading && <Text>Loading...</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  info:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:windowHeight/30
  },
  button3:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1
  }
})

export default UserNamePassword