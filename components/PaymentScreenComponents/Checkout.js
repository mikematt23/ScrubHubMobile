import { View,Text ,StyleSheet, Dimensions, Alert} from "react-native"
import { useState,useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import {StripeProvider, useStripe, usePaymentSheet} from "@stripe/stripe-react-native"
import { UIAction } from "../../Store/UI";
import Button from "../UI/Button";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Checkout =(props)=>{
  const dispatch = useDispatch()
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });

  const {initPaymentSheet, presentPaymentSheet} = useStripe()
  const [key, setKey] = useState()
  const [paymentId,setPaymentId]= useState()
  const [loading,setLoading] = useState(true)
  const [realPrice,setRealPrice] = useState()

  const storedCustomer = useSelector((state)=> state.customer.customer)

  const level = useSelector((state)=>state.order.packageLevel.payload)
  const carType = useSelector((state)=> state.order.carType.payload)
  const useWater = useSelector((state)=>state.order.useWater.payload)
  const price = useSelector((state)=> state.order.price.payload)
  const day = useSelector((state)=> state.order.day.payload)
  const month = useSelector((state)=> state.order.month.payload)
  const time = useSelector((state)=> state.order.time.payload)
  const user = useSelector((state)=>state.user.user.payload.UserId)
  const address = useSelector((state)=>state.order.address.payload)
  const city = useSelector((state)=>state.order.city.payload)
  const state = useSelector((state)=> state.user.user.payload.State)

  let amount = price
  
  useEffect(()=>{
    if(useWater === 'false' || useWater === false){
      setRealPrice(price+10)
      amount = price+10
    }
    else{
      setRealPrice(price)
      amount = price
    }
    const getKey = async ()=>{
      const response =await fetch("https://restapi-production-b64d.up.railway.app/getPublishableKey",{
      headers:{
        'Content-type': 'application/json'
      },
      method: "POST",
      })
      const keyObject = await response.json()
      setKey(keyObject.publishableKey)
    }
    const initializePaymentSheet = async ()=>{
      
      const {clientSecret,ephemeralKey} = await fetchPaymentIntent()
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret:clientSecret,
        customerId:storedCustomer.payload.id,
        customerEphemeralKeySecret:ephemeralKey,
        merchantDisplayName:"ScrubHub LLC",
        returnURL :"stripe-example://stripe-redirect"
      })
    setLoading(false)
    }
    getKey()
    initializePaymentSheet()
  },[])
  
  const fetchPaymentIntent = async ()=>{
    console.log('here')
    const response = await fetch("https://restapi-production-b64d.up.railway.app/create-payment-intent",{
      headers:{
        "Content-Type": "application/json"
      },
      method:"POST",
      body: JSON.stringify({
        customer: storedCustomer.payload.id,
        amount:amount
      })
    })
    
    const {clientSecret,ephemeralKey,id} = await response.json()
    setPaymentId(id)
    return {clientSecret,ephemeralKey}
  }

  const handleBack = ()=>{
    props.nav.navigate('appointment')
  }

  const handlePay = async ()=>{
    const {error} = await presentPaymentSheet({
      confirmPayment:false
    })
    if(useWater === 'false' || useWater === false){
      amount = price+10
    }
    if(error){
      Alert.alert(error.message)
    }else{
    const response = await fetch("https://restapi-production-b64d.up.railway.app/addOrder",{
      headers:{
        "Content-Type":"application/json"
      },
      method: "POST",
      body: JSON.stringify({
        user: user,
        time: time,
        day:day,
        month:month+1,
        package: level,
        city: city,
        state: state  ,
        address: address,
        useWater:useWater,
        price:amount.toFixed(2),
        carType:carType,
        paymentID:paymentId
      })
    })
    const message = await response.json()
    dispatch(UIAction.reRender())
    Alert.alert("Order Confirmed")
    props.nav.navigate('currentOrder')
    }
    
  }
  return(
    <StripeProvider publishableKey={key} >
      <View style={styles.orderHolder}>
        <Text style={{fontFamily: 'Nunito_700Bold', fontSize:windowHeight/43}}>Your Order</Text>
          <View style={styles.details}>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Car Type: {carType} </Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Wash Level: {level}</Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Using Your Water: {useWater.toString( )}</Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Date: {month+1}/{day}</Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>time: {time}PM</Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Address: {address}, {city}</Text>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/55}}>Price: ${realPrice}.00</Text>
        </View>
        <Text style={{fontFamily: 'Nunito_700Bold', fontSize:windowHeight/43}}>Please Pay To Continue</Text>
      </View>
      <View>  
        {loading && <Text>Loading...</Text>}
        {!loading && <Button style = {styles.button3} title="Pay" onPress ={handlePay}/>}
        <Button style={styles.backButton} title="Back To Schedule" onPress={handleBack}/>  
      </View>
    </StripeProvider>
  )
}
const styles =StyleSheet.create({
  cardHolder:{
    height:windowHeight/5,
    borderRadius:4,
    marginHorizontal:windowWidth/25,
    display:'flex',
    flexDirection:"column"
  },
  orderHolder:{
    backgroundColor:"white",
    marginVertical:windowHeight/10,
    justifyContent:"center",
    alignItems:'center',
    borderRadius:4
  },
  details:{
    marginVertical: windowHeight/70
  },
  card:{
    backgroundColor: "#91ccec",
    display:'flex',
    flexDirection:"column"
  },
  button3:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#1692cd",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
  },
  backButton:{
    height:40,
    width: windowWidth/1.3,
    backgroundColor: "#ff9192",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginTop:windowHeight/60,
    borderWidth:1
  }
})

export default Checkout