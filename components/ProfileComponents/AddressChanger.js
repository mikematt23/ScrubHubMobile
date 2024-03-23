import { Text, View, StyleSheet, Dimensions } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userAction } from "../../Store/User";
import Input from "../UI/Input"
import Button from "../UI/Button"
import AddressInfoForm from "../SignUpComponents/AddressInfoForm";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddressChanger = (props)=>{
  const LogInUser = useSelector((state)=> state.user.user)
  const dispatch = useDispatch()
  const [input,setInput] = useState('')
  const [selected,setSelected]= useState(true)
  const [town,setTown] =useState('')
  const [state,setState] = useState('')
  const handleInputChange = (text)=>{
    setInput(text)
  }
  const handleAddress = (town)=>{
    setTown(town)
    setSelected(false)
  }
  const handleState =(state)=>{
    setState(state)
  }
  const handleInputSubmit = async ()=>{
     const response = await fetch("https://restapi-production-b64d.up.railway.app/updateUserAddress",{
      headers:{
        'Content-type':'application/json'
      },
      method:'PUT',
      body:JSON.stringify({user:LogInUser.payload.UserId,address:input}) 
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
      {!selected &&<View style={style.inputHolder}>
        <Text>Please Enter Your New Address</Text>
        <Input style={style.input} onChangeText={handleInputChange}/>
      </View>}
      {!selected && <View style={style.buttonHolder}>
        <Button title="Submit" style={style.button} onPress ={handleInputSubmit} />
        <Button title="Cancel"  style={style.cancelButton} onPress={handleCancel}/>
      </View>}
      {selected && <AddressInfoForm handleState={handleState} handleAddress={handleAddress}/>}
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

export default AddressChanger