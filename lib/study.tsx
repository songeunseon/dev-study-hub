"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import type { Todo, StudyNote, StudyCategory } from "@/types";

export interface StudyLog {
  id: string;
  nodeTitle: string;
  subtopicTitle: string;
  category: StudyCategory;
  completedAt: string;
}

// ─── localStorage helpers ──────────────────────────────
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    setTodos(loadFromStorage<Todo[]>("dev-study-hub:todos", []));
    setStudyLogs(loadFromStorage<StudyLog[]>("dev-study-hub:logs", []));
    setStudyNotes(loadFromStorage<StudyNote[]>("dev-study-hub:notes", []));
    setHydrated(true);
  }, []);

  // Persist on change (only after initial hydration)
  useEffect(() => {
    if (hydrated) saveToStorage("dev-study-hub:todos", todos);
  }, [todos, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage("dev-study-hub:logs", studyLogs);
  }, [studyLogs, hydrated]);
  useEffect(() => {
    if (hydrated) saveToStorage("dev-study-hub:notes", studyNotes);
  }, [studyNotes, hydrated]);

  // ─── Todos ─────────────────────────────────────────
  const addTodo = useCallback(
    (data: Omit<Todo, "id" | "completed" | "createdAt">) => {
      const newTodo: Todo = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos((prev) => [newTodo, ...prev]);
    },
    [],
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ─── Study Logs ────────────────────────────────────
  const addStudyLog = useCallback(
    (nodeTitle: string, subtopicTitle: string, category: StudyCategory) => {
      setStudyLogs((prev) => {
        if (
          prev.some(
            (l) =>
              l.subtopicTitle === subtopicTitle && l.nodeTitle === nodeTitle,
          )
        ) {
          return prev;
        }
        return [
          {
            id: crypto.randomUUID(),
            nodeTitle,
            subtopicTitle,
            category,
            completedAt: new Date().toISOString(),
          },
          ...prev,
        ];
      });
    },
    [],
  );

  const deleteStudyLog = useCallback((id: string) => {
    setStudyLogs((prev) => prev.filter((l) => l.id !== id));
  }, []);

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
      setStudyNotes((prev) => [newNote, ...prev]);
    },
    [],
  );

  const updateStudyNote = useCallback((id: string, content: string) => {
    setStudyNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, content, updatedAt: new Date().toISOString() }
          : n,
      ),
    );
  }, []);

  const deleteStudyNote = useCallback((id: string) => {
    setStudyNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

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
