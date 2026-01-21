# 2026-01-22-post-concept-definition

## 맥락

기존 blog 코드베이스를 리버스 엔지니어링하여 컨셉 문서를 정리하는 과정에서, 핵심 도메인 개념의 구조를 정의할 필요가 있었다.

코드에서 발견된 주요 구조:
- `Post` 타입 (slug, metadata, contents)
- `PostMetadata` 타입 (slug, title, tags, isDraft, publishedDate)
- 마크다운 파싱 파이프라인
- 테마/스타일링 시스템

## 결정 내용

**Post를 단일 핵심 컨셉으로 정의하고, Metadata와 Content를 하위 컨셉으로 내포한다.**

### 제약 조건

- 현재 코드에서 Post, Metadata, Content는 항상 함께 다뤄진다
- 독립적으로 존재하는 Metadata나 Content가 없다

### 전제 조건

- Post는 블로그의 유일한 콘텐츠 단위이다
- Metadata와 Content는 Post 없이 의미가 없다

## 대안

### Metadata와 Content를 독립 컨셉으로 분리

- 설명: Post, Metadata, Content를 각각 별도의 컨셉 문서로 관리
- 트레이드오프: 현재 규모에서는 과도한 분리. 세 개념이 항상 함께 움직이므로 별도 문서화의 이점이 없음

### 파싱 파이프라인을 별도 컨셉으로 정의

- 설명: 마크다운 → HTML 변환 과정을 Parser 컨셉으로 분리
- 트레이드오프: 파싱은 "어떻게(How)" 구현하는가에 해당. 컨셉이 아닌 설계(/loom.design) 영역

### 테마/스타일링을 컨셉으로 정의

- 설명: Theme 컨셉을 별도로 문서화
- 트레이드오프: 블로그의 핵심 도메인이 아님. 현재 단순한 구조이므로 문서화 가치 낮음

## 영향받는 컨셉

- [[../concepts/post]] - 이 결정에 의해 정의됨
