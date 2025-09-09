### 📂 Project 보기: [project-ares-interview/ares-frontend](https://github.com/project-ares-interview/ares-frontend/tree/feature/cover-letter-and-resume)

# 📅 2025년 9월 9일: `ares-frontend` 이력서 및 자기소개서 관리 기능 아키텍처 및 구현

## 📝 작성 의도

본 문서는 구직 활동의 핵심 요소인 **이력서와 자기소개서를 사용자가 직접 생성하고 체계적으로 관리할 수 있는 종합 관리 시스템의 아키텍처 설계와 그 구현 과정**을 기록하는 것을 목표로 합니다. 이 기능은 단순히 정보를 입력하는 것을 넘어, 복잡한 데이터(학력, 경력 등)를 섹션별로 명확하게 분리하고, 일관된 사용자 경험(UX)을 제공하여 데이터의 정확성과 사용성을 극대화하는 데 중점을 두었습니다.

이를 위해 **기능별로 독립된 상태 관리(Zustand), 재사용 가능한 모듈식 컴포넌트 설계, 그리고 동적 폼 유효성 검사**와 같은 전략을 적용했습니다. 이 문서는 이러한 설계가 어떻게 복잡한 UI 로직을 단순화하고, 기존 '마이페이지' 기능과의 데이터 모델 일관성을 유지하며, 향후 다양한 이력서 항목 추가에 유연하게 대응할 수 있는 확장 가능한 구조를 만들었는지 구체적인 코드와 함께 설명합니다.

## 🏛️ 구현 의도 및 아키텍처 전략

이력서와 자기소개서 기능은 각각 여러 하위 데이터 섹션과 CRUD 로직을 포함하는 복합적인 기능입니다. 이를 효과적으로 관리하기 위해, 기존 프로필 관리 시스템의 아키텍처를 계승 및 발전시켜 각 기능이 독립적인 모듈로 동작하도록 설계했습니다.

### 1. 핵심 아키텍처: 기능별 독립 상태 및 서비스 레이어

- **UI Layer (`/components/resume`, `/components/cover-letter`)**:
  - **역할**: 이력서 및 자기소개서의 각 섹션(학력, 경력 등)에 대한 UI 렌더링과 사용자 상호작용을 전담하는 **프레젠테이션(Presentation) 계층**입니다.
  - **설계**: 각 데이터 섹션을 `*Section.tsx` (목록 관리), `*Card.tsx` (항목 조회), `*Form.tsx` (항목 생성/수정) 컴포넌트의 조합으로 명확히 분리했습니다. 이를 통해 **'목록 조회 → 단일 항목 표시 → 인라인 수정'** 이라는 일관된 UX 패턴을 모든 섹션에 적용하여 코드의 재사용성을 높이고 컴포넌트의 책임을 명확히 했습니다.

- **State Management Layer (`/stores/resumeStore.ts`, `stores/coverLetterStore.ts`)**:
  - **역할**: 각 기능(`resume`, `coverLetter`)별로 독립된 Zustand `store`를 구축하여 상태를 관리하는 **'단일 진실 공급원(Single Source of Truth)'** 입니다.
  - **설계**: 기능별로 `store`를 분리함으로써 상태 관리의 복잡도를 낮추고, 특정 기능에만 관련된 상태가 다른 기능에 영향을 미치지 않도록 격리했습니다. 각 `store`는 해당 기능의 데이터(State)와 비동기 통신(Action) 로직을 모두 포함하여 UI 컴포넌트가 비즈니스 로직의 복잡성을 알 필요 없게 만듭니다.

- **Service Layer (`/services/resumeService.ts`, `/services/coverLetterService.ts`)**:
  - **역할**: 백엔드 API와의 모든 통신을 담당하는 **데이터 접근(Data Access) 계층**입니다.
  - **설계**: 각 서비스는 이력서, 자기소개서 및 그 하위 항목들에 대한 CRUD API 호출을 추상화하여 제공합니다. 이를 통해 `store`는 API의 상세 구현을 알 필요 없이, 필요한 데이터를 요청하고 받을 수 있습니다.

### 2. 단방향 데이터 흐름 예시: 신규 경력 등록

이 아키텍처는 **'Action → State → View'** 로 이어지는 예측 가능한 단방향 데이터 흐름을 따릅니다.

1. **View (UI Layer)**: 사용자가 `CareerSection.tsx`에서 '추가' 버튼을 누르고 `CareerForm.tsx`에 정보를 입력한 뒤 '저장' 버튼을 클릭합니다.
2. **Action (State Layer)**: `CareerSection.tsx`의 `handleSave` 함수가 `resumeStore`의 `createCareer` 액션을 호출합니다.
3. **API Call (Service Layer)**: `createCareer` 액션 내부에서 `resumeService.careers.create`를 호출하여 백엔드에 API 요청을 보냅니다.
4. **State Update (State Layer)**: API 요청이 성공하면, `resumeStore`는 반환된 새로운 경력 데이터를 기존 `careers` 상태 배열에 추가하여 상태를 업데이트합니다.
5. **View Update (UI Layer)**: `resumeStore`를 구독하고 있던 `CareerSection` 컴포넌트는 상태 변경을 감지하고, 자동으로 리렌더링되어 새로운 경력 정보가 `CareerCard.tsx`를 통해 화면에 즉시 표시됩니다.

### 3. 데이터 모델 동기화 및 일관성 확보

