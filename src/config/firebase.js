const admin = require('firebase-admin');

let serviceAccount;

try {
  serviceAccount = require('../../serviceAccountKey.json');
} catch (error) {
  console.error('⚠️  No se encontró serviceAccountKey.json');
  console.error('   Descárgalo desde Firebase Console > Project Settings > Service Accounts');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };