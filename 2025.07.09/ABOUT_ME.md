# 장한별
> JavaScript / TypeScript, Ruby 기반의 풀스택 개발자

---

## CONTACT

- **Email:** <j.1star.0726@gmail.com>
- **Phone:** 010-5155-6821
- **GitHub:** <https://github.com/J1STAR>
- **LinkedIn:** <https://www.linkedin.com/in/hanbyeol-jang-44174a199/>

---

## SUMMARY

130만 명 이상의 회원이 사용하는 대규모 취업 플랫폼 '자소설닷컴'의 핵심 개발자로, 서비스의 전반적인 아키텍처를 설계하고 최적화해왔습니다. Ruby on Rails 기반의 안정적인 백엔드 API부터 React, Next.js를 활용한 프론트엔드 개발, 그리고 AWS 기반의 인프라 구축 및 자동화까지, 서비스의 전체 생명 주기를 책임지는 풀스택 역량을 보유하고 있습니다.

특히, Sentry, NewRelic 등 모니터링 도구를 활용해 이슈를 선제적으로 파악하고 해결하여 안정적인 서비스 품질을 확보하는 데 주력했습니다. 기획, 디자인 등 비개발 부서와 긴밀하게 협업하며 기술적 허들을 해소하는 '가교' 역할을 수행, 효율적인 프로젝트 완수를 이끌었습니다. 코드 리뷰와 기술 공유를 통해 동료와 함께 성장하는 문화를 만드는 데 기여하였습니다.

현재 Microsoft AI School 과정을 통해 Python, Azure AI 서비스, 딥러닝 등 AI 기술 역량을 확장하고 있으며, 머신러닝 기반 추천 시스템 개발 프로젝트를 진행하여 AI 엔지니어링 실무 경험을 쌓고 있습니다. 기존 웹 개발 전문성과 AI 기술을 결합하여 차세대 지능형 서비스 구축에 기여하고자 합니다.

---

## SKILLS

- **Languages:** TypeScript, JavaScript, Ruby, Python, HTML/CSS
- **Frontend:** React, Next.js, AngularJS
- **Backend:** Ruby on Rails, FastAPI
- **Infrastructure & DevOps:** AWS (EC2, ECS, S3, RDS, CloudFront, Elastic Beanstalk, Route53), Docker, Nginx
- **Databases:** MySQL, Redis, SQLite
- **AI/ML:** PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Matplotlib
- **Azure AI Services:** Azure OpenAI, Azure Speech Services, Azure Document Intelligence, Azure Custom Vision
- **Monitoring & Analytics:** Sentry, NewRelic, Google Analytics, Google BigQuery
- **Collaboration & Tools:** Git, Slack, Figma, Notion

---

## EXPERIENCE

### **주식회사 앵커리어 (자소설닷컴) | 웹 개발자**
*2020.02 - 2024.09*

#### 서비스 성능 및 사용자 경험 최적화
- **Situation:** 서비스의 핵심 페이지가 낮은 성능 점수(Lighthouse 평균 40점)와 느린 로딩 속도로 인해 사용자 경험과 SEO에 부정적인 영향을 미치고 있었습니다.
- **Task:** Lighthouse 점수, 페이지 로딩 속도, SEO 지표를 개선하여 전반적인 서비스 성능을 향상시키는 것을 목표로 삼았습니다.
- **Action:** 성능 최적화 이니셔티브를 주도하여 Lighthouse로 성능을 분석하고, webp 변환 파이프라인과 AWS CloudFront 캐싱을 도입하여 이미지를 최적화했습니다. 또한, 메타 태그와 페이지 구조를 개선하여 SEO를 강화했습니다.
- **Result:** Lighthouse 성능 점수를 평균 40점에서 70점 이상으로 상향시켰고, 검색엔진 최적화 점수를 90-100점으로 끌어올렸습니다. 평균 이미지 용량을 40% 줄여 페이지 로딩 속도를 평균 20% 개선하는 성과를 달성했습니다.

#### 개발 생산성 향상을 위한 CI/CD 파이프라인 구축
- **Situation:** 기존 배포 프로세스는 EC2 인스턴스 수동 업데이트에 의존하여 시간이 많이 소요되고 인적 오류의 위험이 높았습니다.
- **Task:** 배포 파이프라인을 자동화하여 효율성을 높이고, 배포 시간을 단축하며, 운영 리스크를 최소화하고자 했습니다.
- **Action:** AWS ECS와 Docker를 활용한 컨테이너 기반의 CI/CD 파이프라인을 설계하고 구축했습니다. GitHub Actions를 통해 에셋 프리컴파일과 같은 반복 작업을 자동화하여 전체 프로세스를 간소화했습니다.
- **Result:** 수동 배포에 소요되던 시간을 80% 단축하여 기능 출시 주기를 가속화하고 개발팀의 생산성을 크게 향상시켰습니다.

#### 선제적 이슈 해결 및 서비스 안정성 확보
- **Situation:** NewRelic 모니터링을 통해 특정 API에서 N+1 쿼리 문제로 인한 성능 저하가 발생하고 있음을 발견했습니다. 이는 서비스 안정성에 직접적인 위협이 되었습니다.
- **Task:** API 성능 저하의 근본 원인을 파악하고 해결하여 서비스 안정성을 확보하는 것이 시급한 과제였습니다.
- **Action:** Sentry와 NewRelic을 적극적으로 활용하여 시스템 이슈를 선제적으로 추적했습니다. 특히 NewRelic의 트랜잭션 추적 기능으로 N+1 쿼리의 원인을 정확히 찾아내고, Ruby on Rails 코드를 리팩토링하여 쿼리를 최적화했습니다.
- **Result:** N+1 쿼리 문제를 성공적으로 해결하여 API 응답 시간을 크게 개선하고 데이터베이스 부하를 줄여 서비스 전반의 안정성을 강화했습니다.

#### 부서 간 협업 리딩 및 커뮤니케이션
- **Situation:** 프로젝트 진행 시 개발, 기획, 디자인팀 간의 기술적 이해도 차이로 인해 커뮤니케이션 비효율이 발생하곤 했습니다.
- **Task:** 부서 간의 원활한 소통을 촉진하고 기술적, 비기술적 요구사항을 조율하여 프로젝트 효율을 극대화하는 역할을 맡았습니다.
- **Action:** 기획, 디자인 회의에 적극적으로 참여하여 기술적 제약을 비전문가가 이해하기 쉬운 언어로 설명하는 '가교' 역할을 수행했습니다. Sentry, NewRelic을 통해 발견된 이슈가 사용자 경험에 미치는 영향을 구체적인 데이터와 함께 공유하여 부서 간의 공감대를 형성하고 해결 우선순위를 정하는 데 기여했습니다.
- **Result:** 오해와 재작업을 최소화하여 프로젝트 개발 속도를 높였고, 모든 이해관계자가 만족하는 기술적으로 완성도 높은 결과물을 도출하는 데 핵심적인 역할을 했습니다.

---

## PROJECTS

### 세션 기반 상품 추천 시스템 개발
*(2025.05.30 - 2025.06.13)*
- **Overview:** 대규모 이커머스 데이터를 활용하여 사용자의 세션 기록을 기반으로 다음에 관심을 가질 만한 상품을 예측하는 추천 시스템의 백엔드 API를 개발했습니다. FastAPI를 사용하여 비동기 처리와 높은 성능을 확보했으며, PyTorch로 구현된 GRU4Rec 모델을 서빙하여 실시간 추천을 제공합니다.
- **My Role & Contributions:**
    - FastAPI를 사용하여 추천 API 서버의 전체 아키텍처를 설계하고 개발했습니다.
    - PyTorch 기반의 GRU4Rec 모델을 서빙하고, 사용자 행동 데이터를 실시간으로 추론하여 추천 결과를 생성하는 로직을 구현했습니다.
    - Azure Blob Storage에서 데이터를 효율적으로 로딩하고 전처리하는 파이프라인을 구축했습니다.
    - 사용자 행동 추적, 상품 검색, 비동기 추천 요청 등 다양한 API 엔드포인트를 개발했습니다.
    - FastAPI의 `BackgroundTasks`를 활용하여 비동기 추천 작업을 관리하고, 작업 상태(pending, completed, failed)를 추적하는 시스템을 직접 구현했습니다.
    - SQLite를 사용하여 사용자 행동과 추천 작업 상태를 영구적으로 관리했습니다.
    - 상세한 로깅 시스템을 구축하여 시스템의 모든 동작과 에러를 추적하고 디버깅 효율을 높였습니다.
