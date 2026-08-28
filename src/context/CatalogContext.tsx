import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  getDocs,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User,
} from 'firebase/auth';
import { EquipmentItem } from '../types';
import { EQUIPMENT_CATALOG } from '../data/telecomData';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';

const CATALOG_COLLECTION = 'catalog';

interface CatalogContextType {
  items: EquipmentItem[];
  isCatalogLoading: boolean;
  addProduct: (item: Omit<EquipmentItem, 'id'>) => Promise<EquipmentItem>;
  updateProduct: (id: string, updated: Partial<EquipmentItem>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleStock: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportCatalog: () => string;
  importCatalog: (jsonStr: string) => Promise<{ success: boolean; error?: string }>;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  adminEmail: string | null;
  isBackendConfigured: boolean;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

function translateAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'El correo no tiene un formato válido.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta de nuevo más tarde.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Revisa tu internet e intenta de nuevo.';
    case 'auth/weak-password':
      return 'La nueva contraseña debe tener al menos 6 caracteres.';
    default:
      return 'Ocurrió un error inesperado. Intenta de nuevo.';
  }
}

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<EquipmentItem[]>(EQUIPMENT_CATALOG);
  const [isCatalogLoading, setIsCatalogLoading] = useState<boolean>(isFirebaseConfigured);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(!isFirebaseConfigured);
  const hasSeededRef = useRef(false);

  // --- Sincronización del catálogo en tiempo real desde Firestore ---
  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      // Sin Firebase configurado: usamos el catálogo por defecto embebido en el código,
      // en modo solo lectura (no hay backend al cual escribir).
      setItems(EQUIPMENT_CATALOG);
      setIsCatalogLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, CATALOG_COLLECTION),
      (snapshot) => {
        if (snapshot.empty) {
          setItems([]);
        } else {
          const catalogItems = snapshot.docs.map((d) => ({ ...(d.data() as EquipmentItem), id: d.id }));
          setItems(catalogItems);
        }
        setIsCatalogLoading(false);
      },
      (error) => {
        console.error('Error leyendo el catálogo de Firestore:', error);
        setItems(EQUIPMENT_CATALOG);
        setIsCatalogLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // --- Sesión de administrador ---
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setIsAuthReady(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // --- Siembra automática: si un admin ya autenticado ve la colección vacía
  // (primera vez que se configura Firebase), se carga el catálogo por defecto una sola vez. ---
  useEffect(() => {
    const seedIfEmpty = async () => {
      if (
        !isFirebaseConfigured ||
        !db ||
        !currentUser ||
        isCatalogLoading ||
        hasSeededRef.current ||
        items.length > 0
      ) {
        return;
      }
      hasSeededRef.current = true;
      try {
        const snapshot = await getDocs(collection(db, CATALOG_COLLECTION));
        if (!snapshot.empty) return;
        const batch = writeBatch(db);
        EQUIPMENT_CATALOG.forEach((item) => {
          const ref = doc(db, CATALOG_COLLECTION, item.id);
          batch.set(ref, item);
        });
        await batch.commit();
      } catch (e) {
        console.error('Error sembrando el catálogo inicial en Firestore:', e);
        hasSeededRef.current = false;
      }
    };
    seedIfEmpty();
  }, [currentUser, isCatalogLoading, items.length]);

  const addProduct = async (newItem: Omit<EquipmentItem, 'id'>): Promise<EquipmentItem> => {
    const id = `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullItem: EquipmentItem = { ...newItem, id };
    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, CATALOG_COLLECTION, id), fullItem);
    } else {
      setItems((prev) => [fullItem, ...prev]);
    }
    return fullItem;
  };

  const updateProduct = async (id: string, updated: Partial<EquipmentItem>): Promise<void> => {
    if (isFirebaseConfigured && db) {
      const current = items.find((item) => item.id === id);
      if (!current) return;
      await setDoc(doc(db, CATALOG_COLLECTION, id), { ...current, ...updated });
    } else {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, CATALOG_COLLECTION, id));
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const toggleStock = async (id: string): Promise<void> => {
    const current = items.find((item) => item.id === id);
    if (!current) return;
    await updateProduct(id, { inStock: !current.inStock });
  };

  const resetToDefaults = async (): Promise<void> => {
    if (isFirebaseConfigured && db) {
      const snapshot = await getDocs(collection(db, CATALOG_COLLECTION));
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.delete(d.ref));
      EQUIPMENT_CATALOG.forEach((item) => {
        const ref = doc(db, CATALOG_COLLECTION, item.id);
        batch.set(ref, item);
      });
      await batch.commit();
    } else {
      setItems(EQUIPMENT_CATALOG);
    }
  };

  const exportCatalog = (): string => JSON.stringify(items, null, 2);

  const importCatalog = async (jsonStr: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed)) {
        return { success: false, error: 'El archivo JSON debe contener un arreglo de productos.' };
      }
      if (parsed.length === 0) {
        return { success: false, error: 'El arreglo está vacío.' };
      }
      const isValid = parsed.every((p) => p.name && p.brand && p.category);
      if (!isValid) {
        return { success: false, error: 'Algunos productos no tienen los campos requeridos (nombre, marca o categoría).' };
      }

      if (isFirebaseConfigured && db) {
        const snapshot = await getDocs(collection(db, CATALOG_COLLECTION));
        const batch = writeBatch(db);
        snapshot.docs.forEach((d) => batch.delete(d.ref));
        parsed.forEach((p: EquipmentItem) => {
          const id = p.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          batch.set(doc(db, CATALOG_COLLECTION, id), { ...p, id });
        });
        await batch.commit();
      } else {
        setItems(parsed);
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Formato JSON inválido.' };
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return { success: false, error: 'El backend de administración aún no está configurado (ver README.md).' };
    }
    if (!email || !password) {
      return { success: false, error: 'Ingresa correo y contraseña.' };
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: translateAuthError(e?.code || '') };
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    if (!isFirebaseConfigured || !auth) return;
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth?.currentUser?.email) {
      return { success: false, error: 'No hay una sesión activa.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'La nueva contraseña debe tener al menos 6 caracteres.' };
    }
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: translateAuthError(e?.code || '') };
    }
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!isFirebaseConfigured || !auth) {
      return { success: false, error: 'El backend de administración aún no está configurado.' };
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (e: any) {
      return { success: false, error: translateAuthError(e?.code || '') };
    }
  };

  return (
    <CatalogContext.Provider
      value={{
        items,
        isCatalogLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaults,
        exportCatalog,
        importCatalog,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated: !!currentUser,
        isAuthReady,
        adminEmail: currentUser?.email ?? null,
        isBackendConfigured: isFirebaseConfigured,
        loginAdmin,
        logoutAdmin,
        changePassword,
        sendPasswordReset,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
