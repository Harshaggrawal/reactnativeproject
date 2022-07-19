import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function Header(props) {
  return (
    // ---------- Dynamic Header -----------
    <View style={styles.header}>
      <TouchableOpacity >
      <Text>open drawer</Text></TouchableOpacity>
      <Text style={styles.heading}>{props.screenName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 5,
  },
  heading: {
    fontSize: 30,
    color: "#4C76B0",
    fontWeight: '500',
  },
});
