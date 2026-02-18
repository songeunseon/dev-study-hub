import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-2">개인정보 처리방침</h1>
      <p className="text-sm text-default-400 mb-8">
        최종 수정일: 2025년 2월 18일
      </p>

      <div className="prose prose-sm max-w-none flex flex-col gap-8 text-default-600">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            1. 수집하는 개인정보
          </h2>
          <p className="text-sm leading-relaxed">
            Dev Study Hub(이하 &quot;서비스&quot;)은 회원가입 및 서비스 이용을
            위해 다음의 개인정보를 수집합니다.
          </p>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              이메일 주소 (로그인 및 비밀번호 재설정)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              이름/닉네임 (서비스 내 표시용)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              Google 계정 정보 (소셜 로그인 시 Google에서 제공하는 프로필 정보)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            2. 개인정보의 이용 목적
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              회원 식별 및 로그인 인증
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              학습 데이터(노트, 북마크, 퀴즈, 할 일) 저장 및 관리
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              서비스 개선 및 사용자 경험 향상
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            3. 개인정보의 보유 및 파기
          </h2>
          <p className="text-sm leading-relaxed">
            회원 탈퇴 시 수집된 개인정보는 즉시 파기됩니다. 단, 관련 법령에 의해
            보존이 필요한 경우 해당 기간 동안 보관 후 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            4. 개인정보의 제3자 제공
          </h2>
          <p className="text-sm leading-relaxed">
            서비스는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.
            다만, 이용자의 동의가 있거나 법령에 의한 경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            5. 개인정보의 안전성 확보
          </h2>
          <p className="text-sm leading-relaxed">
            서비스는 Firebase Authentication을 통해 비밀번호를 안전하게
            암호화하여 저장하며, HTTPS 프로토콜을 사용하여 데이터를 전송합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            6. 이용자의 권리
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              개인정보 열람, 수정, 삭제를 요청할 수 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
              회원 탈퇴를 통해 개인정보 처리 정지를 요청할 수 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            7. 쿠키 사용
          </h2>
          <p className="text-sm leading-relaxed">
            서비스는 로그인 세션 유지 및 테마 설정 저장을 위해 브라우저의 로컬
            스토리지와 쿠키를 사용합니다.
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
