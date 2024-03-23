import { StyleSheet,View, Text, Dimensions } from "react-native"
import Card from "../components/UI/Card"
import Nav from "../components/UI/Nav";
import Button from "../components/UI/Button";
import {
  useFonts,
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PassedOrderDetail = (props)=>{
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_700Bold
  });

    return(
      <View>
        <Card>
          <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/43}}>Order Number:{props.route.params.item.ordreID}</Text>
          <View style={styles.orderHolder}>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}} >Address: {props.route.params.item.address}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>City: {props.route.params.item.orderCity}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>State: {props.route.params.item.State}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Date: {props.route.params.item.orderMonth}/{props.route.params.item.orderDate}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Package Level: {props.route.params.item.packageLevel}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Price: ${props.route.params.item.price}</Text>
            <Text style={{fontFamily: 'Nunito_300Light', fontSize:windowHeight/60}}>Status: {props.route.params.item.orderStatus}</Text>
          </View>
          <Button 
            style={styles.cancelButton}
            title="Back"
            onPress={()=>{
              props.navigation.navigate("currentOrder")
            }}
          />
        </Card>
        <Nav nav = {props.navigation}/>
      </View>
    )
}

const styles = StyleSheet.create({
   orderHolder:{
    backgroundColor:"white",
    height:windowHeight/6,
    borderRadius:4,
    paddingHorizontal:windowWidth/30
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
})


export default PassedOrderDetail