import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import ContactList from "../components/ContactList";

export default function Codes() {
  return (
    <View style={styles.container}>
      <ContactList></ContactList>
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
