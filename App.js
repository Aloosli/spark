import React, { useState, useEffect } from "react";

import { Image, Statusbar } from "react-native";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticatedUserProvider, {
  AuthenticatedUserContext,
} from "./Context/AuthenticationContext";
import HomeScreen from "./src/Screens/HomeScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import { useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import SearchScreen from "./src/Screens/SearchScreen";
const loadingGif = require("./assets/loading.gif");

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {!user && isLoading === true ? (
        <Image source={loadingGif} className="h-full w-full" />
      ) : !user && isLoading === false ? (
        <AuthStack />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Spark" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
