import { View, Text, StyleSheet, Dimensions} from "react-native"
import {Picker}  from "@react-native-picker/picker"
import { useState } from "react"
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {
  Nunito_300Light,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddressInfoForm = (props)=>{
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    Nunito_300Light
  });

   const [town, setTown] =useState("Please Select A Town")
   const [state,setState] =useState("Please Select A State")
   const [stateSelected,setStateSelected] = useState(false)

   const handleTownChange =(item)=>{
    console.log(item)
    setTown(item)
    props.handleAddress(item)
   }
   const handleStateChange=(state)=>{
     setState(state)
     setStateSelected(true)
     props.handleState(state)
   }
   console.log(town)
    return(
      <View style={styles.infoHolder}>
        <Text  style={{fontFamily:'Nunito_300Light',color:"black"}}>We are working to expand but right now we are only washing in certain areas. Use the drop down to see if we can serve you</Text>
        {!stateSelected && <Picker style={styles.picker} selectedValue={state} onValueChange={handleStateChange}>
          <Picker.item label="Select State"/>
          <Picker.item label="Texas"value="Texas"/>
        </Picker>}
        {stateSelected &&<Picker style={styles.picker} selectedValue ={town} onValueChange={handleTownChange}>
          <Picker.item label="Select City"/>
          <Picker.item label="San Marcos"value="San Marcos"/>
        </Picker>}
      </View>
    )
}

const styles = StyleSheet.create({
  infoHolder:{
    backgroundColor:"white",
    marginVertical: windowHeight/30,
    borderRadius:5,
    paddingVertical:windowHeight/50,
    paddingHorizontal:windowWidth/30
  },
  text:{

  },
  picker:{
    marginHorizontal:windowWidth/40,
    marginVertical:windowHeight/40,
    borderRadius:9,
    opacity:.8
  }
})


export default AddressInfoForm