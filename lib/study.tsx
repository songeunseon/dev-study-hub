"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import type { Todo, StudyNote, StudyCategory, StudyLog } from "@/types";
export type { StudyLog };
import { useAuth } from "./auth";
import {
  addTodoDoc,
  updateTodoDoc,
  deleteTodoDoc,
  subscribeTodos,
  addStudyLogDoc,
  deleteStudyLogDoc,
  subscribeStudyLogs,
  addStudyNoteDoc,
  updateStudyNoteDoc,
  deleteStudyNoteDoc,
  subscribeStudyNotes,
  loadTodos,
  loadStudyLogs,
  loadStudyNotes,
} from "./firestore";

// ─── localStorage helpers ──────────────────────────────
const LS_KEYS = {
  todos: "dev-study-hub:todos",
  logs: "dev-study-hub:logs",
  notes: "dev-study-hub:notes",
  migrated: "dev-study-hub:migrated",
} as const;

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

// ─── Context ───────────────────────────────────────────
interface StudyContextType {
  todos: Todo[];
  studyLogs: StudyLog[];
  studyNotes: StudyNote[];
  addTodo: (data: Omit<Todo, "id" | "completed" | "createdAt">) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addStudyLog: (
    nodeTitle: string,
    subtopicTitle: string,
    category: StudyCategory,
  ) => void;
  deleteStudyLog: (id: string) => void;
  addStudyNote: (
    data: Omit<StudyNote, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateStudyNote: (id: string, content: string) => void;
  deleteStudyNote: (id: string) => void;
}

const StudyContext = createContext<StudyContextType>({} as StudyContextType);

export function StudyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const uid = user?.uid;

  // ─── Data loading & sync ────────────────────────────
  useEffect(() => {
    // Logged-in: subscribe to Firestore real-time updates
    if (uid) {
      let cancelled = false;

      // Migrate localStorage data to Firestore on first login
      const migrateAndSubscribe = async () => {
        const migratedKey = `${LS_KEYS.migrated}:${uid}`;
        const alreadyMigrated = localStorage.getItem(migratedKey);

        if (!alreadyMigrated) {
          const localTodos = loadFromStorage<Todo[]>(LS_KEYS.todos, []);
          const localLogs = loadFromStorage<StudyLog[]>(LS_KEYS.logs, []);
          const localNotes = loadFromStorage<StudyNote[]>(LS_KEYS.notes, []);

          // Only migrate if there's local data
          if (
            localTodos.length > 0 ||
            localLogs.length > 0 ||
            localNotes.length > 0
          ) {
            const existingTodos = await loadTodos(uid);
            const existingLogs = await loadStudyLogs(uid);
            const existingNotes = await loadStudyNotes(uid);

            const existingTodoIds = new Set(existingTodos.map((t) => t.id));
            const existingLogIds = new Set(existingLogs.map((l) => l.id));
            const existingNoteIds = new Set(existingNotes.map((n) => n.id));

            await Promise.all([
              ...localTodos
                .filter((t) => !existingTodoIds.has(t.id))
                .map((t) => addTodoDoc(uid, t)),
              ...localLogs
                .filter((l) => !existingLogIds.has(l.id))
                .map((l) => addStudyLogDoc(uid, l)),
              ...localNotes
                .filter((n) => !existingNoteIds.has(n.id))
                .map((n) => addStudyNoteDoc(uid, n)),
            ]);
          }

          localStorage.setItem(migratedKey, "true");
        }

        if (cancelled) return;

        // Subscribe to real-time updates
        const unsubs = [
          subscribeTodos(uid, (data) => !cancelled && setTodos(data)),
          subscribeStudyLogs(uid, (data) => !cancelled && setStudyLogs(data)),
          subscribeStudyNotes(uid, (data) => !cancelled && setStudyNotes(data)),
        ];

        setHydrated(true);

        return () => unsubs.forEach((fn) => fn());
      };

      let cleanup: (() => void) | undefined;
      migrateAndSubscribe().then((fn) => {
        cleanup = fn;
      });

      return () => {
        cancelled = true;
        cleanup?.();
      };
    }

    // Not logged in: use localStorage
    setTodos(loadFromStorage<Todo[]>(LS_KEYS.todos, []));
    setStudyLogs(loadFromStorage<StudyLog[]>(LS_KEYS.logs, []));
    setStudyNotes(loadFromStorage<StudyNote[]>(LS_KEYS.notes, []));
    setHydrated(true);
  }, [uid]);

