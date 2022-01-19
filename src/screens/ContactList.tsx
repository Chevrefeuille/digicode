import {
  SafeAreaView,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

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

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => (
    <ContactItem contact={item}></ContactItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(contact: Contacts.Contact) => contact.id}
      />
    </SafeAreaView>
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
