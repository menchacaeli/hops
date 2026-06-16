function parseBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value == null) return defaultValue;

  const normalized = value.trim().toLowerCase();
  if (normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on') {
    return true;
  }

  if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off') {
    return false;
  }

  return defaultValue;
}

const useMock = parseBooleanEnv(process.env.EXPO_PUBLIC_USE_MOCK, true);

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app: unknown = null;
let db: unknown = null;
let firebaseAuth: unknown = null;

if (!useMock) {
  // Use require() lazily so Jest mock-mode test runs do not parse Firebase ESM internals.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const firebaseApp = require('firebase/app');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const firebaseFirestore = require('firebase/firestore');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const firebaseAuthSdk = require('firebase/auth');

  app = firebaseApp.getApps().length ? firebaseApp.getApp() : firebaseApp.initializeApp(firebaseConfig);
  db = firebaseFirestore.getFirestore(app);
  firebaseAuth = firebaseAuthSdk.getAuth(app);
}

export { app, db, firebaseAuth };