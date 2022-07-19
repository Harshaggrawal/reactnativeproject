import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";
import * as RootNavigator from "../routes/RootNavigation";
// import Manageusers from "./Manageusers";
import { database } from "../../config";
const image = {
  uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
};

export default function editusers({ route }) {
  const [newuserName, setnewusername] = useState("");
  const id = route.params.id;

  console.log(id);

  const [userData, setData] = useState([]);

  useEffect(() => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        let user = [];
        item.forEach((chidSnapshot) => {
          user.push(chidSnapshot.val());
        });
        setData(user);
      });
  }, []);
  const navigate = () => RootNavigator.navigate("manageusers");
  const update = () => {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == route.params.id) {
        database
          .ref(`users/${userData[i].id}`)
          .set({
            email: userData[i].email,
            id: userData[i].id,
            password: userData[i].password,
            profile: userData[i].profile,
            username: newuserName,
          })
          .then(() => {
            console.log("data edited");
            navigate();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      blurRadius={3}
      style={styles.mainContainer}
    >
      <Text style={styles.mainHeading}>Edit User Information</Text>
      <View style={styles.fields}>
        <Text style={styles.error}>Error view</Text>
      </View>
      <View style={styles.label}>
        <Text style={styles.subHeading}>New Username *</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your new username"
          onChangeText={(text) => setnewusername(text)}
          value={newuserName}
        />
      </View>
      <View style={styles.fields}>
        <Button style={styles.Button} title="Update" onPress={() => update()} />
        <Button style={styles.Button} title="cancel" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 30,
  },
  error: { fontSize: 15, fontWeight: "bold", marginBottom: 5 },
  fields: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  subHeading: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    width: "60vw",
    padding: 5,
    marginTop: 5,
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
    minHeight: 30,
  },
  Button: {
    margin: 5,
    borderColor: "black",
    border: 2,
    borderWidth: 2,
  },
  label: {
    alignItems: "flex-start",
  },
});
