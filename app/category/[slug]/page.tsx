"use client";

import { use, useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Tabs,
  Tab,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { CATEGORIES, type StudyNote, type Bookmark, type Quiz } from "@/types";
import { LEARNING_CONTENT } from "@/lib/content";
import { ROADMAPS } from "@/lib/roadmap";
import { Roadmap } from "@/components/Roadmap";
import { useStudy } from "@/lib/study";
import { exportNotesToPdf } from "@/lib/export-pdf";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = CATEGORIES.find((c) => c.key === slug);
  const content = LEARNING_CONTENT[slug as keyof typeof LEARNING_CONTENT];
  const roadmap = ROADMAPS[slug as keyof typeof ROADMAPS];

  const {
    studyLogs,
    deleteStudyLog,
    studyNotes,
    addStudyNote,
    deleteStudyNote,
  } = useStudy();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const categoryLogs = useMemo(
    () => studyLogs.filter((l) => l.category === slug),
    [studyLogs, slug],
  );

  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const noteModal = useDisclosure();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const categoryNotes = useMemo(
    () => studyNotes.filter((n) => n.category === slug),
    [studyNotes, slug],
  );

  const { sortedDates, notesByDate } = useMemo(() => {
    const grouped: Record<string, StudyNote[]> = {};
    for (const note of categoryNotes) {
      const dateKey = new Date(note.createdAt).toLocaleDateString("ko-KR");
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(note);
    }
    const dates = Object.keys(grouped).sort((a, b) => {
      const aTime = new Date(grouped[a][0].createdAt).getTime();
      const bTime = new Date(grouped[b][0].createdAt).getTime();
      return bTime - aTime;
    });
    return { sortedDates: dates, notesByDate: grouped };
  }, [categoryNotes]);

  const bookmarkModal = useDisclosure();
  const [bmTitle, setBmTitle] = useState("");
  const [bmUrl, setBmUrl] = useState("");
  const [bmDesc, setBmDesc] = useState("");

  const quizModal = useDisclosure();
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("");

  const [revealedQuizzes, setRevealedQuizzes] = useState<Set<string>>(
    new Set(),
  );

  if (!category || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-default-400">카테고리를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    addStudyNote({
      title: noteTitle,
      content: noteContent,
      category: category.key,
    });
    setNoteTitle("");
    setNoteContent("");
    noteModal.onClose();
  };

  const handleExportPdf = () => {
    const groups = sortedDates.map((date) => ({
      date,
      notes: notesByDate[date],
    }));
    exportNotesToPdf(category.label, groups);
  };

  const handleAddBookmark = () => {
    if (!bmTitle.trim() || !bmUrl.trim()) return;
    setBookmarks((prev) => [
      {
        id: crypto.randomUUID(),
        title: bmTitle,
        url: bmUrl,
        description: bmDesc,
        category: category.key,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setBmTitle("");
    setBmUrl("");
    setBmDesc("");
    bookmarkModal.onClose();
  };

  const handleAddQuiz = () => {
    if (!quizQuestion.trim() || !quizAnswer.trim()) return;
    setQuizzes((prev) => [
      {
        id: crypto.randomUUID(),
        question: quizQuestion,
        answer: quizAnswer,
        category: category.key,
        correctCount: 0,
        wrongCount: 0,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setQuizQuestion("");
    setQuizAnswer("");
    quizModal.onClose();
  };

  const toggleReveal = (id: string) => {
    setRevealedQuizzes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">{category.label}</h1>
        <p className="mt-2 text-sm text-default-500">{content.intro}</p>
      </div>

      {/* Tabs */}
      <Tabs
        aria-label="학습 탭"
        color="primary"
        variant="solid"
        radius="lg"
        classNames={{
          tabList: "gap-1 bg-default-100 p-1 rounded-xl",
          tab: "text-xs sm:text-sm px-4 py-2 rounded-lg",
          cursor: "rounded-lg bg-primary shadow-md",
          tabContent:
            "group-data-[selected=true]:text-primary-foreground font-medium",
        }}
      >
        {/* 로드맵 */}
        <Tab key="roadmap" title="로드맵">
          {roadmap && <Roadmap data={roadmap} category={category.key} />}
        </Tab>

        {/* 학습기록 */}
        <Tab
          key="records"
          title={`학습기록${categoryLogs.length > 0 ? ` (${categoryLogs.length})` : ""}`}
        >
          <div className="mt-6 flex flex-col gap-4">
            {categoryLogs.length === 0 ? (
              <Card className="rounded-2xl border border-divider">
                <CardBody className="py-12 text-center text-sm text-default-400">
                  로드맵에서 세부항목을 학습 완료하면 이곳에 기록됩니다.
                </CardBody>
              </Card>
            ) : (
              <div className="flex flex-col gap-3">
                {categoryLogs.map((log) => {
                  const isExpanded = expandedLogs.has(log.id);
                  const relatedNotes = studyNotes.filter(
                    (n) =>
                      n.subtopicTitle === log.subtopicTitle &&
                      n.category === slug,
                  );
                  return (
                    <Card
                      key={log.id}
                      className="rounded-2xl border border-divider"
                    >
                      <CardBody className="p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold truncate">
                                {log.subtopicTitle}
                              </h3>
                              <p className="text-[10px] text-default-400">
                                {log.nodeTitle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Chip
                              size="sm"
                              variant="flat"
                              radius="lg"
                              className="text-[10px]"
                            >
                              {new Date(log.completedAt).toLocaleDateString(
                                "ko-KR",
                              )}
                            </Chip>
                            {relatedNotes.length > 0 && (
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                radius="lg"
                                className="text-xs"
                                onPress={() => {
                                  setExpandedLogs((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(log.id)) next.delete(log.id);
                                    else next.add(log.id);
                                    return next;
                                  });
                                }}
                                startContent={
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                                  </svg>
                                }
                              >
                                복습 ({relatedNotes.length})
                              </Button>
                            )}
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              radius="lg"
                              onPress={() => deleteStudyLog(log.id)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </Button>
                          </div>
                        </div>

                        {/* Expanded notes */}
                        {isExpanded && relatedNotes.length > 0 && (
                          <div className="mt-3 border-t border-divider pt-3 flex flex-col gap-2">
                            <p className="text-[10px] font-semibold text-default-400 uppercase tracking-wider">
                              관련 노트 ({relatedNotes.length})
                            </p>
                            {relatedNotes.map((note) => (
                              <div
                                key={note.id}
                                className="rounded-xl bg-default-50 border border-divider p-3"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-xs font-bold">
                                    {note.title}
                                  </h4>
                                  <span className="text-[10px] text-default-400">
                                    {new Date(
                                      note.createdAt,
                                    ).toLocaleDateString("ko-KR")}
                                  </span>
                                </div>
                                <p className="text-xs text-default-500 whitespace-pre-wrap leading-relaxed">
                                  {note.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Tab>

        {/* 노트 */}
        <Tab
          key="notes"
          title={`노트${categoryNotes.length > 0 ? ` (${categoryNotes.length})` : ""}`}
        >
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                radius="lg"
                onPress={noteModal.onOpen}
              >
                새 노트
              </Button>
              {categoryNotes.length > 0 && (
                <Button
                  variant="flat"
                  size="sm"
                  radius="lg"
                  onPress={handleExportPdf}
                  startContent={
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  }
                >
                  PDF 내보내기
                </Button>
              )}
            </div>

            {categoryNotes.length === 0 ? (
              <Card className="rounded-2xl border border-divider">
                <CardBody className="py-12 text-center text-sm text-default-400">
                  노트를 추가하여 학습 내용을 정리해보세요.
                  <br />
                  <span className="text-xs">
                    로드맵에서 주제를 클릭하여 학습 노트를 작성할 수도 있습니다.
                  </span>
                </CardBody>
              </Card>
            ) : (
              <div className="flex flex-col gap-6">
                {sortedDates.map((dateStr) => (
                  <div key={dateStr}>
                    <div className="flex items-center gap-3 mb-3">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                        radius="lg"
                        className="text-xs pdf-date-chip"
                      >
                        {dateStr}
                      </Chip>
                      <div className="flex-1 h-px bg-divider" />
                    </div>
                    <div className="flex flex-col gap-3">
                      {notesByDate[dateStr].map((note) => (
                        <Card
                          key={note.id}
                          className="rounded-2xl border border-divider"
                        >
                          <CardHeader className="flex justify-between px-5 pb-0 pt-4">
                            <div className="flex items-center gap-2 min-w-0">
                              <h3 className="text-sm font-bold truncate">
                                {note.title}
                              </h3>
                              {note.subtopicTitle && (
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  radius="lg"
                                  className="text-[10px] shrink-0"
                                >
                                  {note.nodeTitle} &gt; {note.subtopicTitle}
                                </Chip>
                              )}
                            </div>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              radius="lg"
                              onPress={() => deleteStudyNote(note.id)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </Button>
                          </CardHeader>
                          <CardBody className="px-5 pb-4 pt-2">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-default-500">
                              {note.content}
                            </p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Tab>

        {/* 북마크 */}
        <Tab
          key="bookmarks"
          title={`북마크${bookmarks.length > 0 ? ` (${bookmarks.length})` : ""}`}
        >
          <div className="mt-6 flex flex-col gap-4">
            <Button
              color="primary"
              variant="flat"
              size="sm"
              radius="lg"
              onPress={bookmarkModal.onOpen}
              className="self-start"
            >
              새 북마크
            </Button>
            {bookmarks.length === 0 ? (
              <Card className="rounded-2xl border border-divider">
                <CardBody className="py-12 text-center text-sm text-default-400">
                  유용한 학습 링크를 북마크로 저장해보세요.
                </CardBody>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {bookmarks.map((bm) => (
                  <Card
                    key={bm.id}
                    isPressable
                    as="a"
                    href={bm.url}
                    target="_blank"
                    className="rounded-2xl border border-divider hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <CardBody className="gap-1.5 p-5">
                      <h3 className="text-sm font-bold text-primary">
                        {bm.title}
                      </h3>
                      {bm.description && (
                        <p className="text-xs text-default-500">
                          {bm.description}
                        </p>
                      )}
                      <p className="mt-1 truncate text-[10px] text-default-400">
                        {bm.url}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Tab>

        {/* 퀴즈 */}
        <Tab
          key="quiz"
          title={`퀴즈${quizzes.length > 0 ? ` (${quizzes.length})` : ""}`}
        >
          <div className="mt-6 flex flex-col gap-4">
            <Button
              color="primary"
              variant="flat"
              size="sm"
              radius="lg"
              onPress={quizModal.onOpen}
              className="self-start"
            >
              새 퀴즈
            </Button>
            {quizzes.length === 0 ? (
              <Card className="rounded-2xl border border-divider">
                <CardBody className="py-12 text-center text-sm text-default-400">
                  퀴즈를 만들어 학습 내용을 복습해보세요.
                </CardBody>
              </Card>
            ) : (
              quizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="rounded-2xl border border-divider"
                >
                  <CardBody className="gap-3 p-5">
                    <p className="text-sm font-semibold">Q. {quiz.question}</p>
                    {revealedQuizzes.has(quiz.id) ? (
                      <>
                        <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                          <p className="text-sm text-primary">
                            A. {quiz.answer}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="light"
                          radius="lg"
                          className="self-start text-xs"
                          onPress={() => toggleReveal(quiz.id)}
                        >
                          숨기기
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        radius="lg"
                        className="self-start"
                        onPress={() => toggleReveal(quiz.id)}
                      >
                        정답 보기
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        </Tab>
      </Tabs>

      {/* Modals */}
      <Modal isOpen={noteModal.isOpen} onOpenChange={noteModal.onOpenChange}>
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-bold">새 노트</ModalHeader>
              <ModalBody>
                <Input
                  label="제목"
                  value={noteTitle}
                  onValueChange={setNoteTitle}
                  variant="flat"
                  radius="lg"
                  size="lg"
                  isRequired
                />
                <Textarea
                  label="내용"
                  value={noteContent}
                  onValueChange={setNoteContent}
                  variant="flat"
                  radius="lg"
                  minRows={4}
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
                  onPress={handleAddNote}
                >
                  추가
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={bookmarkModal.isOpen}
        onOpenChange={bookmarkModal.onOpenChange}
      >
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-bold">
                새 북마크
              </ModalHeader>
              <ModalBody>
                <Input
                  label="제목"
                  value={bmTitle}
                  onValueChange={setBmTitle}
                  variant="flat"
                  radius="lg"
                  size="lg"
                  isRequired
                />
                <Input
                  label="URL"
                  type="url"
                  value={bmUrl}
                  onValueChange={setBmUrl}
                  variant="flat"
                  radius="lg"
                  size="lg"
                  isRequired
                />
                <Input
                  label="설명 (선택)"
                  value={bmDesc}
                  onValueChange={setBmDesc}
                  variant="flat"
                  radius="lg"
                  size="lg"
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
                  onPress={handleAddBookmark}
                >
                  추가
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={quizModal.isOpen} onOpenChange={quizModal.onOpenChange}>
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-bold">새 퀴즈</ModalHeader>
              <ModalBody>
                <Textarea
                  label="질문"
                  value={quizQuestion}
                  onValueChange={setQuizQuestion}
                  variant="flat"
                  radius="lg"
                  isRequired
                />
                <Textarea
                  label="정답"
                  value={quizAnswer}
                  onValueChange={setQuizAnswer}
                  variant="flat"
                  radius="lg"
                  isRequired
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
                  onPress={handleAddQuiz}
                >
                  추가
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
