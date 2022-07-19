import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { database } from "../../config";
// import firebase from "firebase";
import * as RootNavigator from "../routes/RootNavigation";

export default function Logout() {
  const [userData, setData] = useState([]);

  useEffect(() => {
    database
      .ref("currentUser")
      .once("value")
      .then((item) => {
        let user = [];
        item.forEach((chidSnapshot) => {
          user.push(chidSnapshot.val());
        });
        setData(user);
      });
  }, []);
  console.log(userData);
  const navigate = () => RootNavigator.navigate("login");

  const logoutuser = () => {
    database.ref("currentUser").remove();
    navigate();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ height: "50%", width: "50%" }}>
        <Text>Are you sure ? you want to delete</Text>
        <Button title="yes" onPress={() => logoutuser()} />
        <Button title="no" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
