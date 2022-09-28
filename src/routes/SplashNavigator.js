import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash } from "../screens";
const Stack = createNativeStackNavigator();

export default function SplashNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SPLASH" component={Splash} />
    </Stack.Navigator>
  );
}
