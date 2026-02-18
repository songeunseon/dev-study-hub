export type StudyCategory =
  | "frontend"
  | "backend"
  | "server"
  | "network"
  | "git";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Date;
}

export type TodoPriority = "high" | "medium" | "low";

export interface Todo {
  id: string;
  title: string;
  category: StudyCategory;
  priority: TodoPriority;
  completed: boolean;
  memo?: string;
  dueDate?: string;
  createdAt: string;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  category: StudyCategory;
  nodeId?: string;
  nodeTitle?: string;
  subtopicTitle?: string;
  updatedAt: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: StudyCategory;
  createdAt: string;
}

export interface Quiz {
  id: string;
  question: string;
  answer: string;
  category: StudyCategory;
  lastReviewed?: string;
  correctCount: number;
  wrongCount: number;
  createdAt: string;
}

export interface DailyStats {
  date: string;
  studyMinutes: number;
  completedTodos: number;
  category: StudyCategory;
}

export const CATEGORIES: {
  key: StudyCategory;
  label: string;
  color: string;
}[] = [
  { key: "frontend", label: "프론트엔드", color: "primary" },
  { key: "backend", label: "백엔드", color: "secondary" },
  { key: "server", label: "서버", color: "success" },
  { key: "network", label: "네트워크", color: "warning" },
  { key: "git", label: "Git", color: "danger" },
];
