import ContactList from "./src/screens/ContactList";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { borderColor: "red", paddingBottom: 10, height: 60 },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Contacts" component={ContactList} />
        <Tab.Screen name="Near me" component={ContactList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
