import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import RegisteredContactList from "../components/RegisteredContactList";

export default function Codes() {
  return (
    <View style={styles.container}>
      <RegisteredContactList></RegisteredContactList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
