# AI의 기억술: LLM 메모리 한계와 미래 아키텍처

사내 기술 발표용 인터랙티브 웹 프레젠테이션

## 🎯 발표 개요

현재 LLM의 메모리 한계부터 GraphRAG, JEPA 등 미래 아키텍처까지 AI 메모리 시스템의 진화를 다루는 발표입니다.

### 주요 내용
1. **현재의 딜레마**: LLM의 컨텍스트 윈도우와 스케일링 법칙의 한계
2. **임시방편의 시대**: RAG, GraphRAG, 모델 라우터 등 Harness들의 등장
3. **진짜 메모리를 향한 여정**: 외부 메모리 시스템 연구의 역사
4. **미래의 두 갈래**: Yann LeCun의 JEPA vs 점진적 진화
5. **결론**: GraphRAG는 디딤돌인가, 막다른 길인가?

## 🚀 실행 방법

### 로컬 서버 실행
```bash
# Python 3 사용
python3 -m http.server 8000

# 또는 Node.js 있다면
npm start
```

브라우저에서 `http://localhost:8000` 접속

### 키보드 단축키
- **방향키**: 슬라이드 이동
- **스페이스바**: 다음 슬라이드
- **ESC**: 슬라이드 오버뷰
- **S**: 스피커 노트 열기
- **F11**: 전체화면
- **Alt + D**: 개발자 통계 (개발 모드)

## 📊 기술 스택

- **Reveal.js**: 웹 기반 프레젠테이션 프레임워크
- **Chart.js**: 인터랙티브 차트 (스케일링 법칙, 컨텍스트 윈도우 등)
- **바닐라 JavaScript**: 커스텀 시각화 및 애니메이션
- **CSS 애니메이션**: 메모리 아키텍처 다이어그램

## 🎨 시각화 요소

### 차트
- 컨텍스트 윈도우 발전 (막대 차트)
- 스케일링 법칙의 한계 (라인 차트)
- GraphRAG 평가 (도넛 차트)

### 다이어그램
- RAG vs GraphRAG 아키텍처 비교
- 모델 라우터 구조
- JEPA 아키텍처
- 뇌 메모리 시스템

### 애니메이션
- 메모리 블록 시각화
- 타임라인 (외부 메모리 시스템 역사)
- 메모리 진화 경로

## 📱 모바일 지원

- 터치 제스처 (스와이프로 슬라이드 이동)
- 반응형 디자인
- 모바일 최적화된 시각화

## 🖨️ PDF 출력

URL에 `?print-pdf` 추가하여 PDF 출력 모드로 전환:
```
http://localhost:8000?print-pdf
```

또는 decktape 사용:
```bash
npm run pdf
```

## 📂 프로젝트 구조

```
ai-tech-talk/
├── index.html              # 메인 프레젠테이션 파일
├── css/
│   └── custom.css          # 커스텀 스타일
├── js/
│   ├── main.js            # Reveal.js 설정 및 메인 로직
│   └── visualizations.js   # 차트 및 시각화
├── assets/
│   ├── images/            # 이미지 파일들
│   └── data/              # 차트 데이터
└── README.md
```

## 🔧 커스터마이징

### 새로운 슬라이드 추가
`index.html`의 `<div class="slides">` 내부에 새로운 `<section>` 추가

### 차트 수정
`js/visualizations.js`에서 해당 차트 함수 수정

### 스타일 변경
`css/custom.css`에서 색상, 애니메이션, 레이아웃 조정

## 📚 참고 자료

### 핵심 논문
- [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361) (OpenAI, 2020)
- [From Local to Global: A Graph RAG Approach](https://arxiv.org/abs/2404.16130) (Microsoft Research, 2024)
- [Hybrid computing using a neural network with dynamic external memory](https://www.nature.com/articles/nature20101) (DeepMind, 2016)

### 기술 자료
- [Microsoft GraphRAG](https://github.com/microsoft/graphrag)
- [LlamaIndex](https://www.llamaindex.ai/)
- [Meta I-JEPA](https://ai.meta.com/blog/i-jepa/)

## 🚀 배포

### GitHub Pages
```bash
npm run deploy
```

### Vercel
1. GitHub 저장소에 푸시
2. Vercel에서 Import
3. 자동 배포 완료

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 👨‍💻 개발자

발표 준비 및 구현에 대한 문의사항이 있으시면 언제든 연락주세요.

---

**Happy Presenting! 🎤✨**