  // Persist to localStorage only when not logged in
  useEffect(() => {
    if (hydrated && !uid) saveToStorage(LS_KEYS.todos, todos);
  }, [todos, hydrated, uid]);
  useEffect(() => {
    if (hydrated && !uid) saveToStorage(LS_KEYS.logs, studyLogs);
  }, [studyLogs, hydrated, uid]);
  useEffect(() => {
    if (hydrated && !uid) saveToStorage(LS_KEYS.notes, studyNotes);
  }, [studyNotes, hydrated, uid]);

  // ─── Todos ─────────────────────────────────────────
  const addTodo = useCallback(
    (data: Omit<Todo, "id" | "completed" | "createdAt">) => {
      const newTodo: Todo = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      if (uid) {
        addTodoDoc(uid, newTodo);
      } else {
        setTodos((prev) => [newTodo, ...prev]);
      }
    },
    [uid],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      if (uid) {
        updateTodoDoc(uid, id, { completed: !todo.completed });
      } else {
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        );
      }
    },
    [uid, todos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      if (uid) {
        deleteTodoDoc(uid, id);
      } else {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }
    },
    [uid],
  );

  // ─── Study Logs ────────────────────────────────────
  const addStudyLog = useCallback(
    (nodeTitle: string, subtopicTitle: string, category: StudyCategory) => {
      const alreadyExists = studyLogs.some(
        (l) => l.subtopicTitle === subtopicTitle && l.nodeTitle === nodeTitle,
      );
      if (alreadyExists) return;

      const newLog: StudyLog = {
        id: crypto.randomUUID(),
        nodeTitle,
        subtopicTitle,
        category,
        completedAt: new Date().toISOString(),
      };
      if (uid) {
        addStudyLogDoc(uid, newLog);
      } else {
        setStudyLogs((prev) => [newLog, ...prev]);
      }
    },
    [uid, studyLogs],
  );

  const deleteStudyLog = useCallback(
    (id: string) => {
      if (uid) {
        deleteStudyLogDoc(uid, id);
      } else {
        setStudyLogs((prev) => prev.filter((l) => l.id !== id));
      }
    },
    [uid],
  );

  // ─── Study Notes ───────────────────────────────────
  const addStudyNote = useCallback(
    (data: Omit<StudyNote, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newNote: StudyNote = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      if (uid) {
        addStudyNoteDoc(uid, newNote);
      } else {
        setStudyNotes((prev) => [newNote, ...prev]);
      }
    },
    [uid],
  );

  const updateStudyNote = useCallback(
    (id: string, content: string) => {
      const updatedAt = new Date().toISOString();
      if (uid) {
        updateStudyNoteDoc(uid, id, { content, updatedAt });
      } else {
        setStudyNotes((prev) =>
          prev.map((n) => (n.id === id ? { ...n, content, updatedAt } : n)),
        );
      }
    },
    [uid],
  );

  const deleteStudyNote = useCallback(
    (id: string) => {
      if (uid) {
        deleteStudyNoteDoc(uid, id);
      } else {
        setStudyNotes((prev) => prev.filter((n) => n.id !== id));
      }
    },
    [uid],
  );

  return (
    <StudyContext.Provider
      value={{
        todos,
        studyLogs,
        studyNotes,
        addTodo,
        toggleTodo,
        deleteTodo,
        addStudyLog,
        deleteStudyLog,
        addStudyNote,
        updateStudyNote,
        deleteStudyNote,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);
