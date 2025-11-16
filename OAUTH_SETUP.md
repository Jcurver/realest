# OAuth 로그인 설정 가이드 (카카오, 구글)

이 문서는 카카오와 구글 OAuth 로그인을 설정하는 방법을 안내합니다.

## 📋 목차

1. [Supabase 대시보드 설정](#1-supabase-대시보드-설정)
2. [카카오 개발자 센터 설정](#2-카카오-개발자-센터-설정)
3. [구글 클라우드 콘솔 설정](#3-구글-클라우드-콘솔-설정)
4. [Supabase에 OAuth 정보 입력](#4-supabase에-oauth-정보-입력)

---

## 1. Supabase 대시보드 설정

### 1.1 Authentication 설정

1. [Supabase 대시보드](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **Authentication** → **Providers** 클릭
4. **Kakao**와 **Google** 제공자를 활성화

### 1.2 Redirect URL 설정

Supabase 대시보드에서 다음 Redirect URL을 추가해야 합니다:

**개발 환경:**
```
http://localhost:3000/auth/callback
```

**프로덕션 환경:**
```
https://your-domain.com/auth/callback
```

설정 위치: **Authentication** → **URL Configuration** → **Redirect URLs**

---

## 2. 카카오 개발자 센터 설정

### 2.1 카카오 앱 등록

1. [카카오 개발자 센터](https://developers.kakao.com/)에 로그인
2. **내 애플리케이션** → **애플리케이션 추가하기** 클릭
3. 앱 이름, 사업자명 입력 후 생성

### 2.2 플랫폼 설정

1. 생성한 앱 선택
2. **앱 설정** → **플랫폼** 메뉴
3. **Web 플랫폼 등록** 클릭
4. 사이트 도메인 입력:
   - 개발: `http://localhost:3000`
   - 프로덕션: `https://your-domain.com`

### 2.3 카카오 로그인 활성화

1. **제품 설정** → **카카오 로그인** 활성화
2. **Redirect URI** 설정:
   ```
   https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback
   ```
   - `[YOUR_SUPABASE_PROJECT_ID]`는 Supabase 프로젝트 URL에서 확인 가능
   - 예: `https://adruyciufkhcpquexahw.supabase.co/auth/v1/callback`

### 2.4 REST API 키 확인

1. **앱 설정** → **앱 키** 메뉴
2. **REST API 키** 복사 (이 값은 Supabase에 입력)

### 2.5 동의 항목 설정

1. **제품 설정** → **카카오 로그인** → **동의항목** 메뉴
2. 필수 동의 항목 설정:
   - **닉네임** (필수)
   - **이메일** (선택, 권장)
   - **프로필 사진** (선택)

---

## 3. 구글 클라우드 콘솔 설정

### 3.1 Google Cloud 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 로그인
2. 상단 프로젝트 선택 드롭다운 → **새 프로젝트** 클릭
3. 프로젝트 이름 입력 후 **만들기** 클릭

### 3.2 OAuth 동의 화면 설정

1. 왼쪽 메뉴 → **API 및 서비스** → **OAuth 동의 화면** 클릭
2. **외부** 선택 후 **만들기** 클릭
3. 다음 정보 입력:
   - **앱 이름**: 원하는 앱 이름
   - **사용자 지원 이메일**: 본인 이메일
   - **앱 로고**: 선택사항
   - **개발자 연락처 정보**: 본인 이메일
4. **저장 후 계속** 클릭
5. **범위** 단계에서 **저장 후 계속** 클릭 (기본 범위 사용)
6. **테스트 사용자** 단계에서 **저장 후 계속** 클릭
7. **요약** 단계에서 **대시보드로 돌아가기** 클릭

### 3.3 OAuth 2.0 클라이언트 ID 생성

1. **API 및 서비스** → **사용자 인증 정보** 클릭
2. 상단 **+ 사용자 인증 정보 만들기** → **OAuth 클라이언트 ID** 선택
3. **애플리케이션 유형**: **웹 애플리케이션** 선택
4. **이름**: 원하는 이름 입력
5. **승인된 리디렉션 URI** 추가:
   ```
   https://[YOUR_SUPABASE_PROJECT_ID].supabase.co/auth/v1/callback
   ```
   - `[YOUR_SUPABASE_PROJECT_ID]`는 Supabase 프로젝트 URL에서 확인 가능
   - 예: `https://adruyciufkhcpquexahw.supabase.co/auth/v1/callback`
6. **만들기** 클릭
7. **클라이언트 ID**와 **클라이언트 보안 비밀번호** 복사 (이 값들은 Supabase에 입력)

### 3.4 OAuth 2.0 API 활성화

1. **API 및 서비스** → **라이브러리** 클릭
2. "Google+ API" 또는 "Identity Toolkit API" 검색 후 활성화
   - 또는 **API 및 서비스** → **사용 설정된 API**에서 확인

---

## 4. Supabase에 OAuth 정보 입력

### 4.1 카카오 설정

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Kakao** 토글 활성화
3. 다음 정보 입력:
   - **Kakao Client ID (REST API Key)**: 카카오 개발자 센터에서 복사한 REST API 키
   - **Kakao Client Secret**: 카카오는 Client Secret이 없으므로 비워둠 (또는 Supabase 문서 확인)

### 4.2 구글 설정

1. Supabase 대시보드 → **Authentication** → **Providers**
2. **Google** 토글 활성화
3. 다음 정보 입력:
   - **Google Client ID**: Google Cloud Console에서 복사한 클라이언트 ID
   - **Google Client Secret**: Google Cloud Console에서 복사한 클라이언트 보안 비밀번호

---

## 5. 테스트

설정이 완료되면 다음을 확인하세요:

1. 개발 서버 실행:
   ```bash
   pnpm run dev
   ```

2. 브라우저에서 로그인 페이지 접속:
   - http://localhost:3000/auth/login

3. 카카오/구글 로그인 버튼 클릭하여 테스트

---

## ⚠️ 주의사항

### 개발 환경 vs 프로덕션 환경

- **개발 환경**: `localhost:3000` 사용
- **프로덕션 환경**: 실제 도메인으로 변경 필요
- 각 환경에 맞게 카카오/구글 앱 설정과 Supabase Redirect URL을 업데이트해야 합니다

### 보안

- Client Secret은 절대 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있어야 합니다

### 문제 해결

- OAuth 로그인이 작동하지 않으면:
  1. Redirect URL이 정확한지 확인
  2. 각 OAuth 제공자 앱의 Callback URL이 Supabase URL과 일치하는지 확인
  3. 브라우저 콘솔과 네트워크 탭에서 에러 확인
  4. Supabase 대시보드의 Authentication 로그 확인
  5. 구글의 경우 OAuth 동의 화면이 "프로덕션" 상태인지 확인 (테스트 모드에서는 제한적)

---

## 📚 참고 자료

- [Supabase OAuth 문서](https://supabase.com/docs/guides/auth/social-login)
- [카카오 로그인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
- [Google OAuth 2.0 가이드](https://developers.google.com/identity/protocols/oauth2)

