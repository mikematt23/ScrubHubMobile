import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-date-picker'
import { useSelector, useDispatch } from "react-redux";
import { orderAction } from '../../Store/Order';
import { StyleSheet } from 'react-native';

const Calender = (props)=>{
  const dispatch = useDispatch()
  const calenderSubmit = (event,selectedDate)=>{
    dispatch(orderAction.setDay(selectedDate.getDate()))
    props.handleCalenderSubmit(false,selectedDate)
  }
  console.log(props.date)

  return(
    <DateTimePicker style={styles.datepicker} minimumDate={new Date()} maximumDate={new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0)}  mode="date" display='spinner' value = {props.date} onChange={calenderSubmit}/>
  )
}

const styles = StyleSheet.create({
  datepicker:{
    height:300,
    backgroundColor:"white",
    position:'absolute',
  
  }
})


export default Calender