import React from "react";
// import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/screens/login";
import Signup from "./components/screens/SignUP";
// import Welcome from "./components/screens/welcome";
import AppStack from "./appstack";
import editusers from "./components/screens/edituser";
import editdocs from "./components/screens/editupload";
import userprofile from "./components/screens/profiledisplay";
const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

 
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="drawerpage"
        component={AppStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="editpage" component={editusers} />
      <Stack.Screen name="editdocspage" component={editdocs} />
      <Stack.Screen name="userprofile" component={userprofile} />
    </Stack.Navigator>
  );
};
export default AuthStack;
