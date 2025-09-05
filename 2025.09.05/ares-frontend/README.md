### 📂 Project 보기: [project-ares-interview/ares-frontend](https://github.com/project-ares-interview/ares-frontend/tree/feature/additional-user-information)

# 📅 2025년 9월 5일: `ares-frontend` 사용자 프로필 관리 시스템 아키텍처 및 구현

## 📝 작성 의도

본 문서는 **확장 가능하고 유지보수성이 뛰어난 사용자 프로필 관리 시스템을 구축하기 위한 아키텍처 설계와 그 구체적인 구현 과정**을 상세히 기록하는 것을 목표로 합니다. 사용자의 다양한 개인정보(병역, 학력, 경력 등)를 다루는 만큼, 각 정보 섹션을 독립적인 모듈로 개발하면서도, 전체 시스템의 데이터 일관성과 안정성을 확보하는 것이 핵심 과제였습니다.

이를 위해 **컴포넌트 기반 설계, 중앙화된 상태 관리(Zustand), 추상화된 서비스 레이어**라는 명확한 역할 분리 원칙을 적용했습니다. 이 문서는 이러한 아키텍처가 어떻게 코드의 복잡도를 낮추고, 팀원 간의 협업 효율성을 높이며, 향후 새로운 프로필 섹션 추가와 같은 변경사항에 유연하게 대응할 수 있는 기반을 마련했는지 구체적인 코드와 함께 설명합니다.

## 🏛️ 구현 의도 및 아키텍처 전략

사용자 프로필 기능은 서로 다른 데이터 구조를 가진 여러 하위 섹션의 집합체입니다. 이러한 복잡성을 효과적으로 관리하기 위해, 각 계층이 명확한 단일 책임(Single Responsibility)을 갖는 **계층형 아키텍처(Layered Architecture)**를 채택했습니다.

### 1. 핵심 아키텍처: 3-Tier (UI - State - Service)

- **UI Layer (`/components/profile/*Section.tsx`)**:
  - **역할**: 각 프로필 섹션(학력, 경력 등)의 UI 렌더링과 사용자 상호작용(입력, 클릭 등)을 전담하는 **프레젠테이션(Presentation) 계층**입니다.
  - **설계**: 각 섹션을 독립된 컴포넌트로 분리하여 재사용성과 고립성을 높였습니다. 각 컴포넌트는 오직 화면에 데이터를 보여주고, 사용자 이벤트를 받아 상위 상태 관리 계층으로 전달하는 역할만 수행합니다.

- **State Management Layer (`/stores/profileStore.ts`)**:
  - **역할**: 어플리케이션의 모든 프로필 데이터를 관리하는 **'단일 진실 공급원(Single Source of Truth)'** 역할을 하는 **상태 관리 계층**입니다.
  - **설계**: Zustand를 사용하여 중앙 집중식 `store`를 구축했습니다. API 통신과 같은 비동기 로직과 비즈니스 로직을 이 계층에 집중시켜, UI 컴포넌트가 데이터 처리의 복잡성을 알 필요 없게 만들었습니다. 이를 통해 UI는 순수하게 데이터(State)를 화면에 그리는 역할에만 집중할 수 있습니다.

- **Service Layer (`/services/profileService.ts`)**:
  - **역할**: 백엔드 API와의 모든 통신을 담당하는 **데이터 접근(Data Access) 계층**입니다.
  - **설계**: Axios 인스턴스를 기반으로, 반복적인 CRUD 로직을 처리하는 `createProfileService` 팩토리 함수를 구현하여 API 호출 코드를 추상화하고 중복을 제거했습니다. 상태 관리 계층은 이 서비스를 통해 데이터를 요청하고 받습니다.

### 2. 단방향 데이터 흐름 (Unidirectional Data Flow)

이 아키텍처는 **'Action → State → View'** 로 이어지는 예측 가능한 단방향 데이터 흐름을 따릅니다.

1. **View (UI Layer)**: 사용자가 '저장' 버튼을 클릭합니다. (`EducationSection.tsx`)
2. **Action (State Layer)**: `profileStore`의 `updateEducation` 액션을 호출합니다.
3. **API Call (Service Layer)**: `updateEducation` 액션 내부에서 `educationApi.update`를 호출합니다.
4. **State Update (State Layer)**: API 응답이 성공하면, `profileStore`는 `educations` 상태를 새로운 데이터로 업데이트합니다.
5. **View Update (UI Layer)**: `profileStore`를 구독하고 있던 `EducationSection` 컴포넌트는 상태 변경을 감지하고, 자동으로 리렌더링되어 변경된 내용을 화면에 표시합니다.

이러한 흐름은 데이터 변경을 추적하기 쉽게 만들고, 복잡한 어플리케이션에서 발생할 수 있는 버그를 예방합니다.

## ✅ 구현된 내용 상세

