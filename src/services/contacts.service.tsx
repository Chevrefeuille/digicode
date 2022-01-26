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
      // data.forEach(async (contact) => {
      //   if (contact.name == "Adrien Gregorj") {
      //     console.log(contact);
      //   }
      // });
    }
    return data;
  }
  return [];
}
