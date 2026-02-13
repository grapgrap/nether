# loom 컨셉 인덱스

이 문서는 loom 시스템의 컨셉 구조를 제공합니다.

## 컨셉 목록

| 컨셉 | 설명 |
|------|------|
| [[concept]] | 소프트웨어 설계의 기본 단위 (What/Why) |
| [[decision]] | 컨셉 도출 과정에서 내린 결정 기록 |
| [[scope]] | specify가 동작하는 범위 |
| [[design]] | 컨셉의 구현 방법 (How) |
| [[plan]] | design을 실행 가능한 작업 단위로 분해 |
| [[index]] | 컨셉 목록과 관계 구조를 제공하는 지도 |

## 관계 구조

```
concept (핵심)
├── decision (선택 추적)
├── scope (범위 결정)
├── design (구현 방법, 1:1 대응)
│   └── plan (작업 분해, 비영속)
└── index (목록화)

scope
└── index (scope마다 독립적 index)
```

## 핵심 흐름

1. **specify**: 요구사항 → concept 도출 (What/Why)
2. **design**: concept → design 작성 (How)
3. **plan**: design → 실행 가능한 작업 계획
4. **decision**: 각 단계의 선택을 기록
