import Codes from "./src/screens/Codes";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: { borderColor: "red", paddingBottom: 10, height: 60 },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Contacts" component={Codes} />
          <Tab.Screen name="Near me" component={Codes} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
