import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as RootNavigator from "../routes/RootNavigation";

const backimage = {
  uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
};

import * as ImagePicker from "expo-image-picker";

import { database } from "../../config";
export default function Signup() {
  const [registerEmail, emailChange] = useState("");
  const [registerPassword, passwordChange] = useState("");
  const [registerCpassword, CpasswordChange] = useState("");
  const [registerUsername, usernameChange] = useState("");
  const [error, seterror] = useState("Enter Required Information");
  const [userData, setData] = useState([]);
  const [selectedImage, setImage] = useState(null);

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

  const alreadyexist = () => {
    let found = 0;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].email == registerEmail) {
        found = 1;
      }
    }
    if (found == 1) {
      seterror("already exist");
    } else {
      {
        const data = {
          profile: selectedImage,
          id: Number(new Date()),
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        };
        // --- updating Data to firebase-------
        database
          .ref("users")
          .update({ [data.id]: data })
          .then(() => {
            navigate();
            console.log("Data is inserted...");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const navigate = () => RootNavigator.navigate("login");
  const validation = () => {
    if (!registerUsername) {
      seterror("please enter user name");
    } else if (!registerEmail) {
      seterror("please enter email-ID");
    } else if (!registerPassword) {
      seterror("please enter password");
    } else if (!registerCpassword) {
      seterror("please enter confirm password");
    } else if (registerCpassword != registerPassword) {
      seterror("password and confirm pasword didn't matched");
    } else if (!selectedImage) {
      seterror("please pick an image");
    } else {
      alreadyexist();
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      seterror("image uploaded");
    }
  };
  return (
    <ImageBackground
      source={backimage}
      resizeMode="cover"
      blurRadius={3}
      style={styles.mainContainer}
    >
      <View style={styles.fields}>
        <Text style={styles.mainHeading}>Login</Text>
      </View>
      <View>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.fields}>
        <Text style={styles.subHeading}>User Name *</Text>
        <TextInput
          placeholder="Enter Your Username"
          style={styles.input}
          onChangeText={(text) => usernameChange(text)}
          value={registerUsername}
        />
      </View>

      <View style={styles.fields}>
        <Text style={styles.subHeading}>Email-ID *</Text>
        <TextInput
          placeholder="Enter Your Email-ID"
          style={styles.input}
          onChangeText={(text) => emailChange(text)}
          value={registerEmail}
        />
      </View>

      <View style={styles.fields}>
        <Text style={styles.subHeading}>Password</Text>
        <TextInput
          placeholder="********"
          style={styles.input}
          onChangeText={(text) => passwordChange(text)}
          value={registerPassword}
        />
      </View>

      <View style={styles.fields}>
        <Text style={styles.subHeading}>confirm Password</Text>
        <TextInput
          placeholder="*******"
          style={styles.input}
          onChangeText={(text) => CpasswordChange(text)}
          value={registerCpassword}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button title="pick-image" onPress={pickImage} />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </View>

      <View>
        <Button title="Sign-up" onPress={validation} />
      </View>
      <Text style={{ marginTop: 5 }}>
        Already Have An Account?
        <TouchableOpacity onPress={navigate}>
          <Text style={{ color: "blue" }}>Login Here</Text>
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
    marginBottom: 30,
  },
  error: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    marginTop: 5,
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
    width: "60vw",
    minHeight: 30,
  },
  fields: {
    alignItems: "flex-start",
  },
});
