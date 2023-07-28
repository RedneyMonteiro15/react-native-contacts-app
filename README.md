# react-native-contacts-app
React Contacts


Develop a React web application to manage contacts

Application Features

The web application should have 5 features:

1 - A landing page to list existing contacts.

2 - A separate page to add new contacts.

3 - Allow editing an existing record reusing the view from the add contacts feature.

4 - Allow deletion of an existing record, showing a modal for confirmation.

5 - Another page for showing contact details.

Considerations
A contact is an entity with 5 fields: ID, Name, Contact, email address and a picture. Name should be a string of any size greater than 5, contact should be 9 digits, and email should be a valid email. A person cannot be created without an image.

Each contact in the index page should be displayed as a card, with all the contact details and the picture. Each contact should have a link to a contact details page.

The contact details page should show all the fields of the contact.

The landing page should have a list of existing contacts. Each contact row should have a link to edit the contact and a button to delete the contact.

Contact and email address should be unique, two contacts cannot have the same.

Any database system can be used for this exercise (local storage, sqlite, mysql database or other).

Always use framework native features when possible. Additional modules might be installed, except for the features that need to be developed under this exercise.

Additional Requirements
The following requirements should be implemented if within test execution time:

Implement functional tests for checking form validation errors when adding or editing items in the database.

Allow viewing the list of contacts by anyone, but the other features should only be accessed by an authenticated user.

Notes
For the exercise to work correctly in the environment, it should be compiled and the compiled version of the exercise should be deployed into the environment.

