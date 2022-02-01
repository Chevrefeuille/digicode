import Codes from "./src/screens/Codes";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { store } from "./src/store/store";
import ContactList from "./src/components/ContactList";
import AddContactCard from "./src/components/AddContactCard";

const CodesStack = createNativeStackNavigator();

function CodesStackScreen() {
  return (
    <CodesStack.Navigator>
      <CodesStack.Screen name="MyCodes" component={Codes} />
      <CodesStack.Screen name="Contacts" component={ContactList} />
      <CodesStack.Screen name="AddCode" component={AddContactCard} />
    </CodesStack.Navigator>
  );
}

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
            headerShown: false,
          })}
        >
          <Tab.Screen name="Codes" component={CodesStackScreen} />
          <Tab.Screen name="NearMe" component={Codes} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
