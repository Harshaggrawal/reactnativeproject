import React from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as RootNavigator from "../routes/RootNavigation";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { database } from "../../config";

const image = {
  uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
};

export default function Login() {
  const [loginEmail, emailChange] = useState("");
  const [loginPassword, passwordChange] = useState("");
  const [error, seterror] = useState("Enter Required Information");
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

  const userNotExist = () => {
    let notfound = 0;
    let Username = "";
    let Id = "";
    let currentuserprofile = "";

    for (let i = 0; i < userData.length; i++) {
      if (
        userData[i].email == loginEmail &&
        userData[i].password == loginPassword
      ) {
        (Id = userData[i].id),
          (Username = userData[i].username),
          (currentuserprofile = userData[i].profile),
          (notfound = 1);
      }
    }
    if (notfound == 1) {
      {
        const data = {
          id: Id,
          currentusername: Username,
          email: loginEmail,
          loggedinuserprofile: currentuserprofile,
          password: loginPassword,
        };
        // --- updating Data to firebase-------
        database
          .ref("currentUser")
          .set({ data })
          .then(() => {
            navigate();
            console.log("Data is inserted...");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      seterror("user not exist");
    }
  };

  const navigate = () => RootNavigator.navigate("drawerpage");
  const validation = () => {
    if (!loginEmail) {
      seterror("please enter email id");
    } else if (!loginPassword) {
      seterror("please enter password");
    } else {
      userNotExist();
    }
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      blurRadius={3}
      style={styles.mainContainer}
    >
      <Text style={styles.mainHeading}>Login</Text>

      <View style={styles.fields}>
        <Text style={styles.error}>{error}</Text>
      </View>

      <View style={styles.fields}>
        <Text style={styles.subHeading}>Email id *</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your email-id"
          onChangeText={(text) => emailChange(text)}
          value={loginEmail}
        />
      </View>

      <View style={styles.fields}>
        <Text style={styles.subHeading}>password*</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your password"
          onChangeText={(text) => passwordChange(text)}
          value={loginPassword}
        />
      </View>

      <View style={styles.fields}>
        <Button style={styles.Button} title="Login" onPress={validation} />
      </View>
      <Text>
        Don't Have An Account?
        <TouchableOpacity onPress={() => RootNavigator.navigate("signup")}>
          <Text style={{ color: "blue" }}>Signup</Text>
        </TouchableOpacity>
      </Text>
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
    borderColor: "black",
    border: 2,
    borderWidth: 2,
  },
  fields: {
    alignItems: "flex-start",
  },
});
