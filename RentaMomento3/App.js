import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateCar } from "./components/CreateCar";
import { ForgotPassword } from "./components/ForgotPassword";
import { ListCars } from "./components/ListCars";
import { Register } from "./components/Register";
import { Rent } from "./components/Rent";
import { ReturnCar } from "./components/ReturnCar";
import { SigIn } from "./components/SignIn";
import { Delete } from "./components/Delete";
import { ListCarsRent } from "./components/ListCarsRent";
const stack=createStackNavigator()
export default function App() {
return(
<NavigationContainer>
<stack.Navigator initialRouteName="Rent" screenOptions={{headerShown:false}}>
<stack.Screen name="SignIn" component={SigIn}></stack.Screen>
<stack.Screen name="CreateCar" component={CreateCar}></stack.Screen>
<stack.Screen name="ForgotPassword" component={ForgotPassword}></stack.Screen>
<stack.Screen name="ListCars" component={ListCars}></stack.Screen>
<stack.Screen name="Register" component={Register}></stack.Screen>
<stack.Screen name="Rent" component={Rent}></stack.Screen>
<stack.Screen name="ReturnCar" component={ReturnCar}></stack.Screen>
<stack.Screen name="Delete" component={Delete}></stack.Screen>
<stack.Screen name="ListCarsRent" component={ListCarsRent}></stack.Screen>
</stack.Navigator>
</NavigationContainer>
)
}

