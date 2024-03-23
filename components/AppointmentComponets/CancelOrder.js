import { StyleSheet,View,Text,Dimensions, Alert } from "react-native"
import Button from "../UI/Button"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CancelOrder = (props)=>{

  const handle = async()=>{
    console.log('here')
    response = await fetch("https://restapi-production-b64d.up.railway.app/refund",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({
        id: props.order[0].paymentID,
        order: props.order[0].OrderID,
        userId: props.order[0].userID,
        orderTime: props.order[0].orderTime,
        orderDate: props.order[0].orderDate,
        orderMonth: props.order[0].orderMonth,
        packageLevel: props.order[0].packageLevel,
        orderCity: props.order[0].orderCity,
        address: props.order[0].address,
        state: props.order[0].State,
        useWater: props.order[0].useCustomerWater,
        price: props.order[0].price,
        carType: props.order[0].carType
      })
    })
    Alert.alert("Order Refunded")
    props.handleRefund()
  }

  return (
    <View>
      <Text>You Already Have An Order Scheduled Click To Cancel</Text>
      <Button style={styles.button3} title="Cancel/Refund" onPress={handle}/>
    </View>
  )
}

const styles= StyleSheet.create({
  button3:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
  }
})


export default CancelOrder