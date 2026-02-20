import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import type { UserProfile, Todo, StudyNote, StudyLog } from "@/types";

// ─── Helpers ──────────────────────────────────────────
function getUserCollection(uid: string, sub: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore not initialized");
  return collection(db, "users", uid, sub);
}

function getUserDoc(uid: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore not initialized");
  return doc(db, "users", uid);
}

// ─── User Profile ─────────────────────────────────────
export async function createUserProfile(
  uid: string,
  data: { email: string; displayName: string },
): Promise<void> {
  const ref = getUserDoc(uid);
  const snap = await getDoc(ref);

  const isAdmin =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    data.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (snap.exists()) {
    const updates: Record<string, unknown> = {
      lastLoginAt: new Date().toISOString(),
    };
    // Sync admin role on every login
    if (isAdmin && snap.data()?.role !== "admin") {
      updates.role = "admin";
    }
    await updateDoc(ref, updates);
    return;
  }

  const profile: UserProfile = {
    uid,
    email: data.email,
    displayName: data.displayName,
    role: isAdmin ? "admin" : "user",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };
  await setDoc(ref, profile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(getUserDoc(uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const db = getFirebaseDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => d.data() as UserProfile);
}

// ─── Generic Sub-collection CRUD ──────────────────────
async function addDocument<T extends { id: string }>(
  uid: string,
  sub: string,
  data: T,
): Promise<void> {
  const col = getUserCollection(uid, sub);
  await setDoc(doc(col, data.id), data);
}

async function updateDocument<T extends Record<string, unknown>>(
  uid: string,
  sub: string,
  docId: string,
  data: T,
): Promise<void> {
  const col = getUserCollection(uid, sub);
  await updateDoc(doc(col, docId), data);
}

async function removeDocument(
  uid: string,
  sub: string,
  docId: string,
): Promise<void> {
  const col = getUserCollection(uid, sub);
  await deleteDoc(doc(col, docId));
}

async function loadDocuments<T>(uid: string, sub: string): Promise<T[]> {
  const col = getUserCollection(uid, sub);
  const snap = await getDocs(col);
  return snap.docs.map((d) => d.data() as T);
}

function subscribeDocuments<T>(
  uid: string,
  sub: string,
  callback: (data: T[]) => void,
): Unsubscribe {
  const col = getUserCollection(uid, sub);
  return onSnapshot(col, (snap) => {
    callback(snap.docs.map((d) => d.data() as T));
  });
}

// ─── Todos ────────────────────────────────────────────
export const addTodoDoc = (uid: string, todo: Todo) =>
  addDocument(uid, "todos", todo);

export const updateTodoDoc = (uid: string, id: string, data: Partial<Todo>) =>
  updateDocument(uid, "todos", id, data as Record<string, unknown>);

export const deleteTodoDoc = (uid: string, id: string) =>
  removeDocument(uid, "todos", id);

export const loadTodos = (uid: string) => loadDocuments<Todo>(uid, "todos");

export const subscribeTodos = (uid: string, cb: (todos: Todo[]) => void) =>
  subscribeDocuments<Todo>(uid, "todos", cb);

// ─── Study Logs ───────────────────────────────────────
export const addStudyLogDoc = (uid: string, log: StudyLog) =>
  addDocument(uid, "studyLogs", log);

export const deleteStudyLogDoc = (uid: string, id: string) =>
  removeDocument(uid, "studyLogs", id);

export const loadStudyLogs = (uid: string) =>
  loadDocuments<StudyLog>(uid, "studyLogs");

export const subscribeStudyLogs = (
  uid: string,
  cb: (logs: StudyLog[]) => void,
) => subscribeDocuments<StudyLog>(uid, "studyLogs", cb);

// ─── Study Notes ──────────────────────────────────────
export const addStudyNoteDoc = (uid: string, note: StudyNote) =>
  addDocument(uid, "studyNotes", note);

export const updateStudyNoteDoc = (
  uid: string,
  id: string,
  data: Partial<StudyNote>,
) => updateDocument(uid, "studyNotes", id, data as Record<string, unknown>);

export const deleteStudyNoteDoc = (uid: string, id: string) =>
  removeDocument(uid, "studyNotes", id);

export const loadStudyNotes = (uid: string) =>
  loadDocuments<StudyNote>(uid, "studyNotes");

export const subscribeStudyNotes = (
  uid: string,
  cb: (notes: StudyNote[]) => void,
) => subscribeDocuments<StudyNote>(uid, "studyNotes", cb);

// ─── Admin: Load user's sub-collections ───────────────
export async function getUserStudyData(uid: string) {
  const [todos, studyLogs, studyNotes] = await Promise.all([
    loadTodos(uid),
    loadStudyLogs(uid),
    loadStudyNotes(uid),
  ]);
  return { todos, studyLogs, studyNotes };
}