- **문제점**: 신규 기능인 '이력서'의 학력/경력 모델과 기존 기능인 '마이페이지'의 학력/경력 모델 간의 필드 불일치가 존재했습니다. 이는 데이터의 정합성을 해치고 사용자에게 혼란을 줄 수 있는 심각한 문제였습니다.
- **해결책**: **'마이페이지'의 데이터 모델을 기준으로 `schemas/resume.ts`와 `services/profileService.ts`의 모델을 통합**했습니다. `school_type`, `degree`, `task` 등의 필드를 추가/변경하고, 양쪽 기능의 폼과 카드 컴포넌트가 모두 새로운 통합 모델을 바라보도록 리팩토링하여 어플리케이션 전체의 데이터 일관성을 확보했습니다.

## ✅ 구현된 내용 상세

### 1. 모듈식 컴포넌트와 인라인 편집 UX

각 섹션은 `useState`를 통해 자체적인 UI 상태(예: 수정 모드 여부)를 관리하는 독립된 컴포넌트로 구현되어, `Section` 컴포넌트가 전체 흐름을 제어합니다.

```tsx
// components/resume/details/CareerSection.tsx
const CareerSection: React.FC<CareerSectionProps> = ({ resumeId }) => {
  // 1. resumeStore에서 상태와 액션을 가져옴
  const { careers, fetchCareers, createCareer, updateCareer } = useResumeStore();
  // 2. 수정/추가 모드를 제어하는 UI 상태는 컴포넌트 내부에서 관리
  const [editingCareerId, setEditingCareerId] = useState<number | "new" | null>(null);

  // 3. 저장 로직: store의 액션을 호출하여 비즈니스 로직 위임
  const handleSave = async (data: CareerCreate | CareerUpdate) => {
    if (editingCareerId === "new") {
      await createCareer(resumeId, data as CareerCreate);
    } else {
      await updateCareer(resumeId, editingCareerId as number, data);
    }
    setEditingCareerId(null); // 내부 UI 상태를 변경하여 폼을 닫음
  };

  // ...
  return (
    <View>
      {/* ... 목록 렌더링 ... */}
      {careers.map((career) =>
        editingCareerId === career.id ? (
          <CareerForm key={career.id} initialData={career} onSubmit={handleSave} onCancel={() => setEditingCareerId(null)} />
        ) : (
          <CareerCard key={career.id} career={career} onEdit={() => setEditingCareerId(career.id)} onDelete={() => handleDelete(career.id)} />
        ),
      )}
      {editingCareerId === "new" && (
        <CareerForm onSubmit={handleSave} onCancel={() => setEditingCareerId(null)} />
      )}
    </View>
  );
};
```

### 2. 사용자 경험(UX) 중심의 동적 폼 구현

사용자가 데이터를 정확하고 쉽게 입력할 수 있도록 다양한 UX 최적화 기법을 적용했습니다.

- **필수 필드 시각적 표시 및 버튼 비활성화**:
  - `FormLabel` 컴포넌트를 구현하여, 필수 입력 필드 우측에 붉은색 Asterisk(`*`)를 자동으로 표시합니다.
  - `useEffect` 훅을 사용하여 폼 데이터의 변경을 감지하고, 모든 필수 필드가 채워졌을 때만 '저장' 버튼이 활성화되도록 제어하여 불완전한 데이터 제출을 방지합니다.

- **조건부 필드 렌더링 및 데이터 초기화**:
  - **경력**: '재직 중' 스위치를 활성화하면, `endDate`와 `reason_for_leaving` 필드를 숨기고 관련 상태를 `null`로 초기화합니다.
  - **학력**: '학교 종류'를 '초/중/고등학교'로 선택하면, 불필요한 `major`(전공)와 `degree`(학위) 필드를 숨기고 관련 상태를 `null`로 초기화하여 API에 의도치 않은 값이 전송되지 않도록 합니다.

### 3. 플랫폼 독립적인 재사용 가능 유틸리티: `showConfirmation`

- **문제점**: 네이티브 환경의 `Alert.alert`는 웹 환경에서 정상적으로 동작하지 않아, 동일한 '삭제 확인' 기능을 위해 플랫폼별로 분기하는 코드가 여러 컴포넌트에 중복되었습니다.
- **해결책**: `Platform.OS`를 사용하여 내부적으로 웹(`window.confirm`)과 네이티브(`Alert.alert`) 로직을 분기 처리하는 **`showConfirmation` 유틸리티 함수를 `utils/alert.ts`에 구현**했습니다.

  ```typescript
  // utils/alert.ts
  export const showConfirmation = ({ title, message, onConfirm, ... }) => {
    if (Platform.OS === "web") {
      if (window.confirm(message)) {
        onConfirm();
      }
    } else {
      Alert.alert(title, message, [
        { text: "취소", style: "cancel" },
        { text: "삭제", onPress: onConfirm, style: "destructive" },
      ]);
    }
  };
  ```

- **기대효과**: 이제 모든 컴포넌트는 플랫폼을 신경 쓸 필요 없이, `showConfirmation` 함수 하나만 호출하여 일관된 사용자 경험을 제공할 수 있습니다. 이는 코드 중복을 제거하고 유지보수성을 크게 향상시킵니다.

### 4. 포괄적인 국제화(i18n) 적용

- `react-i18next`를 사용하여 이력서 및 자기소개서 기능과 관련된 모든 UI 텍스트(라벨, 플레이스홀더, 버튼, 경고 메시지 등)를 다국어 처리했습니다.
- `ko-KR`과 `en-US` 두 언어에 대한 `translations.json` 파일을 체계적으로 관리하여, 향후 다른 언어 추가에도 유연하게 대응할 수 있는 기반을 마련했습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items.center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
