import{useState} from "react";
import { StyleSheet, Text, View, TextInput, ViewComponent, Dimensions,ScrollView } from 'react-native';
import Card from "../components/UI/Card";
import AddressInfoForm from '../components/SignUpComponents/AddressInfoForm.js'
import UserNamePassword from "../components/SignUpComponents/UserNamePassword";
import UserContact from "../components/SignUpComponents/UserContact";
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUpScreen = (props)=>{

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    Nunito_300Light,
    Nunito_700Bold
  });

  const [UserNameConfirmed,setConfirmedUSerName] =useState(false)
  const [addressConfirmed, setAddressConfirmed] = useState(false)
  const [town,setTown] =useState()
  const [state,setState] = useState()
  const changeScreenView = ()=>{
    setConfirmedUSerName(!UserNameConfirmed)
  }
  const handleConfirmAddress = (town)=>{
    setAddressConfirmed(true)
    setTown(town)
  }
  const handleStateChange = (state)=>{
    setState(state)
  }
  if(!fontsLoaded){
    return null
  }else{
    return (
      <ScrollView>
        <Card >
          <View style={styles.signUpHolder}>
            <Text style={{fontFamily: 'Nunito_700Bold',fontSize:windowHeight/40}}>Please Complete the form</Text>
            {!addressConfirmed && <AddressInfoForm handleState={handleStateChange} handleAddress ={handleConfirmAddress}/>}
            {!UserNameConfirmed&& addressConfirmed && <UserNamePassword  confirmed = {changeScreenView}/>}
            {UserNameConfirmed && <UserContact nav={props.navigation} city={town}/>}
          </View>
        </Card>
        <View style={styles.fakeNav}></View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  signUpHolder:{
    marginTop:windowHeight/6,
    alignItems:"center",
    justifyContent:"center",
  },
  fakeNav:{
    opacity:.7,
    backgroundColor:"#52b9e0",
    height:windowHeight/10
  }
})

export default SignUpScreen