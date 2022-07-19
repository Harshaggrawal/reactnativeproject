import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  Share,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../config";
import firebase from "firebase";

export default function Uploads({ navigation }) {
  const [filename, setfilename] = useState("");
  const [fileuri, setfileuri] = useState("");
  const [filemimetype, setfilemimetype] = useState("");
  const [docsData, setdocs] = useState([]);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "/",
    });

    if (!result.cancelled) {
      setfilename(result.name);
      setfileuri(result.uri);
      setfilemimetype(result.mimeType);
    }
  };

  const createdatabase = () => {
    {
      const data = {
        id: Number(new Date()),
        Filenames: filename,
        FileUris: fileuri,
        Filetypes: filemimetype,
      };
      // --- updating Data to firebase-------
      database
        .ref("UploadedDocuments")
        .update({ [data.id]: data })
        .then(() => {
          console.log("Data is inserted...");
          setfilename("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    updatecomponent();
  };

  // .........................

  useEffect(() => {
    updatecomponent();
  }, []);

  const updatecomponent = () => {
    database
      .ref("UploadedDocuments")
      .once("value")
      .then((item) => {
        let documents = [];
        item.forEach((chidSnapshot) => {
          documents.push(chidSnapshot.val());
        });
        setdocs(documents);
      })
      .catch((err) => console.log(err));
  };

  const deletedocs = (id) => {
    let docfound = 0;
    console.log(id);

    for (let i = 0; i < docsData.length; i++) {
      if (docsData[i].id == id) {
        docfound = 1;
      }
    }

    if (docfound == 1) {
      firebase
        .database()
        .ref("/UploadedDocuments/" + id)
        .remove();
      updatecomponent();
    }
    // console.log(id);
  };

  const editdocs = (id) => {
    let editabledocs = 0;
    console.log(id);
    for (let i = 0; i < docsData.length; i++) {
      if (docsData[i].id == id) {
        editabledocs = 1;
      }
    }
    if (editabledocs == 1) {
      //  RootNavigator.navigate("editpage",{id:id});
      navigation.navigate("editdocspage", { id: id });
    }
  };

  const shareDocument = async (id) => {
    try {
      const result = await Share.share({
        url: `${fileuri}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const alldocs = ({ item }) => {
    return (
      // <View style={styles.maincontainer}>
      <View style={styles.listtile}>
        <View style={{ width: "100%", flexWrap: "wrap" }}>
          <Text style={{ flexWrap: "wrap" }}>{item.Filenames}</Text>
        </View>
        <View style={styles.buttonview}>
          <Button title="Edit" onPress={() => editdocs(item.id)} />

          <Button title="Delete" onPress={() => deletedocs(item.id)} />
          <Button title="Share" onPress={() => shareDocument(item.id)} />
        </View>
      </View>
      //  </View>
    );
  };
  return (
    <>
      <Text>main heading</Text>
      <ScrollView style={{ backgroundColor: "skyblue" }}>
        <FlatList data={docsData} renderItem={alldocs}></FlatList>
      </ScrollView>
      <Button title="add docs" onPress={() => pickFile()} />

      {filename && <Text>{filename}</Text>}
      <Button title="upload" onPress={() => createdatabase()} />
    </>
  );
}

const styles = StyleSheet.create({
  listtile: {
    borderBottomWidth: 2,
    padding: 7,

    // marginVertical:10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
{
  /* <Button  title="add docs" onPress={()=>pickFile()} />
<Button  title="upload" onPress={()=>createdatabase()} /> */
}