- **Tech Stack:** Python, FastAPI, PyTorch, Pandas, NumPy, Scikit-learn, SQLite, Azure, Playwright
- **GitHub:**
    - [Backend Repository](https://github.com/7-MSAI-7/mercari-recommender-backend)
    - [Model Repository](https://github.com/7-MSAI-7/GRU4Rec-Mercari)

### 자소설닷컴 바로지원 서비스 런칭
*(2024.05 - 2024.07)*
- **Overview:** 기업과 지원자 간의 채용 프로세스를 간소화하고 접근성을 개선하는 신규 서비스를 개발했습니다. 기업에서 원하는 정보를 지원자에게 직접 제공받을 수 있는 기능을 제공하고, 지원자의 채용 지원 프로세스를 간소화하여 편의성을 향상시켰습니다.
- **My Role & Contributions:**
    - 풀스택 개발자로서 서비스의 End-to-End 개발을 주도했습니다.
    - **Backend:** Ruby on Rails를 사용하여 기업별 맞춤형 지원서 양식을 위한 핵심 API를 구현하고, MySQL 데이터 모델을 설계했습니다.
    - **Frontend:** Next.js와 TypeScript로 반응형 지원서 작성 및 관리 페이지를 개발하여 PC와 모바일에서 일관된 사용자 경험을 제공했습니다.
- **주요 기능:**
    - **기업 맞춤형 서비스 제공:**
        - 지원자 정보 커스터마이징 (이름, 생년월일, 이메일, 보훈 여부, 자격증, 경력 등)
        - 자기소개서 질문 설정 기능
        - 첨부 파일 요구사항 지정
        - 지원서 목록 다운로드 기능
    - **지원자 채용지원 간소화 및 편의성 향상:**
        - 웹 및 모바일 앱에서 바로 지원 가능한 반응형 플랫폼
        - 기존 '자소설닷컴' 자기소개서 재활용 기능
        - 지원서 작성 중 실시간 자동 저장 기능
- **Tech Stack:** Ruby on Rails, Next.js, TypeScript, MySQL, AWS

### 자소설닷컴 데이터랩 페이지 개선
*(2023.11 - 2023.12)*
- **Overview:** 취업 준비생에게 실용적인 인사이트를 제공하는 데이터 분석 페이지의 UI/UX 및 SEO를 개선하여 사용자 유입 증대를 목표로 했습니다. 기존 데이터랩 목록 및 상세 페이지 개선을 통해 검색 엔진 노출도를 향상시키고 사용자 유입 증대를 꾀했습니다.
- **My Role & Contributions:**
    - 기존 데이터랩 목록 및 상세 페이지의 UI/UX를 개선하고 사용자 편의성을 높였습니다.
    - **SEO:** 페이지별 고유 메타 태그(Title, Description, Open Graph) 최적화를 통해 검색 엔진 노출도를 크게 향상시켰습니다.
    - **Full-Stack:** Ruby on Rails로 백엔드 데이터를 제공하고, Next.js와 TypeScript로 프론트엔드 동적 기능을 구현했습니다.
- **주요 기능:**
    - **실시간 지원자 정보 분석:**
        - 동적 대시보드를 통한 지원자 수 집계 및 시각화
        - 가장 많이 지원한 기업 및 직무 분석
        - 평균 지원자 수 산출 및 트렌드 분석
    - **합격 데이터 분석 및 제공:**
        - 기업별/직무별 최종 합격 데이터 분석 및 제공
        - 유용한 합격 후기 선별 및 추천
    - **인기 기업 분석:**
        - 실시간 인기 기업 순위 데이터 제공
    - **데이터랩 상세 페이지 개선:**
        - 메타 데이터 및 페이지별 고유 태그 설정 최적화
        - 소셜 미디어 공유 최적화를 위한 Open Graph 태그 구현
- **Tech Stack:** Ruby on Rails, Next.js, TypeScript, MySQL, AWS

---

## ACTIVITIES & EDUCATION

- **Microsoft AI School** (2025.04 - 현재)
  - https://j1star.github.io/microsoft-ai-school/ 
    - Python 기반 AI 개발 전문 과정 수강 (데이터 분석, 머신러닝, 딥러닝, Azure AI 서비스)
    - 대규모 이커머스 데이터 기반 추천 시스템 개발 / GRU 기반 세션 추천 모델 구현
      - https://github.com/7-MSAI-7/GRU4Rec-Mercari
      - https://github.com/7-MSAI-7/mercari-recommender-backend
    - Azure OpenAI, Speech Services, Document Intelligence 등 클라우드 AI 서비스 활용
    - 멀티모달 AI 애플리케이션 개발 (실시간 객체 탐지, 음성 인터페이스, 이미지 분석)
- **삼성 청년 SW 아카데미 (SSAFY) 1기 수료** (2018.12 - 2019.12)
- **충남대학교 컴퓨터공학과 졸업** (2010.03 - 2016.08)
