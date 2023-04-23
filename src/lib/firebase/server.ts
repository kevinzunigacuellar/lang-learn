import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// A firebase service account isused to authenticate users with the firebase admin sdk
const serviceAccount = {
    type: "service_account",
    project_id: import.meta.env.FIREBASE_PROJECT_ID,
    private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
    client_email: "firebase-adminsdk-bvjc4@language-learner-6f7e2.iam.gserviceaccount.com",
    client_id: "104457193882121792721",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bvjc4%40language-learner-6f7e2.iam.gserviceaccount.com"
};

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = getAuth(app);