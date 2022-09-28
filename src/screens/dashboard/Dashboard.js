import Home from './home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Setting from './setting/Setting';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Dashboard({navigation}) {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HOME"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon name="home" size={25} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="SETTING"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({tintColor}) => (
            <Icon name="ios-settings" color={tintColor} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
