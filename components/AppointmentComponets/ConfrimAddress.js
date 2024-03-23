import { Text, View, StyleSheet,Dimensions } from "react-native";
import {useState} from 'react'
import Button from "../UI/Button";
import Input from "../UI/Input";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfirmAddress = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });

  const [addressChange, setAddressChange] = useState(false)
  const [newCity,setNewCity]=useState('')
  const [newAddress,setNewAddress]=useState("")
  
  const handleUseAddress = ()=>{

    props.handleAddressViewChange(true)
  }
  const handleChange = ()=>{
    setAddressChange(!addressChange)
  }
  const handleAddressChange=(text)=>{
    setNewAddress(text)
  }
  const handleCityChange =(text)=>{
    setNewCity(text)
  }
  const handleSubmit =()=>{
    props.handleAddressChange(newAddress,newCity)
    setAddressChange(false)
  }
  if(!fontsLoaded){
    return null
  }else{
    return(
      <View>
        {!addressChange &&<View >
          <View style={styles.addressHolder}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Use Address On File:</Text>
            <Text style={{fontFamily: 'Nunito_700Bold', fontSize:windowHeight/40}}>{props.address.address}, {props.address.city}</Text>
          </View>
          <Button style={styles.button} title="Change Address" onPress={handleChange}/>
          <Button style={styles.button} title="Continue" onPress={handleUseAddress}/>
        </View>}
        {addressChange && <View>
          <View style={styles.infoHolder}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/50, alignSelf:'center'}}>We Working To expand, But Are only Washing in San Marcos Texas</Text>
            <Input placeholder="Address" onChangeText={handleAddressChange}/>
          </View>
          <Button style={styles.button} title="Submit" onPress={handleSubmit}/>
          <Button style={styles.cancelButton} title="Cancel" onPress={handleChange}/>
        </View>}
      </View>
     )
  }
}
const styles = StyleSheet.create({
  button:{
    height:40,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:2,
    borderWidth:1
  },
  cancelButton:{
    height:40,
    backgroundColor: "#ff9192",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:2,
    borderWidth:1
  },
  addressHolder:{
    backgroundColor:"white",
    margin: windowWidth/40,
    padding:windowHeight/30,
    borderRadius:5,
  },
  infoHolder:{
    backgroundColor:"white",
    marginVertical:windowHeight/30,
    paddingVertical:3,
    borderRadius:5,

  }
})

export default ConfirmAddress