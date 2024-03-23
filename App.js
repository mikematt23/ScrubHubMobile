import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './Store/Store';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AppointmentScreen from './Screens/Appointment';
import PaymentScreen from './Screens/PaymentScreen';
import CurrentOrders from './Screens/CurrentOrder';
import PassedOrderDetail from './Screens/PassedOrderDetails';
import registerNNPushToken from 'native-notify';
import { Text } from "react-native";

const Stack = createNativeStackNavigator()

export default function App() {
  <StatusBar style="auto" />
  registerNNPushToken(18683, 'mGHPdD96WcoudZDRbyZiM4');
  return (
   
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LogIn" component={LoginScreen}/>
          <Stack.Screen name='signUp' component={SignUpScreen}/>
          <Stack.Screen name='profile' component={ProfileScreen}/>
          <Stack.Screen name='appointment' component={AppointmentScreen}/>
          <Stack.Screen name="payment" component={PaymentScreen}/>
          <Stack.Screen name="currentOrder" component={CurrentOrders}/>
          <Stack.Screen name ="passedOrderDetail" component={PassedOrderDetail}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}