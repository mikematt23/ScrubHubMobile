import { View, StyleSheet, Dimensions, Alert, Text, ScrollView } from "react-native";
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import Input from "../UI/Input"
import Button from "../UI/Button"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserContact = (props)=>{
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email,setEmail] =useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address,setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const UserName = useSelector((state)=> state.signUp.UserName.payload)
  const password = useSelector((state)=> state.signUp.password.payload)
  
  const handleFirstName  = (text)=>{
    setFirstName(text)
  }
  const handleLastName = (text)=>{
    setLastName(text)
  }
  const handleEmailChange = (text)=>{
    setEmail(text)
  }
  const handlePhoneNumberChange = (text)=>{
    setPhoneNumber(text)
  }
  const handleAddressChange = (text)=>{
    setAddress(text)
  }
  const handleSubmit = async ()=>{
    setIsLoading(true)
    const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const isPhoneNumber = phoneNumber.match(regExp)
    if(isPhoneNumber === null){
      setIsLoading(false)
      return Alert.alert("please enter a Valid Phone Number")
    }
    if(email === '' || phoneNumber === "" || address ===''|| firstName === '' || lastName === ''){
      setIsLoading(false)
      return Alert.alert('You Must Complete the Form')
    }
     const response = await fetch("https://restapi-production-b64d.up.railway.app/emailCheck",{
       headers:{
        'Content-type':'application/json'
       },
       method:"POST",
       body: JSON.stringify({email:email})
     })
     const newMessage = await response.json()
     const response2 = await fetch("https://restapi-production-b64d.up.railway.app/phoneNumberCheck",{
      headers:{
        'Content-type':'application/json'
      },
      method:"POST",
      body: JSON.stringify({phoneNumber:phoneNumber})
     })
     const newMessage2 = await response2.json()
     
     if(newMessage.message === "Available" && newMessage2.message === "Available"){
      console.log('here')
       await fetch("https://restapi-production-b64d.up.railway.app/addWashAppUser",{
          headers:{
            'Content-type':'application/json'
          },
          method:"POST",
          body: JSON.stringify(
            {
              user:UserName,
              password:password,
              email:email,
              phoneNumber: phoneNumber,
              address:address,
              city: props.city,
              firstName:firstName, 
              lastName:lastName 
            }
          )
      })
      setIsLoading(false)
      props.nav.navigate('LogIn')
     }
     if(newMessage.message === "Taken"){
      setIsLoading(false)
      return Alert.alert("Email Taken")
     }
     if(newMessage2.message === "Taken"){
      setIsLoading(false)
      return Alert.alert("Phone Number in Use")
     }
  }

  return(
    <View style={styles.scrollView}>
    <ScrollView >
      <View style={styles.info}>
        <Input placeholder="First Name" onChangeText={handleFirstName}/>
        <Input placeholder="Last Name" onChangeText={handleLastName}/>
        <Input placeholder ="Email" onChangeText={handleEmailChange}/>
        <Input keyboardType='numeric' placeholder="Phone Number" onChangeText={handlePhoneNumberChange}/>
        <Input placeholder ="Address" onChangeText={handleAddressChange}/>
      </View>
      {!isLoading &&<Button style={styles.button3} title="Submit" onPress={handleSubmit}/>}
      {isLoading && <Text>Loading...</Text>}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView:{
    height:windowHeight 
  },
  button3:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1
  },
  info:{
    backgroundColor:"white",
    borderRadius:5,
    marginVertical:windowHeight/30
  },
})

export default UserContact