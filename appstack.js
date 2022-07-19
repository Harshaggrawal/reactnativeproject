import "react-native-gesture-handler";
import React from "react";

// import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";


import Welcome from "./components/screens/welcome";

import Manageusers from "./components/screens/Manageusers";
import Chats from "./components/screens/chat";
import ManageDocs from "./components/screens/Managedocs";
import Logout from "./components/screens/logout";
import Drawerdesign from "./components/screens/drawer";

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="welcome"
      drawerContent={(props) => <Drawerdesign {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "black",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen name="welcome" component={Welcome} />
      <Drawer.Screen name="manageusers" component={Manageusers} />

      <Drawer.Screen name="chatpage" component={Chats} />

      <Drawer.Screen name="managedocs" component={ManageDocs} />

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
};
export default AppStack;
