import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import * as firebaseConfigJson from "../../firebaseConfig.json"

// Initialize Firebase
const firebaseConfig: FirebaseOptions = firebaseConfigJson as FirebaseOptions;

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Connect to Auth Emulator in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
    disableWarnings: true
  });
}

export default app;