import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { database } from "../../config";

const image = {
  uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
};

export default function userprofile() {
  const [curData, setcurData] = useState("");
  const [dataloading, setdataloading] = useState(true);

  useEffect(() => {
    database
      .ref("currentUser")
      .once("value")
      .then((item) => {
        let user = [];
        item.forEach((chidSnapshot) => {
          user.push(chidSnapshot.val());
        });
        setcurData(user);
      })
      .catch((err) => console.log(err))
      .finally(() => setdataloading(false));
  }, []);
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      blurRadius={3}
      style={styles.mainContainer}
    >
      <Text style={styles.mainHeading}>Personal Information</Text>
      {dataloading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.profilecard}>
          <Image
            source={curData[0].loggedinuserprofile}
            style={styles.imageStyle}
          />

          <Text style={styles.textStyle}>{curData[0].currentusername}</Text>
          <Text style={styles.textStyle}>{curData[0].email}</Text>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profilecard: {
    flex: 1,
    // backgroundColor:"black",
    alignItems: "center",
    width: "100%",
    height: "70vw",
  },
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
  imageStyle: {
    height: 200,
    width: 200,
    borderRadius: 40,
    marginBottom: 10,
  },
  textStyle: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
  },
});
