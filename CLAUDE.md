# CLAUDE.md

## 개요

Yarn Berry 모노레포. 패키지들은 `packages/` 하위에 위치하며, 공유 설정 패키지(ESLint, Prettier, TypeScript)를 워크스페이스로 관리한다.

## 명령어

```bash
yarn install                          # 의존성 설치
yarn --cwd packages/{패키지} dev      # 개발 서버
yarn --cwd packages/{패키지} build    # 프로덕션 빌드
yarn --cwd packages/{패키지} lint     # ESLint 실행
```

## 패키지 매니저

- Yarn 4 PnP — `node_modules` 없음
- 워크스페이스 참조: `workspace:^`
- 모든 패키지 ESM (`"type": "module"`)

## 코드 컨벤션

- TypeScript strict 모드 (noUnusedLocals, noUnusedParameters, noUncheckedIndexedAccess, verbatimModuleSyntax)
- 타입 전용 임포트는 `import type` 사용
- 런타임 경계에서 Zod 스키마로 검증

## 린팅 & 포매팅

- ESLint v9 flat config (`eslint-config-nether` 공유 패키지)
- Prettier: trailing comma es5, semi, tabWidth 2, printWidth 100, LF
- 커밋 시 Husky + lint-staged가 자동으로 ESLint --fix와 Prettier --write 실행

## Loom 시스템

이 프로젝트의 설계 철학은 **컨셉 기반 설계**다. Loom은 이를 체계화하는 시스템이다.

### 핵심 원칙

- **What/Why와 How를 분리한다.** 컨셉(concept)은 "무엇을, 왜" 하는지를 정의하고, 설계(design)는 "어떻게" 구현하는지를 다룬다.
- **컨셉은 사용자가 인지하는 행동 단위다.** 코드나 모듈이 아닌, 사용자 관점의 추상적 개념을 기준으로 설계한다.
- **결정의 맥락을 보존한다.** 모든 선택은 decision으로 기록하여 "왜 이렇게 결정했는가"를 추적한다.

### 구조

```
{scope}/.loom/
├── index.md              # 컨셉 목록과 관계 구조 (지도)
├── concepts/{컨셉명}.md  # 컨셉 정의 (What/Why)
├── designs/{컨셉명}.md   # 구현 설계 (How), concept과 1:1 대응
└── decisions/{날짜}-{요약}.md  # 결정 기록
```

- Loom 시스템 자체의 정의: `.claude/.loom/`
- 각 패키지의 도메인 컨셉: `packages/{패키지}/.loom/`
- 템플릿: `.claude/.loom/templates/`

### 컨셉 문서의 4요소

| 요소 | 설명 |
|------|------|
| 목적 (Purpose) | 왜 이 컨셉이 존재하는가 |
| 동작 원리 (Operational Principle) | 어떻게 목표를 달성하는가 |
| 경계 (Boundary) | 의도적으로 하지 않기로 결정한 것 |
| 관계 (Relation) | 다른 컨셉과의 연결 |

### 워크플로우

1. **`/loom.specify`**: 요구사항 분석 → concept 도출 (What/Why)
   - scope 결정 → 요구사항 분석 → 대화로 컨셉 명확화 → 산출물 생성
   - 기존 컨셉 확장을 먼저 검토하고, 필요할 때만 신규 컨셉을 도출한다
   - 사용자가 구현(How)을 이야기하기 시작하면 `/loom.design`으로 전환

2. **`/loom.design`**: concept → design 작성 (How)
   - 대응하는 concept이 반드시 있어야 한다
   - 모델링, 데이터 흐름, 비즈니스 로직 수준의 설계
   - 상세 코드 구현은 다루지 않는다

3. **`/loom.plan`**: design 또는 외부 스펙 → 구현 계획 수립
   - Claude plan mode를 래핑하여 동작한다
   - 정방향: 기존 design을 기반으로 작업 분해에 집중
   - 역방향: 외부 스펙(대화, 문서, MCP 등)을 기반으로 작업 분해 + concept/design/decision 생성
   - 방향은 기존 loom 문서 존재 여부를 참고하되, 사용자가 결정한다

4. **decision**: 각 단계에서 내린 선택과 대안, 트레이드오프를 기록

### AI 어시스턴트를 위한 안내

- **새 기능을 구현하기 전에** 해당 scope의 `.loom/index.md`를 먼저 읽어 기존 컨셉 구조를 파악할 것
- **컨셉 문서가 있으면 반드시 참고할 것.** 코드보다 컨셉 문서가 설계 의도를 더 정확히 담고 있다
- **design 문서가 있으면 구현의 가이드로 삼을 것.** 모델링과 데이터 흐름을 따른다
- **decision 문서를 참고하여** 이미 검토하고 기각한 대안을 다시 제안하지 않도록 할 것
- **컨셉 간 관계는 `[[컨셉명]]` Wiki link로 표현한다**
- **컨셉을 수정하거나 새로 만들 때는 사용자와 대화를 통해 진행할 것.** 임의로 컨셉을 생성하지 않는다
