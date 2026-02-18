"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import type { RoadmapData, RoadmapNode } from "@/lib/roadmap";
import type { StudyCategory } from "@/types";
import { useStudy } from "@/lib/study";
import { ROADMAP_NODE_CONTENT } from "@/lib/roadmap-content";

interface RoadmapProps {
  data: RoadmapData;
  category: StudyCategory;
}

function RoadmapNodeCard({
  node,
  index,
  isLast,
  onSubtopicClick,
  completedSubtopics,
}: {
  node: RoadmapNode;
  index: number;
  isLast: boolean;
  onSubtopicClick: (node: RoadmapNode, child: RoadmapNode) => void;
  completedSubtopics: Set<string>;
}) {
  const [expanded, setExpanded] = useState(false);
  const isMilestone = node.type === "milestone";

  const childCount = node.children?.length || 0;
  const completedCount =
    node.children?.filter((c) => completedSubtopics.has(c.title)).length || 0;

  return (
    <div className="relative flex gap-4">
      {/* Vertical line + circle */}
      <div className="flex flex-col items-center">
        <div
          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isMilestone
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "border-2 border-primary/30 bg-background text-default-500"
          }`}
        >
          {index + 1}
        </div>
        {!isLast && <div className="w-px flex-1 bg-primary/15" />}
      </div>

      {/* Content */}
      <div
        className={`flex-1 ${isLast ? "pb-0" : "pb-5"}`}
        style={{ maxWidth: "calc(100% - 48px)" }}
      >
        <Card
          isPressable
          onPress={() => setExpanded(!expanded)}
          className={`w-full rounded-2xl border transition-all ${
            isMilestone
              ? "border-primary/25 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              : "border-divider hover:border-primary/30"
          }`}
        >
          <CardBody className="gap-2 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <h3
                  className={`truncate text-sm font-bold ${
                    isMilestone ? "text-primary" : ""
                  }`}
                >
                  {node.title}
                </h3>
                {isMilestone && (
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                    radius="lg"
                    className="hidden shrink-0 text-[10px] sm:flex"
                  >
                    필수
                  </Chip>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {childCount > 0 && completedCount > 0 && (
                  <span className="text-[10px] text-primary font-medium">
                    {completedCount}/{childCount}
                  </span>
                )}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-default-300 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {node.description && (
              <p className="text-xs leading-relaxed text-default-500">
                {node.description}
              </p>
            )}

            {expanded && node.children && node.children.length > 0 && (
              <div className="mt-2 flex flex-col gap-1 border-t border-divider pt-3">
                {node.children.map((child, cidx) => {
                  const isCompleted = completedSubtopics.has(child.title);
                  return (
                    <div
                      key={child.id}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSubtopicClick(node, child);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          onSubtopicClick(node, child);
                        }
                      }}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-primary/5 transition-colors text-left group/item cursor-pointer"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-medium ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          cidx + 1
                        )}
                      </div>
                      <span
                        className={`text-xs flex-1 ${isCompleted ? "text-primary font-medium" : "text-default-600"}`}
                      >
                        {child.title}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-default-300 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}

            {!expanded && node.children && node.children.length > 0 && (
              <p className="text-[10px] text-default-400">
                {node.children.length}개 세부 항목
                {completedCount > 0 && (
                  <span className="text-primary ml-1">
                    ({completedCount}개 학습 완료)
                  </span>
                )}
              </p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export function Roadmap({ data, category }: RoadmapProps) {
  const modal = useDisclosure();
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [selectedChild, setSelectedChild] = useState<RoadmapNode | null>(null);

  const { studyLogs, addStudyLog, studyNotes, addStudyNote } = useStudy();
  const [noteText, setNoteText] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const completedSubtopics = new Set(
    studyLogs
      .filter((l) => l.category === category)
      .map((l) => l.subtopicTitle),
  );

  useEffect(() => {
    setNoteText("");
    setShowNoteInput(false);
  }, [selectedChild?.id]);

  const matchedTopic = selectedNode
    ? ROADMAP_NODE_CONTENT[selectedNode.id]
    : undefined;
  const subtopicNotes = studyNotes.filter(
    (n) => n.subtopicTitle === selectedChild?.title && n.category === category,
  );

  const handleSubtopicClick = (parentNode: RoadmapNode, child: RoadmapNode) => {
    setSelectedNode(parentNode);
    setSelectedChild(child);
    modal.onOpen();
  };

  const handleMarkComplete = () => {
    if (selectedNode && selectedChild) {
      addStudyLog(selectedNode.title, selectedChild.title, category);
    }
  };

  const isCurrentCompleted = selectedChild
    ? completedSubtopics.has(selectedChild.title)
    : false;

  return (
    <>
      <div className="py-6">
        <div className="mb-5 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-primary shadow-sm shadow-primary/30" />
            <span className="text-xs text-default-500">필수</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full border-2 border-primary/30" />
            <span className="text-xs text-default-500">권장</span>
          </div>
        </div>

        <div className="flex flex-col">
          {data.nodes.map((node, idx) => (
            <RoadmapNodeCard
              key={node.id}
              node={node}
              index={idx}
              isLast={idx === data.nodes.length - 1}
              onSubtopicClick={handleSubtopicClick}
              completedSubtopics={completedSubtopics}
            />
          ))}
        </div>
      </div>

      {/* Subtopic Detail Modal */}
      <Modal
        isOpen={modal.isOpen}
        onOpenChange={modal.onOpenChange}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-2">
                <p className="text-[10px] text-default-400 uppercase tracking-wider font-medium">
                  {selectedNode?.title}
                </p>
                <h2 className="text-lg font-bold">{selectedChild?.title}</h2>
              </ModalHeader>
              <ModalBody className="gap-4 pt-0">
                {/* Matched learning content */}
                {matchedTopic ? (
                  <div>
                    <p className="text-sm leading-relaxed text-default-600 mb-4">
                      {matchedTopic.description}
                    </p>
                    <h3 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">
                      핵심 개념
                    </h3>
                    <div className="flex flex-col gap-2">
                      {matchedTopic.concepts.map((concept, cidx) => (
                        <div
                          key={cidx}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                          <span className="text-default-600">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-default-50 border border-divider p-5">
                    <p className="text-sm text-default-500 text-center">
                      이 항목의 상세 학습 자료가 준비 중입니다.
                      <br />
                      <span className="text-xs text-default-400">
                        직접 노트를 작성하거나 북마크를 추가해보세요.
                      </span>
                    </p>
                  </div>
                )}

                {/* Sibling subtopics */}
                {selectedNode?.children && selectedNode.children.length > 1 && (
                  <div>
                    <h3 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">
                      같은 단계의 다른 항목
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.children
                        .filter((c) => c.id !== selectedChild?.id)
                        .map((sibling) => {
                          const done = completedSubtopics.has(sibling.title);
                          return (
                            <button
                              key={sibling.id}
                              onClick={() => {
                                setSelectedChild(sibling);
                              }}
                              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                                done
                                  ? "border-primary/30 bg-primary/5 text-primary"
                                  : "border-divider text-default-500 hover:border-primary/30"
                              }`}
                            >
                              {done && (
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  className="inline mr-1"
                                >
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              )}
                              {sibling.title}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
                {/* Existing notes for this subtopic */}
                {subtopicNotes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-default-400 uppercase tracking-wider mb-3">
                      내 학습 노트 ({subtopicNotes.length})
                    </h3>
                    <div className="flex flex-col gap-2">
                      {subtopicNotes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-xl bg-default-50 border border-divider p-3"
                        >
                          <p className="text-[10px] text-default-400 mb-1">
                            {new Date(note.createdAt).toLocaleDateString(
                              "ko-KR",
                            )}
                          </p>
                          <p className="text-sm text-default-600 whitespace-pre-wrap">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note writing */}
                <div>
                  {!showNoteInput ? (
                    <Button
                      variant="light"
                      size="sm"
                      radius="lg"
                      className="text-xs"
                      onPress={() => setShowNoteInput(true)}
                      startContent={
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      }
                    >
                      학습 노트 작성
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="이 주제에 대해 학습한 내용을 기록하세요..."
                        value={noteText}
                        onValueChange={setNoteText}
                        variant="flat"
                        radius="lg"
                        minRows={3}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="flat"
                          size="sm"
                          radius="lg"
                          onPress={() => {
                            setShowNoteInput(false);
                            setNoteText("");
                          }}
                        >
                          취소
                        </Button>
                        <Button
                          color="primary"
                          size="sm"
                          radius="lg"
                          isDisabled={!noteText.trim()}
                          onPress={() => {
                            if (
                              !noteText.trim() ||
                              !selectedChild ||
                              !selectedNode
                            )
                              return;
                            addStudyNote({
                              title: selectedChild.title,
                              content: noteText.trim(),
                              category,
                              nodeId: selectedNode.id,
                              nodeTitle: selectedNode.title,
                              subtopicTitle: selectedChild.title,
                            });
                            setNoteText("");
                            setShowNoteInput(false);
                          }}
                        >
                          노트 저장
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" size="sm" radius="lg" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color={isCurrentCompleted ? "default" : "primary"}
                  size="sm"
                  radius="lg"
                  isDisabled={isCurrentCompleted}
                  onPress={handleMarkComplete}
                  startContent={
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  }
                >
                  {isCurrentCompleted ? "학습 완료됨" : "학습 완료"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
