import admin from "firebase-admin";
import serviceAccount from "../secret/firebase-secret.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();
