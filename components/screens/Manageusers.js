import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  TextInput,
  // ActivityIndicator,
} from "react-native";
import { database } from "../../config";
import firebase from "firebase";
import * as RootNavigator from "../routes/RootNavigation";
export default function Manageusers({ navigation }) {
  const [userData, setData] = useState([]);

  useEffect(() => {
    updatecomponent();
  }, []);

  const updatecomponent = () => {
    database
      .ref("users")
      .once("value")
      .then((item) => {
        let user = [];
        item.forEach((chidSnapshot) => {
          user.push(chidSnapshot.val());
        });
        setData(user);
      })
      .catch((err) => console.log(err));
  };

  const deleteuser = (id) => {
    let userfound = 0;
    console.log(id);
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userfound = 1;
      }
    }

    if (userfound == 1) {
      firebase
        .database()
        .ref("/users/" + id)
        .remove();
      updatecomponent();
    }
  };

  const edituser = (id) => {
    let editableuser = 0;
    console.log(id);
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        editableuser = 1;
      }
    }
    if (editableuser == 1) {
      //  RootNavigator.navigate("editpage",{id:id});
      navigation.navigate("editpage", { id: id });
    }
  };

  const allItems = ({ item }) => {
    return (
      // <View style={styles.maincontainer}>
      <View style={styles.listtile}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Image source={item.profile} style={styles.userprofile} />

          <View style={styles.usertitle}>
            <Text>{item.username}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
        <View style={styles.buttonview}>
          <Button title="edit" onPress={() => edituser(item.id)} />
          <Button title="delete" onPress={() => deleteuser(item.id)} />
        </View>
      </View>
      //  </View>
    );
  };
  return (
    <ScrollView style={{ backgroundColor: "skyblue" }}>
      <FlatList data={userData} renderItem={allItems}></FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listtile: {
    // backgroundColor: "lightyellow",

    borderBottomWidth: 2,
    padding: 7,

    // marginVertical:10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userprofile: {
    // backgroundColor:'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    // marginHorizontal: 5,
  },
  usertitle: {
    width: "100%",
    // backgroundColor:'green',

    justifyContent: "center",
    marginLeft: 5,
  },
  buttonview: {
    // backgroundColor:'red',
    height: "50%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  // ......................
});
