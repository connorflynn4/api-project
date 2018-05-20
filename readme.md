API project
Workout Forum

A place where people with an interest in the fitness industry can share details about their favourite workouts
amongst other users of the forum.

Hosted using mongoose on mLab.

Ability to add a new workout to the forum (each entry has been validated).

Ability to add a new workout to the forum and include an workout image also,
image will be sent to the "uploads" folder.

Ability to get all of the workouts currently on the forum.

Ability to get a specific workout using the ID that was auto generated in mLab,
can be brought back in either XML or JSON.

Ability to delete a specific workout on the forum.

Use of Messaging - When adding a workout, a message is posted to PubNub.


Add a comment to a specific workout

7 Tests:

Users
should return collection of JSON documents.
should register a user.
should authenticate a user.

Workouts
should return collection of JSON documents
should add a workout
should delete workout
should update a workout

mochawesome report generated for each test.


Custom validation on the "difficulty" field. 

Deployed to Heroku:
https://connorflynnapi-20058810.herokuapp.com/

Security:
2 users are added to the forum, upon registering they are given a JSON web token.
This token can then be used to add, delete, update or view workout information.

NPM DEPENDENCIES:
"body-parser": "^1.18.2",
"dotenv": "^5.0.0",
"express": "^4.16.2",
"jsonwebtoken": "^8.2.0",
"lodash": "^4.17.5",
"mongoose": "^5.0.8",
"multer": "^1.3.0",
"npm": "^5.7.1"


References:
https://github.com/fxwalsh/node-samples-2018/tree/master/labs
https://github.com/expressjs/multer
https://jwt.io/
https://github.com/auth0/node-jsonwebtoken
