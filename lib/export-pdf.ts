import type { StudyNote } from "@/types";

interface NoteGroup {
  date: string;
  notes: StudyNote[];
}

/**
 * 학습 노트를 PDF로 내보내기 (브라우저 인쇄 대화상자 → PDF 저장)
 * html2canvas 없이 순수 HTML로 렌더하므로 oklab 색상 호환 문제 없음
 */
export function exportNotesToPdf(
  categoryLabel: string,
  noteGroups: NoteGroup[],
): void {
  const totalCount = noteGroups.reduce((sum, g) => sum + g.notes.length, 0);
  const today = new Date().toLocaleDateString("ko-KR");

  const notesHtml = noteGroups
    .map(
      (group) => `
      <div style="margin-bottom:28px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="background:#f0f0f0;color:#333;font-size:12px;font-weight:600;padding:4px 12px;border-radius:8px;">${group.date}</span>
          <div style="flex:1;height:1px;background:#e5e5e5;"></div>
        </div>
        ${group.notes
          .map(
            (note) => `
          <div style="border:1px solid #e5e5e5;border-radius:12px;padding:16px 20px;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="font-size:14px;font-weight:700;color:#1a1a1a;">${escapeHtml(note.title)}</span>
              ${
                note.subtopicTitle
                  ? `<span style="font-size:10px;color:#888;background:#f5f5f5;padding:2px 8px;border-radius:6px;">${escapeHtml(note.nodeTitle || "")} &gt; ${escapeHtml(note.subtopicTitle)}</span>`
                  : ""
              }
            </div>
            <p style="font-size:13px;color:#444;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(note.content)}</p>
          </div>`,
          )
          .join("")}
      </div>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>${categoryLabel} 학습 노트</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 20mm 15mm; }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #e5e5e5; }
    .header h1 { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .header p { font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(categoryLabel)} 학습 노트</h1>
    <p>총 ${totalCount}개의 노트 | 내보내기: ${today}</p>
  </div>
  ${notesHtml}
  <script>window.onafterprint=()=>window.close();window.print();<\/script>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("팝업이 차단되었습니다. 팝업을 허용한 후 다시 시도해주세요.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
