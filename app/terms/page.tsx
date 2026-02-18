import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-2">이용약관</h1>
      <p className="text-sm text-default-400 mb-8">
        최종 수정일: 2025년 2월 18일
      </p>

      <div className="prose prose-sm max-w-none flex flex-col gap-8 text-default-600">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제1조 (목적)
          </h2>
          <p className="text-sm leading-relaxed">
            본 약관은 Dev Study Hub(이하 &quot;서비스&quot;)이 제공하는 학습
            관리 서비스의 이용에 관한 조건 및 절차, 이용자와 서비스 간의 권리와
            의무를 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제2조 (서비스의 내용)
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            서비스는 다음의 기능을 제공합니다.
          </p>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              프론트엔드, 백엔드, 서버, 네트워크 분야의 학습 로드맵 및 기초 자료
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              학습 노트 작성 및 관리
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              북마크 저장 및 관리
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              퀴즈 생성 및 복습
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              학습 플래너(할 일 관리)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제3조 (회원가입 및 계정)
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              이용자는 이메일 또는 Google 계정을 통해 회원가입할 수 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              이용자는 정확한 정보를 제공해야 하며, 타인의 정보를 사용해서는 안
              됩니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              계정의 보안 관리는 이용자 본인의 책임입니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제4조 (이용자의 의무)
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            이용자는 다음 행위를 해서는 안 됩니다.
          </p>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              서비스를 이용하여 불법적인 활동을 수행하는 행위
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              서비스의 운영을 방해하거나 시스템에 부하를 주는 행위
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              타인의 개인정보를 무단으로 수집하거나 이용하는 행위
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제5조 (서비스 변경 및 중단)
          </h2>
          <p className="text-sm leading-relaxed">
            서비스는 운영상 또는 기술적 필요에 따라 서비스의 전부 또는 일부를
            변경하거나 중단할 수 있습니다. 이 경우 사전에 공지하도록 노력합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제6조 (면책)
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              서비스는 무료로 제공되며, 서비스 이용으로 인해 발생하는 손해에
              대해 책임을 지지 않습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              이용자가 작성한 콘텐츠(노트, 퀴즈 등)에 대한 책임은 이용자
              본인에게 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            제7조 (회원 탈퇴)
          </h2>
          <p className="text-sm leading-relaxed">
            이용자는 언제든지 회원 탈퇴를 요청할 수 있으며, 탈퇴 시 모든
            개인정보와 학습 데이터는 즉시 삭제됩니다.
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-divider pt-6">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
