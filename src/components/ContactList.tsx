import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { debounce } from "lodash";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  fetchContacts,
  setDisplayedContacts,
} from "../store/features/contacts/contactsSlice";

const ContactItem = ({ contact }: { contact: Contacts.Contact }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{contact.name}</Text>
  </View>
);

export default function ContactList() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useAppDispatch();

  const displayedContacts = useAppSelector((state) => state.displayedContacts);
  const contacts = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
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
        dispatch(setDisplayedContacts(filteredContacts));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "gray",
    color: "#000",
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});
