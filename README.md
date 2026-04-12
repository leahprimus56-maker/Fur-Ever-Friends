🐾 Fur-Ever-Friends

Overview
Fur-Ever Friends is a full-stack web application that allows users to explore cat and dog breeds, adopt or sponsor pets, and support animal rescue efforts.

The platform combines external APIs for breed information with a local dataset for adoptable pets, while using Firebase for authentication and user-specific features like bookmarking.

Users can browse freely, but must be logged in to access interactive features.

Features

🏠 Home Page

*  Welcome

*  Quick links to all sections of the app

*  Top residents looking for a home 

*  Rescue stories

*  Links to external pet care resources

*  Accessible to all users


📚 Breed Browser

*  Displays detailed information on many cat and dog breeds

* Uses external APIs

# Users can:

*  Bookmark favourite breeds

*  Search for a certain breed

# Filter:

*  Cats → energy level, affection level

*  Dogs → breed group


🐶 Adoption Page

*  Displays adoptable pets from a local dataset (pets.json)

#  Users can:

*  Adopt a pet

*  Sponsor a pet

#  Filter by:

*  All

*  Cats

*  Dogs


❤️ Support Us Page

*  Volunteer form

*  Donation form


ℹ️ About Us Page

*  About shelter and our mission

*  Our staff


🔐 Authentication

#  Signup and login required for:

*  Bookmarking

*  Adopting / sponsoring

*  Volunteering

*  Donating


#  Technologies

*  HTML

*  CSS

*  JavaScript

*  Firebase

*  Authentication

*  Firestore Database

*  External APIs

*  Local API

#  Database
Firestore Structure

The app uses Firestore mainly for storing user-specific favourites:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/favorites/{docId} {
      allow read, write: if true;
    }
  }
}

#  Collections
users/{userId}/favorites – stores bookmarked breeds

#  API
External APIs
*  Dog API

https://api.thedogapi.com/v1/breeds
*  Cat API

https://api.thecatapi.com/v1/breeds
*  Note: API keys are used to authenticate requests.

Local Data
*  pets.json

*  Contains both cats and dogs available for adoption

*  Used for the Adoption page

#  Conclusion
This project demonstrates a modern full-stack application that integrates:

*  External APIs for real-time data

*  Local JSON data for adoption listings

*  Firebase for authentication and user interaction

It provides both an educational experience and a functional adoption platform, promoting awareness and support for animal welfare.