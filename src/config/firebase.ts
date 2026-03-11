import admin from "firebase-admin";

const projectId = process.env.FCM_PROJECT_ID;
const clientEmail = process.env.FCM_CLIENT_EMAIL;

if (raw) {
  const serviceAccount = JSON.parse(raw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
} else {
  console.warn("FIREBASE_SERVICE_ACCOUNT_JSON is missing. Firebase features are disabled.");
// Your .env contains "\n" literals, convert to real newlines
const privateKey = (process.env.FCM_PRIVATE_KEY || "").replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase env vars: FCM_PROJECT_ID / FCM_CLIENT_EMAIL / FCM_PRIVATE_KEY"
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export default admin;
