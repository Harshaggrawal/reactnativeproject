import "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { navigationRef } from "./components/routes/RootNavigation";
import AuthStack from "./authstack";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
