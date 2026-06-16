import { db } from './firebase';

type FirestoreModule = {
  collection: (...args: unknown[]) => unknown;
  addDoc: (...args: unknown[]) => Promise<{ id: string }>;
  getDocs: (...args: unknown[]) => Promise<{ docs: Array<{ id: string; data: () => unknown }> }>;
  getDoc: (...args: unknown[]) => Promise<{ exists: () => boolean; id: string; data: () => unknown }>;
  setDoc: (...args: unknown[]) => Promise<void>;
  doc: (...args: unknown[]) => unknown;
  query: (...args: unknown[]) => unknown;
  where: (...args: unknown[]) => unknown;
  updateDoc: (...args: unknown[]) => Promise<void>;
  deleteDoc: (...args: unknown[]) => Promise<void>;
};

function assertDbConfigured(): void {
  if (!db) {
    throw new Error('Firebase not configured. Update src/data/firebase.ts and install firebase.');
  }
}

async function getFirestoreModule(): Promise<FirestoreModule> {
  const mod = await import('firebase/firestore');
  return mod as unknown as FirestoreModule;
}

export async function listCollection<T>(collectionName: string): Promise<T[]> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  const snapshot = await fs.getDocs(fs.collection(db as unknown, collectionName));
  return snapshot.docs.map(docItem => ({ id: docItem.id, ...(docItem.data() as object) } as T));
}

export async function findById<T>(collectionName: string, id: string): Promise<T | null> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  const snapshot = await fs.getDoc(fs.doc(db as unknown, collectionName, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as object) } as T;
}

export async function listWhereEq<T>(
  collectionName: string,
  fieldName: string,
  fieldValue: string,
): Promise<T[]> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  const q = fs.query(
    fs.collection(db as unknown, collectionName),
    fs.where(fieldName, '==', fieldValue),
  );
  const snapshot = await fs.getDocs(q);
  return snapshot.docs.map(docItem => ({ id: docItem.id, ...(docItem.data() as object) } as T));
}

export async function createDoc<T extends { id?: string }>(
  collectionName: string,
  payload: Omit<T, 'id'>,
): Promise<T> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  const ref = await fs.addDoc(fs.collection(db as unknown, collectionName), payload);
  return { id: ref.id, ...(payload as object) } as T;
}

export async function upsertDocById<T extends { id: string }>(
  collectionName: string,
  id: string,
  payload: Omit<T, 'id'>,
): Promise<void> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  await fs.setDoc(fs.doc(db as unknown, collectionName, id), payload as object, { merge: true });
}

export async function updateDocById<T>(
  collectionName: string,
  id: string,
  updates: Partial<T>,
): Promise<void> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  await fs.updateDoc(fs.doc(db as unknown, collectionName, id), updates as object);
}

export async function deleteDocById(collectionName: string, id: string): Promise<void> {
  assertDbConfigured();
  const fs = await getFirestoreModule();
  await fs.deleteDoc(fs.doc(db as unknown, collectionName, id));
}
