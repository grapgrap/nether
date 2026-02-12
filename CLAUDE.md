# Nether

개인 소프트웨어 프로젝트를 위한 모노레포.

## 개발 철학

이 프로젝트는 컨셉 중심 설계를 따른다.

- **컨셉이 설계의 기본 단위다.** 코드 모듈이 아닌, 사용자가 인지하는 행동 단위(concept)로 소프트웨어를 이해한다.
- **What/Why를 먼저, How는 나중에.** 목적과 경계가 명확해진 후에 구현을 논한다.
- **경계는 배제로 정의한다.** "하지 않는 것"을 명시하여 독립성을 확보한다.
- **결정의 맥락을 보존한다.** 선택뿐 아니라 선택하지 않은 대안과 트레이드오프를 기록한다.
- **확장을 우선한다.** 새로 만들기 전에 기존 컨셉을 확장할 수 있는지 먼저 검토한다.

## 프로젝트 구조

```
nether/
├── packages/
│   ├── blog/                    # 개인 블로그 (React Router, SSR)
│   ├── eslint-config-nether/    # 공유 ESLint 설정
│   ├── tsconfig/                # 공유 TypeScript 설정
│   └── prettier-config/         # 공유 Prettier 설정
└── .claude/.loom/               # Loom 시스템 (컨셉 정의, 템플릿)
```

## Loom 시스템

컨셉을 정의하고 설계하는 문서 체계. 각 패키지는 독립적인 `.loom/` 디렉토리를 가진다.

### 워크플로우

1. **`/loom.specify`** — 요구사항에서 컨셉 도출 (What/Why)
2. **`/loom.design`** — 컨셉의 구현 설계 (How)

### 작업 전 확인

코드를 변경하기 전에 해당 패키지의 `.loom/index.md`를 확인하여 기존 컨셉 구조를 파악한다.

## 기술 스택

- **패키지 매니저**: Yarn 4 (PnP)
- **언어**: TypeScript (strict mode)
- **린팅/포맷팅**: ESLint 9 + Prettier — 공유 설정은 `packages/` 하위에서 관리
- **커밋 훅**: Husky + lint-staged
