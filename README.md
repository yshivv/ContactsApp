# Contact App

This is a contact app built with React Native. It allows you to manage your contacts, search for contacts, add new contacts, edit existing contacts, and delete contacts. You can also call, send SMS, and email contacts directly from the app.

## Features

- Display a list of contacts
- Search for contacts by name
- Add a new contact
- Edit an existing contact
- Delete a contact
- Call a contact
- Send SMS to a contact
- Send email to a contact

## Installation

To run the app locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Change to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Run the app: `npm start`

## Usage

Once the app is running, you can use it on your device or emulator. The app will show a home screen with a button to navigate to the Contacts screen. On the Contacts screen, you can view and manage your contacts.

### Adding a Contact

To add a new contact, click on the "+" button at the bottom right corner of the Contacts screen. A modal will appear with input fields for name and phone number. Enter the details and click the "Save" button to add the contact.

### Editing a Contact

To edit an existing contact, click on the contact in the contact list. This will open a popup with the contact details. Click the "Edit" button to modify the contact's name and phone number. After making the changes, click the "Save" button to update the contact.

### Deleting a Contact

To delete a contact, click on the contact in the contact list. This will open a popup with the contact details. Click the "Delete" button to remove the contact. A confirmation dialog will appear, asking for confirmation. Click the "Delete" button in the confirmation dialog to delete the contact.

### Calling a Contact

To call a contact, click on the phone icon next to the contact in the contact list. This will initiate a call to the contact's phone number using the device's default phone app.

### Sending SMS to a Contact

To send an SMS to a contact, click on the SMS icon next to the contact in the contact list. This will open the device's default SMS app with a new message to the contact's phone number.

### Sending Email to a Contact

To send an email to a contact, click on the email icon next to the contact in the contact list. This will open the device's default email app with a new email to the contact's email address.

## Customization

You can customize the app by modifying the contactsData array in the code. Update the array with your own contacts data, providing the id, name, number, and email for each contact.

## Code Components

The code consists of the following components:

1. **App Registry**: It registers the main component of the application (`App`) with the app name defined in `app.json`.

2. **App Component**: The `App` component is a React Native component that serves as the entry point of the application. It contains the main logic and UI elements of the app.

3. **State Hooks**: The `useState` hook is used to manage the application state. Two state variables are defined:
   - `searchText`: Stores the current value of the search input field.
   - `selectedContact`: Stores the selected contact object when a contact is clicked.

4. **Contact Data**: An array of contact objects (`contactsData`) is defined, which contains sample contact information such as id, name, number, and email.

5. **Handle Contact Click**: The `handleContactClick` function is called when a contact is clicked. It updates the `selectedContact` state with the clicked contact.

6. **Handle Close Popup**: The `handleClosePopup` function is called when the close button is clicked in the modal popup. It sets the `selectedContact` state to `null`, closing the modal.

7. **Filtered Contacts**: The `filteredContacts` variable holds an array of contacts that match the search text entered by the user. It filters the `contactsData` array based on the contact name.

8. **UI Components**: The code uses several React Native UI components from the `react-native` library to build the user interface. These components include `View`, `Text`, `TextInput`, `TouchableOpacity`, and `Modal`.

9. **Rendered UI**: The code renders the UI based on the state and data. It includes a search input field, a list of contacts, and a modal popup to display contact details.

## Libraries and Plugins Used

The code uses the following libraries and plugins:

1. **React**: The core library for building user interfaces in JavaScript.

2. **React Native**: A framework for building native mobile apps using React.

3. **react-native**: The main library for React Native development.

4. **AppRegistry**: A module from `react-native` that provides the interface for registering the app's main component.

5. **react-native-modal**: A library for creating modals and overlays in React Native. It is used to display the contact details in a modal popup.


## Dependencies

This app uses the following dependencies:

- React Native: A JavaScript framework for building mobile applications.
- @react-navigation/native: A navigation library for React Native apps.
- @react-navigation/stack: A stack navigator for managing navigation between screens.
- react-native: The core React Native library.
- react: A JavaScript library for building user interfaces.
- react-native-vector-icons: A library for adding custom icons to React Native apps.

## License


This project is licensed under the MIT License. Feel free to modify and use the code for your own purposes.


