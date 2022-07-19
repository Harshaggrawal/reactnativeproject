import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../config";
const image = {
  uri: "https://img.freepik.com/free-photo/sunset-landscape_1417-1820.jpg?t=st=1657898826~exp=1657899426~hmac=67dd6d1cbece52495904c4bd6b37adcfa5ecc6652472c67928a46c8081d9c27a&w=1060",
};

export default function Chats() {
  const [message, setmessage] = useState("");
  const [submitError, setError] = useState("enter your message");
  const [curData, setcurData] = useState("");

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
      });
  }, []);

  const validation = () => {
    if (!message) {
      setError("message can't be empty");
    } else {
      const data = {
        senderprofile: curData[0].loggedinuserprofile,
        sender: curData[0].currentusername,
        id: Number(new Date()),
        message: message,
        Time: new Date().toLocaleTimeString(),
      };
      // --- updating Data to firebase-------
      database
        .ref("messages")
        .update({ [data.id]: data })
        .then(() => {
          setmessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    updatecomponent();
  };
  const [msgData, setmsg] = useState([]);

  useEffect(() => {
    updatecomponent();
  }, []);

  const updatecomponent = () => {
    database
      .ref("messages")
      .once("value")
      .then((item) => {
        let msg = [];
        item.forEach((chidSnapshot) => {
          msg.push(chidSnapshot.val());
        });
        setmsg(msg);
      })
      .catch((err) => console.log(err));
  };

  const allItems = ({ item }) => {
    return (
      <View style={styles.msgs}>
        <Image source={item.senderprofile} style={{ height: 50, width: 50 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>
            {item.sender}
          </Text>
          <Text style={{ marginHorizontal: 5 }}>{item.message}</Text>
        </View>
        <Text style={{ marginLeft: 15, fontWeight: "bold" }}>{item.Time}</Text>
      </View>
    );
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <FlatList data={msgData} renderItem={allItems}></FlatList>
      </ScrollView>
      <View style={styles.sendMsgContainer}>
        <TextInput
          style={styles.input}
          placeholder={submitError}
          onChangeText={(text) => setmessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={validation}>
          <Text>send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "1rem",
    backgroundColor: "skyblue",

    flexDirection: "column-reverse",
  },
  input: {
    padding: 5,
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
  sendMsgContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgrey",
  },

  iconContainer: {
    padding: 7,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
  },
  msgs: {
    flex: 1,
    flexDirection: "row",
  },
});
