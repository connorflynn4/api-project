API project
Workout Forum

Hosted using mongoose on mLab.

Ability to add a new workout to the forum (each entry has been validated).

Ability to get all of the workouts currently on the forum.

Ability to get a specific workout using the ID that was auto generated in mLab.

Ability to delete a specific workout on the forum.
( An alternative delete method was also constructed using web tokens
  The web token authorization is working in this method, but as a consequence of this,
  the delete method failed to have its desired effect. Therefore it has been commented out,
  to be developed further in the next project.)

Ability to upload a profile image through postman, this will serve as either a picture of the trainer
that created the workout, or a person's own image for their general profile on the forum. Whenever an
image is posted, it will be stored in the "uploads folder".

Up vote a specific workout: currently not working.
Add a comment to a specific workout: currently not working.

Security:
jsonwebtoken (to be implemented on all methods, currently only on the commented out delete method)

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
