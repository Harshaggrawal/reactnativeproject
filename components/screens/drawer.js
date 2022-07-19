import React, { useEffect, useState } from "react";
import * as RootNavigation from "../routes/RootNavigation";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { database } from "../../config";
// import firebase from "firebase";

const Drawerdesign = (props) => {
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
        console.log(curData);
        console.log(curData[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setdataloading(false));
  }, []);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate("userprofile")}
        >
          <ImageBackground
            source={{
              uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
            }}
            style={styles.imageBack}
          >
            {dataloading ? (
              <ActivityIndicator />
            ) : (
              <View>
                <Image
                  source={curData[0].loggedinuserprofile}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  {curData[0].currentusername}
                </Text>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  imageBack: {
    padding: 20,
  },
  textStyle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
});

export default Drawerdesign;
