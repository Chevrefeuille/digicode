import * as Contacts from "expo-contacts";

export async function getContacts(): Promise<Contacts.Contact[]> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.Emails,
        Contacts.Fields.Note,
        Contacts.Fields.Addresses,
      ],
    });
    if (data.length > 0) {
      data.sort((a, b) => {
        if (a.name >= b.name) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    return data;
  }
  return [];
}

export async function addNoteToContact(
  contact: Contacts.Contact
): Promise<String> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const data = await Contacts.updateContactAsync(contact);
    return data;
  }
  return "";
}
