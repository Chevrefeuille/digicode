import React, { useEffect, useState, useCallback } from "react";
import { styles } from "../styles/style";

import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { SearchBar } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchContacts,
  setDisplayedContacts,
} from "../store/features/contacts/contactsSlice";

const ContactItem = ({ contact }: { contact: Contacts.Contact }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <Pressable
        onPress={() =>
          navigation.navigate("AddCode", { contact_id: contact.id })
        }
      >
        <Text style={styles.title}>{contact.name}</Text>
      </Pressable>
    </View>
  );
};

export default function ContactList() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useAppDispatch();

  const contacts = useAppSelector((state) => state.contacts);

  const [displayedContacts, setDisplayedContacts] = useState<
    Contacts.Contact[]
  >([]);

  useEffect(() => {
    dispatch(fetchContacts());
    setDisplayedContacts(contacts);
  }, [dispatch]);

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => (
    <ContactItem contact={item}></ContactItem>
  );

  const searchContact = useCallback(
    debounce((keyword) => {
      if (keyword == "") {
      } else {
        const filteredContacts = contacts.filter((contact) => {
          return contact.name.toLowerCase().includes(keyword.toLowerCase());
        });
        setDisplayedContacts(filteredContacts);
      }
    }, 100),
    [contacts]
  );

  const inputSearchContact = (keyword?: string) => {
    if (keyword === undefined) {
      return;
    }
    setKeyword(keyword);
    searchContact(keyword);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Find contact by name ..."
        platform="android"
        // inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
        // containerStyle={{ backgroundColor: "transparent" }}
        // lightTheme={true}
        // round={true}
        value={keyword}
        onChangeText={inputSearchContact}
      />

      <FlatList
        data={displayedContacts}
        renderItem={renderContactItem}
        keyExtractor={(contact: Contacts.Contact) => contact.id}
      />
    </View>
  );
}
