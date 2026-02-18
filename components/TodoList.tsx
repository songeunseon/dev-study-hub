"use client";

import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Card,
  CardBody,
  Select,
  SelectItem,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
} from "@heroui/react";
import { useState, useMemo } from "react";
import { CATEGORIES, type StudyCategory, type TodoPriority } from "@/types";
import { useStudy, type StudyLog } from "@/lib/study";

const PRIORITY_CONFIG: Record<TodoPriority, { label: string; dot: string }> = {
  high: { label: "높음", dot: "bg-danger" },
  medium: { label: "중간", dot: "bg-warning" },
  low: { label: "낮음", dot: "bg-default-300" },
};

export function TodoList() {
  const { todos, studyLogs, addTodo, toggleTodo, deleteTodo } = useStudy();

  const addModal = useDisclosure();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<StudyCategory>("frontend");
  const [priority, setPriority] = useState<TodoPriority>("medium");
  const [memo, setMemo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [activeTab, setActiveTab] = useState<"planner" | "logs">("planner");

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo({
      title: title.trim(),
      category,
      priority,
      memo: memo.trim() || undefined,
      dueDate: dueDate || undefined,
    });
    setTitle("");
    setMemo("");
    setDueDate("");
    setPriority("medium");
    addModal.onClose();
  };

  const filtered = useMemo(() => {
    let list = [...todos];
    if (filter === "pending") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    const priorityOrder: Record<TodoPriority, number> = {
      high: 0,
      medium: 1,
      low: 2,
    };
    list.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    return list;
  }, [todos, filter]);

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);
  const progress =
    todos.length > 0 ? Math.round((completed.length / todos.length) * 100) : 0;

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const isOverdue = (d?: string) => {
    if (!d) return false;
    return new Date(d) < new Date(new Date().toDateString());
  };

  // Group study logs by date
  const groupedLogs = useMemo(() => {
    const groups: Record<string, StudyLog[]> = {};
    for (const log of studyLogs) {
      const date = new Date(log.completedAt).toLocaleDateString("ko-KR");
      if (!groups[date]) groups[date] = [];
      groups[date].push(log);
    }
    return groups;
  }, [studyLogs]);

  return (
    <>
      <Card className="rounded-2xl border border-divider">
        <CardBody className="gap-4 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              스터디 플래너
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-default-100 text-default-500 rounded-lg">
              {today}
            </span>
          </div>

          {/* Tab switch: 플래너 / 학습 기록 */}
          <div className="flex gap-1 p-1 bg-default-100 rounded-xl">
            <button
              onClick={() => setActiveTab("planner")}
              className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors ${
                activeTab === "planner"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-default-500 hover:text-foreground"
              }`}
            >
              학습 계획
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-colors ${
                activeTab === "logs"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-default-500 hover:text-foreground"
              }`}
            >
              학습 기록
              {studyLogs.length > 0 && (
                <span className="ml-1 text-[10px] text-primary font-semibold">
                  {studyLogs.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === "planner" ? (
            <>
              {/* Progress */}
              {todos.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-default-500">
                      {completed.length}/{todos.length} 완료
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {progress}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    color="primary"
                    size="sm"
                    radius="full"
                    classNames={{ track: "h-2" }}
                  />
                </div>
              )}

              {/* Filter + Add */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  {(["all", "pending", "completed"] as const).map((f) => (
                    <Button
                      key={f}
                      size="sm"
                      variant={filter === f ? "flat" : "light"}
                      color={filter === f ? "primary" : "default"}
                      radius="lg"
                      className="text-xs h-7 min-w-0 px-3"
                      onPress={() => setFilter(f)}
                    >
                      {f === "all"
                        ? "전체"
                        : f === "pending"
                          ? `진행 중 (${pending.length})`
                          : `완료 (${completed.length})`}
                    </Button>
                  ))}
                </div>
                <Button
                  color="primary"
                  size="sm"
                  radius="lg"
                  className="font-medium"
                  onPress={addModal.onOpen}
                  startContent={
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  }
                >
                  추가
                </Button>
              </div>

              {/* Todo items */}
              <div className="flex-1 custom-scrollbar overflow-y-auto max-h-96 pr-1">
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mb-2"
                    >
                      <rect x="2" y="3" width="20" height="18" rx="2" />
                      <path d="M8 7h8M8 12h5" />
                    </svg>
                    <p className="text-sm">
                      {filter === "all"
                        ? "학습 목표를 추가하고 시작해보세요!"
                        : filter === "pending"
                          ? "진행 중인 항목이 없습니다."
                          : "완료된 항목이 없습니다."}
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  {filtered.map((todo) => {
                    const cat = CATEGORIES.find((c) => c.key === todo.category);
                    const pConfig = PRIORITY_CONFIG[todo.priority];
                    const overdue = !todo.completed && isOverdue(todo.dueDate);
                    const isExpanded = expandedId === todo.id;

                    return (
                      <div key={todo.id}>
                        <div
                          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-default-100 transition-colors cursor-pointer ${
                            todo.completed ? "opacity-50" : ""
                          }`}
                          onClick={() =>
                            setExpandedId(isExpanded ? null : todo.id)
                          }
                        >
                          <div onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              isSelected={todo.completed}
                              onValueChange={() => toggleTodo(todo.id)}
                              size="md"
                              radius="full"
                              color="primary"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full shrink-0 ${pConfig.dot}`}
                              />
                              <span
                                className={`text-sm truncate ${todo.completed ? "line-through" : ""}`}
                              >
                                {todo.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {todo.dueDate && (
                                <span
                                  className={`text-[10px] ${overdue ? "text-danger font-medium" : "text-default-400"}`}
                                >
                                  {overdue ? "기한 초과 " : ""}
                                  {new Date(todo.dueDate).toLocaleDateString(
                                    "ko-KR",
                                    { month: "short", day: "numeric" },
                                  )}
                                </span>
                              )}
                              {todo.memo && (
                                <span className="text-[10px] text-default-300">
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="inline mr-0.5"
                                  >
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                  </svg>
                                  메모
                                </span>
                              )}
                            </div>
                          </div>
                          <Chip
                            size="sm"
                            variant="flat"
                            radius="lg"
                            className="text-[10px] shrink-0"
                          >
                            {cat?.label}
                          </Chip>
                          <Button
                            size="sm"
                            variant="light"
                            color="danger"
                            isIconOnly
                            radius="full"
                            className="h-6 w-6 min-w-0 opacity-0 group-hover:opacity-100"
                            onPress={() => deleteTodo(todo.id)}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                        {isExpanded && todo.memo && (
                          <div className="ml-12 mr-3 mb-2 px-3 py-2 rounded-lg bg-default-50 border border-divider">
                            <p className="text-xs text-default-500 whitespace-pre-wrap leading-relaxed">
                              {todo.memo}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Study Logs Tab */
            <div className="flex-1 custom-scrollbar overflow-y-auto max-h-96 pr-1">
              {studyLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mb-2"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  <p className="text-sm">
                    로드맵에서 학습을 완료하면 여기에 기록됩니다.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {Object.entries(groupedLogs).map(([date, logs]) => (
                    <div key={date}>
                      <p className="text-[10px] font-semibold text-default-400 uppercase tracking-wider mb-2 px-1">
                        {date}
                      </p>
                      <div className="flex flex-col gap-1">
                        {logs.map((log) => {
                          const cat = CATEGORIES.find(
                            (c) => c.key === log.category,
                          );
                          return (
                            <div
                              key={log.id}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-primary/5"
                            >
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {log.subtopicTitle}
                                </p>
                                <p className="text-[10px] text-default-400">
                                  {log.nodeTitle}
                                </p>
                              </div>
                              <Chip
                                size="sm"
                                variant="flat"
                                radius="lg"
                                className="text-[10px] shrink-0"
                              >
                                {cat?.label}
                              </Chip>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Add Todo Modal */}
      <Modal isOpen={addModal.isOpen} onOpenChange={addModal.onOpenChange}>
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-bold">
                새 학습 목표
              </ModalHeader>
              <ModalBody className="gap-4">
                <Input
                  label="할 일"
                  value={title}
                  onValueChange={setTitle}
                  variant="flat"
                  radius="lg"
                  size="lg"
                  isRequired
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="카테고리"
                    selectedKeys={[category]}
                    onChange={(e) =>
                      setCategory(e.target.value as StudyCategory)
                    }
                    variant="flat"
                    radius="lg"
                    size="sm"
                  >
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.key}>{cat.label}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="우선순위"
                    selectedKeys={[priority]}
                    onChange={(e) =>
                      setPriority(e.target.value as TodoPriority)
                    }
                    variant="flat"
                    radius="lg"
                    size="sm"
                  >
                    <SelectItem key="high">높음</SelectItem>
                    <SelectItem key="medium">중간</SelectItem>
                    <SelectItem key="low">낮음</SelectItem>
                  </Select>
                </div>
                <Input
                  label="마감일 (선택)"
                  type="date"
                  value={dueDate}
                  onValueChange={setDueDate}
                  variant="flat"
                  radius="lg"
                  size="sm"
                />
                <Textarea
                  label="메모 (선택)"
                  value={memo}
                  onValueChange={setMemo}
                  variant="flat"
                  radius="lg"
                  minRows={2}
                  maxRows={4}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" size="sm" radius="lg" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  radius="lg"
                  onPress={handleAdd}
                >
                  추가
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
