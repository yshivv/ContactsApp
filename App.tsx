import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Image, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionsAndroid } from 'react-native';

interface Contact {
  id: string;
  name: string;
  number: string;
  email: string;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Contacts');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={require('./src/images/contactapp.png')} style={styles.contactImage} />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Contacts App{"\n"}Go to Next Screen</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


const ContactListScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddContactModalVisible, setAddContactModalVisible] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({
    id: '',
    name: '',
    number: '',
    email: '',
  });
  const [editedContact, setEditedContact] = useState<Contact | null>(null);
  const [isEditContactModalVisible, setEditContactModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);




  useEffect(() => {
    fetchContacts();
  }, []);


  const fetchContacts = async () => {

    const sampleContacts: Contact[] = [
      { id: '1', name: 'Arjun', number: '7687678768', email: 'arjun@example.com' },
      { id: '2', name: 'John', number: '9876543210', email: 'john@example.com' },
      { id: '3', name: 'Alice', number: '4567890123', email: 'alice@example.com' },
      { id: '4', name: 'Michael', number: '8765432109', email: 'michael@example.com' },
      { id: '5', name: 'Emma', number: '2345678901', email: 'emma@example.com' },
      { id: '6', name: 'David', number: '9087654321', email: 'david@example.com' },
      { id: '7', name: 'Sophia', number: '5678901234', email: 'sophia@example.com' },
      { id: '8', name: 'Jacob', number: '1098765432', email: 'jacob@example.com' },
      { id: '9', name: 'Olivia', number: '3210987654', email: 'olivia@example.com' },
      { id: '10', name: 'Daniel', number: '7654321098', email: 'daniel@example.com' },
      { id: '11', name: 'Emily', number: '8901234567', email: 'emily@example.com' },
      { id: '12', name: 'Matthew', number: '5432109876', email: 'matthew@example.com' },
      { id: '13', name: 'Ava', number: '0123456789', email: 'ava@example.com' },
      { id: '14', name: 'William', number: '4321098765', email: 'william@example.com' },
      { id: '15', name: 'Mia', number: '6789012345', email: 'mia@example.com' },
      { id: '16', name: 'James', number: '9876543210', email: 'james@example.com' },
      { id: '17', name: 'Sofia', number: '3456789012', email: 'sofia@example.com' },
      { id: '18', name: 'Benjamin', number: '2109876543', email: 'benjamin@example.com' },
      { id: '19', name: 'Charlotte', number: '7890123456', email: 'charlotte@example.com' },
      { id: '20', name: 'Joseph', number: '4567890123', email: 'joseph@example.com' },
    ];

    const sortedContacts = sampleContacts.sort((a, b) => a.name.localeCompare(b.name));

    setContacts(sortedContacts);
  };

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        'android.permission.SEND_SMS',
      ]);

      if (
        granted['android.permission.CALL_PHONE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
      } else {
        console.log('Some permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleAddContact = () => {
    setNewContact({ id: '', name: '', number: '', email: '' });
    setAddContactModalVisible(true);
  };

  const handleSaveContact = () => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setNewContact({ id: '', name: '', number: '', email: '' });
    setAddContactModalVisible(false);
  };

  const handleClosePopupModal = () => {
    setNewContact({ id: '', name: '', number: '', email: '' });
    setAddContactModalVisible(false);
  };

  const handleContactPress = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleClosePopup = () => {
    setSelectedContact(null);
  };

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleMessage = (number: string) => {
    Linking.openURL(`sms:${number}`);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:');
  };
  const handleEditContact = (contact: Contact) => {
    setEditedContact(contact);
    setEditContactModalVisible(true);
  };

  const handleUpdateContact = () => {
    if (editedContact) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) => (contact.id === editedContact.id ? editedContact : contact))
      );
      setEditedContact(null);
      setEditContactModalVisible(false);
    }
  };
  const saveContact = () => {
    if (newContact.name && newContact.number && newContact.email) {
      const updatedContacts = [...contacts];
      if (editedContact) {
        const index = updatedContacts.findIndex((contact) => contact.id === editedContact.id);
        if (index !== -1) {
          updatedContacts[index] = { ...newContact, id: editedContact.id };
        }
      } else {
        const id = String(contacts.length + 1);
        updatedContacts.push({ ...newContact, id });
      }
      setContacts(updatedContacts);
      setAddContactModalVisible(false);
      setEditContactModalVisible(false);
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    setContactToDelete(contact);
  };
  const handleCancelContact = () => {
    setSelectedContact(null);
  };

  const handleCancelEditContact = () => {
    setEditedContact(null);
    setEditContactModalVisible(false);
  };


  const handleCancelDeleteContact = () => {
    setContactToDelete(null);
  };

  const confirmDeleteContact = () => {
    if (contactToDelete) {
      const updatedContacts = contacts.filter((contact) => contact.id !== contactToDelete.id);
      setContacts(updatedContacts);
      setContactToDelete(null);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity style={styles.contactContainer} onPress={() => handleContactPress(item)}>
        <View style={styles.contactInfoContainer}>
          <Image source={require('./src/images/user.png')} style={styles.profileImage} />
          <View >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactNumber}>{item.number}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleCall(item.number)}>
            <Image source={require('./src/images/phone.png')} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleMessage(item.number)}>
            <Image source={require('./src/images/chat.png')} style={styles.iconImage} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEmail}>
            <Image source={require('./src/images/mail.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>

      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container} >


      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts"
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
      />


      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Image source={require('./src/images/addcontact.png')} style={styles.addcontactimage} />
        </TouchableOpacity>
      </View>

      <Modal visible={selectedContact !== null} animationType="slide">
        <View style={styles.popupContainer}>
          {selectedContact && (
            <View style={styles.contactPopup}>
              <Text style={styles.contactName}>{selectedContact.name}</Text>
              <Text style={styles.contactNumber}>{selectedContact.number}</Text>

              <TouchableOpacity style={styles.button} onPress={() => handleCall(selectedContact?.number)}>
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleMessage(selectedContact?.number)}>
                <Text style={styles.buttonText}>SMS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => handleEditContact(selectedContact)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDeleteContact(selectedContact)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleClosePopup}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

          )}
        </View>
      </Modal>

      <Modal
        visible={isAddContactModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="black"
              value={newContact.name}
              onChangeText={(text) => setNewContact({ ...newContact, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="black"
              value={newContact.number}
              onChangeText={(text) => setNewContact({ ...newContact, number: text })}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleClosePopupModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveContact}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isEditContactModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="black"
              value={editedContact?.name}
              onChangeText={(text) => setEditedContact({ ...editedContact, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="black"
              keyboardType="numeric"
              value={editedContact?.number}
              onChangeText={(text) => setEditedContact({ ...editedContact, number: text })}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateContact}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEditContact}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={contactToDelete !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Delete Contact</Text>
            <Text style={styles.deleteText}>
              Are you sure you want to delete the contact {contactToDelete?.name}?
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteContact}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelDeleteContact}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contacts" component={ContactListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactImage: {
    width: 100,
    height: 100,

    marginRight: 10,
    paddingRight: 10,

  },
  searchInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'azure',
    color: 'black',

  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'azure',
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    //marginRight: 10,
  },
  icon: {
    marginRight: 5,
    paddingLeft: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    paddingRight: 10,
  },

  iconImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  contactInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  contactNumber: {
    fontSize: 20,
    color: 'black',

  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
  },
  contactPopup: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  addButton: {
    //backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'auto',

  },

  addcontactimage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    paddingRight: 10,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',

  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: 'black',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '48%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default App;
