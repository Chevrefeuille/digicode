import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import * as Contacts from "expo-contacts";
import { debounce } from "lodash";

const ContactItem = ({ contact }: { contact: Contacts.Contact }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{contact.name}</Text>
  </View>
);

export default function ContactList() {
  const [displayedContacts, setDisplayedContacts] = useState<
    Contacts.Contact[]
  >([]);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data);
          setDisplayedContacts(data);
        }
      }
    })();
  }, []);

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => (
    <ContactItem contact={item}></ContactItem>
  );

  const searchContact = useCallback(
    debounce((keyword) => {
      if (keyword == "") {
        setDisplayedContacts(contacts);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
