const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const firestore = new Firestore({
  projectId: 'cloudcomputingproject-406215', 
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
});



module.exports = firestore;
