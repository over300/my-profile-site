# 개발자 포트폴리오 웹사이트

> 모던하고 반응형 웹 기술을 활용한 개인 개발자 포트폴리오 웹사이트

HTML5, CSS3, JavaScript(ES6+), TailwindCSS를 활용하여 제작된 전문가적인 개발자 포트폴리오입니다. 다크 모드, 부드러운 애니메이션, 최적화된 성능으로 최고의 사용자 경험을 제공합니다.

## 🌟 주요 기능

- **반응형 디자인**: 모든 기기(데스크탑, 태블릿, 모바일)에 최적화
- **다크 모드**: 라이트/다크 테마 자동 전환
- **부드러운 애니메이션**: 스크롤 기반 fade-in 애니메이션
- **모던 UI**: 프로페셔널한 MLB Statcaster 스타일 디자인
- **최적화된 성능**: 빠른 로딩 속도와 부드러운 인터랙션
- **SEO 친화적**: 의미있는 HTML 구조와 메타 태그

## 📋 기술 스택

- **마크업**: HTML5
- **스타일링**: CSS3 + TailwindCSS
- **상호작용**: Vanilla JavaScript (ES6+)
- **배포**: GitHub Pages / Netlify / Vercel

## 📁 프로젝트 구조

```
my-profile-site/
├── index.html              # 메인 포트폴리오 페이지
├── style.css               # 커스텀 CSS 및 애니메이션
├── script.js               # 인터랙티브 기능
├── img/
│   ├── profile.png         # 프로필 사진
│   ├── project1.png        # 프로젝트 이미지 1
│   ├── project2.png        # 프로젝트 이미지 2
│   └── project3.png        # 프로젝트 이미지 3
├── README.md               # 프로젝트 문서
└── ROADMAP.md              # 개발 계획
```

## 🚀 시작하기

### 필수 요구사항
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 코드 에디터 (VS Code 권장)

### 로컬 개발

#### 방법 1: Python 내장 서버 사용
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

#### 방법 2: Node.js 사용
```bash
# npm으로 간단한 서버 설치
npm install -g http-server

# 서버 실행
http-server -p 8000
```

http://localhost:8000 에서 포트폴리오를 확인할 수 있습니다.

## 📝 커스터마이징

### 개인 정보 수정

**index.html**에서 다음 부분을 수정하세요:

1. **기본 정보**: "본인 이름" 및 직책 변경
2. **프로필 이미지**: `img/profile.png` 교체
3. **프로젝트**: 프로젝트 이름, 설명, 이미지, 링크 업데이트
4. **연락처**: 이메일, 깃허브, 링크드인 등 정보 추가

### 색상 커스터마이징

**style.css**의 CSS 변수를 수정하세요:

```css
:root {
  --accent-primary: #000000;  /* 프라이머리 색상 */
  --accent-secondary: #333333; /* 세컨더리 색상 */
}
```

### 폰트 변경

**index.html** head 섹션에서 Google Fonts 링크를 수정하세요.

## 📱 반응형 디자인

- **모바일** (< 768px): 단일 열 레이아웃, 햄버거 메뉴
- **태블릿** (768px - 1024px): 2열 그리드
- **데스크탑** (> 1024px): 최적화된 3열 그리드

## 🎨 디자인 특징

- **클린 미니멀리스트 디자인**: 깔끔하고 프로페셔널한 외관
- **일관된 타이포그래피**: Inter 폰트 사용으로 현대적 느낌
- **효과적인 색상 대비**: 접근성을 고려한 색상 조합
- **미묘한 애니메이션**: UX를 방해하지 않는 부드러운 전환

## 🚀 배포

### GitHub Pages
```bash
# gh-pages 브랜치에 배포
git push origin main
```

### Netlify
드래그 앤 드롭으로 `my-profile-site` 폴더를 Netlify에 업로드하세요.

### Vercel
```bash
npm install -g vercel
vercel
```

## 📊 성능 최적화

- 이미지 최적화 (WebP 형식 권장)
- CSS와 JavaScript 최소화
- 레이지 로딩 지원
- 캐시 활용

## 📖 자세한 계획

개발 로드맵과 향후 계획은 [ROADMAP.md](./ROADMAP.md)를 참고하세요.

## 🤝 기여

개선 사항이나 버그 리포트는 이슈를 열어주세요.

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 💡 팁

- SEO 최적화: OpenGraph 메타 태그 추가 고려
- 성능: Lighthouse로 성능 체크
- 접근성: WCAG 2.1 AA 준수
- 크로스 브라우저 테스트 권장

---

**마지막 업데이트**: 2026년 3월
