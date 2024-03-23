import { Text, View, FlatList, StyleSheet, Dimensions, ScrollView, Alert} from "react-native";
import { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/UI/Card";
import Nav from "../components/UI/Nav";
import Button from "../components/UI/Button";
import { UIAction } from "../Store/UI";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CurrentOrders = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  const LogInUser = useSelector((state)=> state.user.user)
  const [order,setOrder] = useState()
  const [hasOrder,setHasOrder] = useState(false)
  const [passedOrders,setPassedOrders] = useState()
  const [hasOrderHistory,setHasOrderHistory] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchFunction = async()=>{
      const response = await fetch("https://restapi-production-b64d.up.railway.app/getUserOrder",{
        headers:{
          'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({user:LogInUser.payload.UserId})
      })
     const userOrder = await response.json()
     setOrder(userOrder[0])
     if(userOrder.message === "No Orders"){
      dispatch(UIAction.reRender())
      return
     }
     setHasOrder(true)
     setHasLoaded(true)
    }
    const fetchPassedOrders = async()=>{
      const response = await fetch("https://restapi-production-b64d.up.railway.app/getUserOrders",{
        headers:{
          'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({user:LogInUser.payload.UserId})
      })
      const passedOrders = await response.json()
      if(passedOrders.message === "No Orders"){
        return
      }
      setPassedOrders(passedOrders)
      setHasOrderHistory(true)
      setLoading(true)
    }
    fetchPassedOrders()
    fetchFunction()
    
  },[])
 
  const handleCancel = async ()=>{
    response = await fetch("https://restapi-production-b64d.up.railway.app/refund",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({
        id:order.paymentID,
        order:order.OrderID,
        userId:order.userID,
        orderTime:order.orderTime,
        orderDate:order.orderDate,
        orderMonth:order.orderMonth,
        packageLevel:order.packageLevel,
        orderCity:order.orderCity,
        address:order.address,
        state:order.State,
        useWater:order.useCustomerWater,
        price:order.price,
        carType:order.carType
      })
    })
    message = await response.json()
    if(message.message === "Order Refunded"){
      dispatch(UIAction.reRender())
      props.navigation.navigate('appointment')
      return Alert.alert("Order Has Been Refunded and Canceled")
    }else{
     return Alert.alert("Washer Has Already Arrived Can Not Refund At This Point")
    }
  }

  return(
  <View>
    <Card>
      <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/43}} >Current Order:</Text>
      <View style={styles.CUrrentOrderHolder}>
        {hasOrder && hasLoaded &&<Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Date {order.orderDate}/{Number(order.orderMonth)+1} Time: {order.orderTime} Price:${order.price} Status:{order.status}</Text>}
        {!hasOrder && <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>No Order Scheduled Now</Text>}
      </View>
      <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/43}} >Order History:</Text>
  
        {!loading && <Text>Loading...</Text>}
        {loading && hasOrderHistory &&<FlatList 
          contentContainerStyle={styles.flatList}
          data={passedOrders}
          renderItem={({item})=>{
            return <View style={styles.passOrder}>
                       <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/43}}> {item.orderStatus} {item.orderMonth}/{item.orderDate} </Text>
                       <Button 
                         style={styles.button3} 
                         title="More Details"
                         onPress={()=>{
                           props.navigation.navigate('passedOrderDetail',{item:item})
                         }}
                       />
                    </View>
          }}
        />}
        {!hasOrderHistory && <View style={styles.passedOrder}><Text>No Orders, Go to Schedule To Set An Appointment</Text></View>}
    
      {hasOrder && <Button style={styles.cancelButton} title="Cancel Order" onPress ={handleCancel}/>}
    </Card>
    <Nav  nav = {props.navigation}/>
  </View>)
}

const styles =  StyleSheet.create({
  CUrrentOrderHolder:{
    backgroundColor:"white",
    borderRadius:4,
    marginBottom: windowHeight/30
  },
  CurrentOrder:{
    border:1,
    marginVertical:10
  },
  passedOrders:{
    backgroundColor:"white",
    borderRadius:4,
    border:1,
    marginVertical:10,
  },
  flatList:{
     justifyContent:'center',
     alignItems:'center',
  },
  passOrder:{
     justifyContent:'center',
     alignItems:'center',
     borderWidth: 1,
     borderRadius:4,
     width:windowWidth/1.4,
     marginVertical:windowHeight/60,
     paddingVertical: windowHeight/40,
     backgroundColor:'white'
  },
  cancelButton:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#ff9192",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginTop:windowHeight/60,
    borderWidth:1
  },
  button3:{
    height:40,
    width: windowWidth/1.5,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
  }
})
export default CurrentOrders