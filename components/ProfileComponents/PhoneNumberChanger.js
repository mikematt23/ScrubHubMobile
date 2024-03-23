import { View, StyleSheet, Dimensions, Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userAction } from "../../Store/User";
import Input from "../UI/Input"
import Button from "../UI/Button"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PhoneNumberChanger = (props)=>{
  const LogInUser = useSelector((state)=> state.user.user)
  const dispatch = useDispatch()
  const [input,setInput] = useState()

  const handleInputChange = (text)=>{
    setInput(text)
  }
  
  const handleInputSubmit = async ()=>{
    const regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const isPhoneNumber = input.match(regExp)
    console.log(isPhoneNumber)
    if(isPhoneNumber === null){
      return Alert.alert("please enter a Valid Phone Number")
    }
    if(input === undefined){
      return Alert.alert('Please Enter A Valid Phone Number')
    }
    const response = await fetch("https://restapi-production-b64d.up.railway.app/updateUserPhoneNumber",{
      headers:{
        'Content-type': 'application/json'
      },
      method:"PUT",
      body:JSON.stringify({user:LogInUser.payload.UserId,phoneNumber:input})
    })
    const message = await response.json()
    if(message.message){
      const response2 =await fetch('https://restapi-production-b64d.up.railway.app/getWashAppUser',{
        headers:{
          'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({user:LogInUser.payload.UserId})
      })
      const user = await response2.json()
      dispatch(userAction.setUser(user))
      props.viewChange()
    }
  }
  const handleCancel = ()=>{
    props.viewChange()
  }
  return(
    <View style={style.inputHolder}>
      <Input style={style.input} keyboardType='numeric' onChangeText={handleInputChange}/>
      <View style={style.buttonHolder}>
        <Button title="Submit" style={style.button} onPress={handleInputSubmit}/>
        <Button title="Cancel" style={style.cancelButton} onPress={handleCancel}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  button:{
    height:40,
    width: windowWidth/6,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:2,
    borderWidth:1
   },
   cancelButton:{
    height:40,
    width: windowWidth/6,
    backgroundColor: "#ff9192",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:2,
    borderWidth:1,
    marginLeft:windowWidth/20
   },
   inputHolder:{
    display: "flex",
    flexDirection:"column",
    width:windowWidth/1.9,
    alignItems:'center',
    margin: windowHeight/100
  },
  input:{
    margin: 3,
    borderRadius : 7,
    padding: 10,
    backgroundColor: "#91ccec",
    width: windowWidth/2
  },
  buttonHolder:{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-around'
  }
})

export default PhoneNumberChanger