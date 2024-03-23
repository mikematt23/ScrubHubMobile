import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from "../UI/Button";
import { useSelector, useDispatch } from "react-redux";
import {orderAction} from "../../Store/Order"
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfirmOrder = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  const dispatch = useDispatch()

  const  handleOrderSubmit = async (e)=>{
    dispatch(orderAction.setCarType(props.vehicleType))
    dispatch(orderAction.setTime(props.selectedTime))
    dispatch(orderAction.setDay(props.date.getDate()))
    dispatch(orderAction.setAddress(props.address.address))
    dispatch((orderAction.setCity(props.address.city)))
    props.nav.navigate('payment')
  }
  if(!fontsLoaded){
    return null
  }else{
    return(
      <View > 
        <View style={style.appointmentHolder} >
          <Text style={{fontFamily: 'Nunito_700Bold', fontSize:windowHeight/50}}>Your Appointment is {props.monthNames[props.date.getMonth()]},{props.date.getDate()} at {props.selectedTime}:00pm address: {props.address.address}, {props.address.city}</Text>
        </View>
        <Button style={style.button} title="Change Time" onPress={props.handleChangeTime}/>
        <Button style={style.button2} title="Continue to Wash Details" onPress={handleOrderSubmit}/>
      </View>
    ) 
  }
}

const style = StyleSheet.create({
  appointmentHolder:{
    backgroundColor:"white",
    margin: windowWidth/14,
    height: windowHeight/10,
    padding: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: "center",
  },
  button:{
    height:40,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1
  },
  button2:{
    height:40,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginTop: 15,
    borderWidth:1
  }
})
  


export default ConfirmOrder