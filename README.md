# MongoDB-Social-Network-API

## Purpose
The purpose of this app is to create an API to handle CRUD functionality against a MongoDB database with a Mongoose wrapper.


## Technologies Highlighted
>MongoDB

>Mongoose

>Node.js

>Express.js

## Links

Link to deployed application...


Link to GitHub repo...
https://github.com/Pkrysinski/MongoDB-Social-Network-API

## User Story

AS A social media startup...
I WANT an API for my social network that uses a NoSQL database,
SO THAT my website can handle large amounts of unstructured data.


## Acceptence Criteria Notes

GIVEN a social network API...

- - - - -
WHEN I enter the command to invoke the application,
THEN my server is started and the Mongoose models are synced to the MongoDB database.
>DONE.

- - - - -
WHEN I open API GET routes in Insomnia for users and thoughts,
THEN the data for each of these routes is displayed in a formatted JSON.
>DONE:
    -GET all users.
    -GET a single user by its _id and populated thought and friend data.

    -GET all thoughts.
    -

- - - - -
WHEN I test API POST, PUT, and DELETE routes in Insomnia,
THEN I am able to successfully create, update, and delete users and thoughts in my database.
>DONE:
    -POST a new user.
    -PUT to update a user by its _id.
    -DELETE to remove user by its _id.

    -POST to create a new thought.
        +TODO: Creates a new thought, but doesn't push the thoughtID to the user.thoughts array.
    -PUT to update a thought by its _id (working on this now)

- - - - -
WHEN I test API POST and DELETE routes in Insomnia,
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.
