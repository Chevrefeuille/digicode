import { styles } from "../styles/style";

import { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { debounce } from "lodash";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchContacts } from "../store/features/contacts/contactsSlice";

const ContactItem = ({ contact }: { contact: Contacts.Contact }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("Not found");

  useEffect(() => {
    if (contact.addresses) {
      setAddress(contact.addresses[0].street);
    }
  }, [contact]);
  return (
    <View style={styles.item}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.title}>{contact.name}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Adress: {address}</Text>
            <Text>Notes: {contact.note}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function RegisteredContactList() {
  const [keyword, setKeyword] = useState("");

  const dispatch = useAppDispatch();

  const registeredContacts = useAppSelector(
    (state) => state.registeredContacts
  );

  const [displayedContacts, setDisplayedContacts] = useState<
    Contacts.Contact[]
  >([]);

  useEffect(() => {
    dispatch(fetchContacts());
    setDisplayedContacts(registeredContacts);
  }, [dispatch]);

  const renderContactItem = ({ item }: { item: Contacts.Contact }) => (
    <ContactItem contact={item}></ContactItem>
  );

  const searchContact = useCallback(
    debounce((keyword) => {
      if (keyword == "") {
      } else {
        const filteredContacts = registeredContacts.filter((contact) => {
          return contact.name.toLowerCase().includes(keyword.toLowerCase());
        });
        setDisplayedContacts(filteredContacts);
      }
    }, 100),
    [registeredContacts]
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
