import { View,Text ,StyleSheet, Dimensions, Alert} from "react-native"
import { useState } from "react";
import Checkout from "../components/PaymentScreenComponents/Checkout";
import TransactionDetails from "../components/PaymentScreenComponents/TransactionDetails";
import Card from "../components/UI/Card";
import Nav from "../components/UI/Nav";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PaymentScreen =(props)=>{
  const [showPaymentScreen,setPaymentScreen]= useState(false)

  const handlePaymentChange = ()=>{
     setPaymentScreen(true)
  }
  return(
    <View>
       <Card>
        {!showPaymentScreen && <TransactionDetails showPayment ={handlePaymentChange}/>}
        {showPaymentScreen && <Checkout   nav={props.navigation}  />}
       </Card>
       <Nav nav ={props.navigation}/>
    </View>
  )
}
const styles =StyleSheet.create({

})

export default PaymentScreen