import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Estas variables se cargan desde el archivo .env (ver .env.example).
// Son "públicas" por diseño de Firebase: no dan acceso a nada por sí solas,
// el control de acceso real vive en las Reglas de Seguridad de Firestore
// (archivo firestore.rules) y en Firebase Authentication.
//
// Nota: no usamos Firebase Storage aquí porque Google exige el plan de pago
// Blaze (aunque el uso se quede en $0) para activarlo. Las fotos de producto
// se suben en su lugar a ImgBB (ver src/lib/imgbb.ts), que es 100% gratis y
// no pide tarjeta.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  // Sin credenciales configuradas (por ejemplo, en una vista previa local sin .env),
  // dejamos todo en undefined en vez de tronar la app entera. CatalogContext revisa
  // isFirebaseConfigured antes de usar auth/db.
  console.warn(
    '[Firebase] Faltan variables de entorno VITE_FIREBASE_*. El catálogo funcionará en modo solo-lectura con datos por defecto y el panel de admin quedará deshabilitado hasta configurar Firebase (ver README.md).'
  );
}

export { app, auth, db };
