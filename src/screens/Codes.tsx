import { styles } from "../styles/style";

import React, { useEffect, useState, useCallback } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import RegisteredContactList from "../components/RegisteredContactList";

export default function Codes() {
  const [addContactCardVisible, setAddContactCardVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <RegisteredContactList></RegisteredContactList>
      <Pressable
        style={[
          styles.button,
          styles.buttonClose,
          { position: "absolute", bottom: 50, right: 50 },
        ]}
        onPress={() => navigation.navigate("Contacts")}
      >
        <Text style={styles.textStyle}>Add a digicode</Text>
      </Pressable>
    </View>
  );
}