### 1. 모듈식 UI 컴포넌트 (`*Section.tsx`)

각 프로필 섹션은 자체적인 UI와 상태(예: 수정 모드 여부)를 관리하는 독립된 컴포넌트로 구현되었습니다. `EducationSection.tsx`의 구조는 다음과 같습니다.

- **`EducationSection` (메인 컴포넌트)**: `profileStore`에서 `educations` 목록을 가져와 화면에 렌더링하고, '추가', '수정', '삭제' 버튼을 제공합니다.
- **`EducationForm` (폼 컴포넌트)**: '추가' 또는 '수정' 시 사용되는 입력 폼입니다. 부모로부터 받은 `onSave` 콜백 함수를 통해 데이터 저장을 트리거합니다.

```tsx
// EducationSection.tsx
const EducationSection = () => {
  // 1. profileStore에서 상태와 액션을 가져옴
  const { educations, createEducation, updateEducation } = useProfileStore();
  // 2. 수정 모드 등 UI 상태는 컴포넌트 내부에서 관리
  const [editingEducationId, setEditingEducationId] = useState<number | "new" | null>(null);

  // 3. 저장 로직: store의 액션을 호출
  const handleSave = async (data: Omit<Education, "id">) => {
    if (editingEducationId === "new") {
      await createEducation(data);
    } else if (editingEducationId) {
      await updateEducation(editingEducationId, data);
    }
    setEditingEducationId(null); // 내부 UI 상태 변경
  };
  // ...
};
```

### 2. 중앙 상태 관리 허브 (`profileStore.ts`)

Zustand를 사용하여 프로필과 관련된 모든 상태와 비즈니스 로직을 중앙에서 관리합니다.

- **구조**: `state` (데이터)와 `actions` (상태 변경 로직)이 명확히 분리되어 있습니다.
- **비동기 처리**: 모든 비동기 액션(CRUD)은 `try/catch` 블록으로 감싸져 있으며, API 요청 전후로 `loading` 상태를 관리하여 UI에 로딩 인디케이터를 쉽게 표시할 수 있도록 지원합니다.
- **데이터 동기화**: `fetchAllProfileData` 함수는 `Promise.all`을 사용하여 여러 프로필 API를 병렬로 호출, 초기 데이터 로딩 시간을 최소화합니다.

```typescript
// stores/profileStore.ts
export const useProfileStore = create<ProfileState>((set, get) => ({
  // State
  educations: [],
  loading: false,

  // Actions
  fetchEducations: async () => {
    try {
      set({ loading: true });
      const data = await educationApi.getAll();
      set({ educations: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  
  createEducation: async (data) => {
    const newData = await educationApi.create(data);
    set((state) => ({ educations: [...state.educations, newData] }));
  },
  // ...
}));
```

### 3. 재사용 가능한 서비스 레이어 (`profileService.ts`)

반복되는 API 통신 로직을 `createProfileService` 팩토리 함수로 추상화하여 코드 중복을 획기적으로 줄였습니다.

```typescript
// services/profileService.ts
const createProfileService = <T, C>(resource: string) => ({
  getAll: (): Promise<T[]> => api.get(`/profile/${resource}/`).then((res) => res.data),
  create: (data: C): Promise<T> => api.post(`/profile/${resource}/`, data).then((res) => res.data),
  update: (id: number, data: Partial<C>): Promise<T> => api.patch(`/profile/${resource}/${id}/`, data).then((res) => res.data),
  delete: (id: number): Promise<void> => api.delete(`/profile/${resource}/${id}/`).then((res) => res.data),
});

// 사용 예시: API 엔드포인트 이름만으로 서비스 인스턴스 생성
export const educationApi = createProfileService<Education, Omit<Education, "id">>("educations");
export const careerApi = createProfileService<Career, Omit<Career, "id">>("careers");
```

이 패턴 덕분에 향후 '자격증'과 같은 새로운 프로필 섹션이 추가되더라도, `profileService.ts`에 단 한 줄의 코드만 추가하면 해당 섹션의 모든 CRUD API 서비스를 즉시 사용할 수 있습니다.

### 4. 사용자 경험(UX) 최적화: `Select` 기반 날짜 입력

안정적인 아키텍처 위에서 사용자 경험을 개선한 대표적인 사례는 날짜 입력 방식 변경입니다.

- **문제 정의**: 텍스트 기반 날짜 입력은 사용자에게 오타나 잘못된 형식의 데이터를 입력할 여지를 주어 데이터의 신뢰성을 떨어뜨립니다.
- **해결 방안**: 유효한 값만 선택할 수 있는 `Picker` 컴포넌트를 도입하여 입력 오류를 원천적으로 차단했습니다. 이 로직은 `utils/dateUtils.ts`에 중앙화하여 여러 컴포넌트에서 재사용할 수 있도록 구현했습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items.center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
