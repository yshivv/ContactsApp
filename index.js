/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

const contactsData = [
    { id: '1', name: 'Arjun', number: '7687678768', email: 'arjun@example.com' },
    { id: '2', name: 'John', number: '9876543210', email: 'john@example.com' },
    { id: '3', name: 'Alice', number: '4567890123', email: 'alice@example.com' },
];

const Appp = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);


    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleClosePopup = () => {
        setSelectedContact(null);
    };

    const filteredContacts = contactsData.filter((contact) =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                style={{ height: 40, borderWidth: 1, marginBottom: 10, padding: 10 }}
                placeholder="Search contacts..."
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
            />

            {filteredContacts.map((contact, index) => (
                <TouchableOpacity
                    key={index}
                    style={{ marginBottom: 10 }}
                    onPress={() => handleContactClick(contact)}
                >
                    <Text>{contact.name}</Text>
                </TouchableOpacity>
            ))}

            <Modal visible={selectedContact !== null} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {selectedContact && (
                        <View style={{ padding: 20, backgroundColor: 'white' }}>
                            <Text style={{ marginBottom: 10 }}>{selectedContact.name}</Text>
                            <Text>{selectedContact.number}</Text>
                            <TouchableOpacity onPress={handleClosePopup} style={{ marginTop: 20 }}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );

};

export default Appp;
