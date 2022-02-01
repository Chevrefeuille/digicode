import { useState, useEffect } from "react";
import { styles } from "../styles/style";

import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addNoteToContact } from "../services/contacts.service";

import { useAppSelector } from "../store/hooks";
import { Contact } from "expo-contacts";

const AddContactCard = (props) => {
  const navigation = useNavigation();

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [info, setInfo] = useState("");

  const contact = useAppSelector((state) => state.contacts).find(
    (contact) => contact.id == props.route.params.contact_id
  );

  const addContact = () => {
    const contactToAdd = {
      ...contact,
      addresses: [{ city: city, street: street }],
      note: info,
    };
    addNoteToContact(contactToAdd);
  };

  return (
    <View style={styles.centeredView}>
      <View>
        <Text>{contact?.name}</Text>
        <TextInput value={city} onChangeText={setCity} placeholder="City" />
        <TextInput
          value={street}
          onChangeText={setStreet}
          placeholder="Street number"
        />
        <TextInput value={info} onChangeText={setInfo} placeholder="Info" />
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => addContact()}
      >
        <Text style={styles.textStyle}>Add digicode</Text>
      </Pressable>
    </View>
  );
};

export default AddContactCard;
