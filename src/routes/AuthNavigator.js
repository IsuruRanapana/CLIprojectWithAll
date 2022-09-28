import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Registration } from "../screens";
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="REGISTRATION" component={Registration} />
    </Stack.Navigator>
  );
}
