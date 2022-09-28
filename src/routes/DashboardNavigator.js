import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard, Login, Registration } from "../screens";
const Stack = createNativeStackNavigator();

export default function DashboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DASHBOARD" component={Dashboard} />
    </Stack.Navigator>
  );
}
