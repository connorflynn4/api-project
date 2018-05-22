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

Use of Messaging - When adding a workout, a message is posted to Pub Nub.

Add a comment to a specific workout.

5 Tests:

Users
should return collection of JSON documents (working)
should register a user (working)
should authenticate a user (working)

Workouts
should return collection of JSON documents (working)
should add a workout (working)


/////////Still in Progress - Commented Out///////////
should delete workout
should update a workout
/////////////////////////////////////////////////////

mochawesome report generated for each test.


Custom validation on the "difficulty" field - must either equal to "Beginner, Intermediate or Advanced"

Deployed to Heroku:
https://connorflynnapi-20058810.herokuapp.com/

Security/Authentication:
2 users are added to the forum, upon registering they are given a JSON web token.
This token can then be used to add, delete, update or view workout information.

NPM DEPENDENCIES:
"babel-cli": "^6.26.0",
"babel-core": "^6.26.0",
"babel-eslint": "^8.2.1",
"babel-polyfill": "^6.26.0",
"babel-preset-env": "^1.6.1",
"bcrypt-nodejs": "0.0.3",
"body-parser": "^1.18.2",
"cross-env": "^5.1.4",
"dotenv": "^5.0.0",
"eslint": "^4.17.0",
"eslint-config-google": "^0.9.1",
"express": "^4.16.2",
"express-async-handler": "^1.1.3",
"json2xml": "^0.1.3",
"jsonwebtoken": "^8.2.1",
"lodash": "^4.17.5",
"mocha": "^5.1.1",
"mochawesome": "^3.0.2",
"mockgoose": "^7.3.5",
"mongoose": "^5.0.8",
"multer": "^1.3.0",
"nodemon": "^1.14.12",
"npm": "^5.7.1",
"passport": "^0.4.0",
"passport-jwt": "^4.0.0",
"pubnub": "^4.20.2",
"save-dev": "^2.0.0",
"should": "^13.2.1",
"supertest": "^3.0.0"

References:
https://github.com/fxwalsh/node-samples-2018/tree/master/labs
https://github.com/expressjs/multer
https://jwt.io/
https://github.com/auth0/node-jsonwebtoken
