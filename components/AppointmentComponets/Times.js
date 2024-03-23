import { StyleSheet, Text, View, FlatList,SafeAreaView, Dimensions } from 'react-native';
import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {orderAction} from "../../Store/Order"
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Times = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });
  const dispatch = useDispatch()
  const [times, setTimes] = useState([])
  const [hasTime,setHasTimes] = useState(true)
  const [message,setMessage] =useState('')
  const selectedDay = useSelector((state)=> state.order.day.payload)

  useEffect(()=>{
    const d = new Date()
    const hour = d.getHours()
    const minutes = d.getMinutes()
    const day = d.getDate()
    let availableTime = []
    const fetchFunction = async ()=>{
      const response = await fetch("https://restapi-production-b64d.up.railway.app/getTimes",{
        headers:{
          'Content-Type': 'application/json'
        },
        method :'POST',
        body: JSON.stringify({day: props.date.getDate(),city:props.address.city})
      })
      const takenTimes = await response.json()
      if(takenTimes.message){ 
        let Times =["12:00","1:30","3:00","4:30","6:00"]
        Times.forEach((time)=>{
          let StringNumber = time.substr(0,2)
          let number
          let stringMinute = time.substr(2,5)
          if(StringNumber === '12'){
            StringNumber = StringNumber.substr(0,2)
            number = Number(StringNumber)
            console.log(number,'here')
          }else{
            StringNumber = StringNumber.substr(0,1)
            number = Number(StringNumber) +12
          }
          if(number >= hour && day === selectedDay){
            if(stringMinute == '30'  && number === hour){
              if(stringMinute - minutes >=10){
                let realTime = (number - 12).toString()
                availableTime.push(`${realTime}:30`)
              }
            }else if(stringMinute == '30'  && number != hour){
              let realTime = (number - 12).toString()
              availableTime.push(`${realTime}:30`)
            }else if(minutes != '00' && number === hour){
              return
            }else if(stringMinute == '00' && hour-number === 1){
              if(minutes < 50){
                let realTime = number.toString()
                availableTime.push(`${realTime}:00`)
              }
            }else if(number > hour) {
              let realTime = (number - 12).toString()
              availableTime.push(`${realTime}:00`)
           }
          }else if(selectedDay != day){
            setHasTimes(true)
            availableTime = ["12:00","1:30","3:00","4:30","6:00"]
          }else if(hour >= 18 && day === selectedDay){
            setHasTimes(false)
            availableTime =[]
          }
        })
        setTimes(availableTime)
        return
      }
    }
    fetchFunction()
  },[props.date, props.vehicleType])

  const handleTimePress = (e)=>{
    props.handleTimeSubmit(true,e._dispatchInstances.memoizedProps.value)
    dispatch(orderAction.setCarType(props.vehicleType))
    dispatch(orderAction.setTime(e._dispatchInstances.memoizedProps.value))
    dispatch(orderAction.setDay(props.date.getDate()))
    dispatch(orderAction.setMonth(props.date.getMonth()))
    dispatch(orderAction.setAddress(props.address.address))
    dispatch((orderAction.setCity(props.address.city)))
    props.handleAddressViewChange(false)
    props.nav.navigate('payment')
  }
 if(!fontsLoaded){
  return null
 } else{
  return(
    <SafeAreaView style={style.holder}>
      <Text style={{fontFamily:'Nunito_700Bold'}}>Please Select The Time For Wash</Text>
         {!hasTime && <Text>No Available Times Please Change The Date</Text>}
        {hasTime && <FlatList
          data={times}
          renderItem={({item})=>{
            if(item !== undefined){
              return<View style={style.timeHolder} ><Text value={item} onPress={handleTimePress} >{`${item}`}</Text></View>
            }
          }} 
          numColumns={3}
        />}
    </SafeAreaView>
  )
 }
}

const style = StyleSheet.create({
  timeHolder:{
    backgroundColor: "white",
    borderWidth: 1,
    width: windowWidth/5,
    height: windowHeight/20,
    borderRadius: 6,
    margin: windowWidth/40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  holder:{
    alignItems:"center"
  }
})

export default Times