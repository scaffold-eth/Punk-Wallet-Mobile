import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Home from "./Home";
import Scanner from "./Scanner";
import WalletSecrets from "./WalletSecrets";

const { log } = require('./LogHelper');

import { ROUTE_NAME_HOME, ROUTE_NAME_WALLET_CONNECT, ROUTE_NAME_WALLET_SECRETS } from "./constants";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === ROUTE_NAME_HOME) {
              iconName = "wallet-outline";
            }
            else if (route.name === ROUTE_NAME_WALLET_CONNECT) {
              iconName = "camera-outline";
            }
            else if (route.name === ROUTE_NAME_WALLET_SECRETS) {
              iconName = "key-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name={ROUTE_NAME_HOME} component={Home} />
        <Tab.Screen name={ROUTE_NAME_WALLET_CONNECT}  component={Scanner} />
        <Tab.Screen name={ROUTE_NAME_WALLET_SECRETS}  component={WalletSecrets} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

