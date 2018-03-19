API project
Workout Forum

A place where people with an interest in the fitness industry can share details about their favourite workouts
amongst other users of the forum. 

Hosted using mongoose on mLab.

Ability to add a new workout to the forum (each entry has been validated).

Ability to get all of the workouts currently on the forum.

Ability to get a specific workout using the ID that was auto generated in mLab.

Ability to delete a specific workout on the forum.
(jsonwebtokens were used as a security mechanism, as only one verified user can delete a post once it has been posted)

Ability to upload a profile image through postman, this will serve as either a picture of the trainer
that created the workout, or a person's own image for their general profile on the forum. Whenever an
image is posted, it will be stored in the "uploads folder".

Up vote a specific workout: currently not working.
Add a comment to a specific workout: currently not working.

Security:
jsonwebtoken (currently only on the delete method, but will be used as needed within other methods)

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
