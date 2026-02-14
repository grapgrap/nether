# /loom.plan - 설계 또는 외부 스펙에서 구현 계획 수립

설계 또는 외부 스펙을 기반으로 구현 계획을 수립합니다.
**Claude의 plan mode를 래핑하며, 역방향일 때 concept/design/decision을 함께 생성합니다.**

## 워크플로우

1. Scope 확인
2. 맥락 파악 및 방향 판단
3. Plan mode 진입
4. 산출물 생성 (역방향인 경우)

## 지시사항

### 1단계: Scope 확인

[[scope]]를 확인합니다. 이전 대화에서 이어지는 경우 동일한 scope를 사용합니다.

**방법**:

- 이전 대화에서 scope가 확정된 경우: 그대로 사용
- 명시적 지정: `/loom.plan {서비스명}`으로 직접 지정
- 암시적 추론: 요구사항 맥락에서 서비스 추론

**모노레포 구조**:

```
monorepo/
├── .claude/.loom/templates/  # 템플릿
└── packages/
    └── {서비스명}/.loom/     # ← Scope별 .loom/
```

### 2단계: 맥락 파악 및 방향 판단

해당 scope의 기존 loom 문서를 탐색하고, 사용자의 의도에 따라 방향을 판단합니다.

1. **기존 문서 탐색**: `.loom/index.md`, `.loom/concepts/`, `.loom/designs/` 확인
2. **사용자에게 방향 확인**:
   - 기존 concept/design이 있는 경우: 이를 기반으로 할지, 외부 스펙으로 시작할지 확인
   - 기존 concept/design이 없는 경우: 외부 스펙 입력 방식 확인

**방향 정의**:

| 방향 | 조건 | 동작 |
|------|------|------|
| **정방향** | 기존 design을 기반으로 작업 분해 | 맥락 주입 후 plan mode 진입 |
| **역방향** | 외부 스펙을 기반으로 시작 | plan mode 진입 후 loom 산출물 생성 |

**외부 스펙 입력**: 대화로 설명, 문서 URL/파일, MCP를 통한 가져오기 등 형태에 제한 없음

### 3단계: Plan mode 진입

Claude의 plan mode로 진입하여 구현 계획을 수립합니다.

**정방향**:

1. concept, design, decision 문서를 읽어 맥락으로 주입
2. plan mode 진입
3. design의 모델링, 데이터 흐름, 비즈니스 로직을 기반으로 작업 분해

**역방향**:

1. 외부 스펙을 파악
2. plan mode 진입
3. 작업 분해 과정에서 핵심 개념과 설계 판단을 기록해둠

**공통**:

- 작업은 **코드 초안을 작성할 수 있을 정도**의 단위로 분해
- 작업 간 선후 관계와 의존성을 정리하여 단계적으로 나열
- 병렬 진행 가능한 작업은 별도로 표기 (연관관계의 강도를 드러내는 장치)
- 구현 계획은 plan mode가 관리 (워크스페이스 바깥)

### 4단계: 산출물 생성 (역방향인 경우)

plan이 완료된 후, 역방향이었다면 작업 분해 과정에서 파악된 내용을 loom 문서로 생성합니다.

**생성 파일**:

```
{scope}/.loom/concepts/{컨셉명}.md
{scope}/.loom/designs/{컨셉명}.md
{scope}/.loom/decisions/{YYYY-MM-DD}-{요약}.md
{scope}/.loom/index.md (인덱스 업데이트)
```

**템플릿**:

- concept 문서: `.claude/.loom/templates/concept.md`
- design 문서: `.claude/.loom/templates/design.md`
- decision 문서: `.claude/.loom/templates/decision.md`

**산출물 생성 원칙**:

- concept: plan 과정에서 파악된 핵심 개념의 What/Why를 정리
- design: plan 과정에서 이뤄진 설계 판단의 How를 정리
- decision: plan 과정에서 내린 선택과 대안, 트레이드오프를 기록
- 사용자와 대화를 통해 산출물 내용을 확인한 후 생성

## 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **도구로서 존재** | 워크플로를 강제하지 않고 사용자 의도에 따름 |
| **방향은 사용자가 결정** | 기존 문서 존재 여부를 알려주되, 최종 판단은 사용자 |
| **plan mode 래퍼** | 구현 계획 자체는 Claude plan mode에 위임 |
| **역방향 산출물** | plan 완료 후 concept/design/decision을 남김 |

## 참고

- 컨셉 참조: `[[컨셉명]]` 형식 Wiki link
- Decision 연결: `[[YYYY-MM-DD-요약]]` 형식
- 정방향은 `/loom.design` 완료 후 핸드오버로 시작할 수 있음

$ARGUMENTS
