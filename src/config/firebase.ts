import admin from "firebase-admin";

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (raw) {
  const serviceAccount = JSON.parse(raw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
} else {
  console.warn("FIREBASE_SERVICE_ACCOUNT_JSON is missing. Firebase features are disabled.");
}

export default admin;
