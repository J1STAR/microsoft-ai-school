/**
 * @fileoverview 브라우저의 웹 스토리지 API 중 하나인 sessionStorage에 대해 설명합니다.
 * sessionStorage는 데이터를 현재 세션(session) 동안만 저장합니다.
 * 즉, 브라우저 탭이나 창이 닫히면 데이터가 자동으로 삭제됩니다.
 * API는 localStorage와 동일합니다 (setItem, getItem, removeItem, clear).
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Window/sessionStorage
 */

console.log("--- JavaScript sessionStorage ---");

// -----------------------------------------------------------------------------
// 1. sessionStorage 기본 사용법
// -----------------------------------------------------------------------------
/*
 * localStorage와 동일한 API를 사용하지만, 데이터는 현재 탭에만 유지됩니다.
 * 새 탭이나 새 창에서는 이 데이터에 접근할 수 없습니다.
 */
console.log("\n1. sessionStorage 기본 사용법:");

// 1-1. 데이터 저장
sessionStorage.setItem("session-id", "xyz-123-abc");
console.log("  - sessionStorage에 'session-id'를 저장했습니다.");

// 1-2. 데이터 조회
const sessionId = sessionStorage.getItem("session-id");
console.log(`  - sessionStorage에서 가져온 ID: ${sessionId}`);

// -----------------------------------------------------------------------------
// 2. localStorage와의 비교
// -----------------------------------------------------------------------------
console.log("\n2. localStorage와의 비교:");

// 두 스토리지에 모두 데이터를 저장해봅니다.
localStorage.setItem("persistent-data", "이 데이터는 영구적으로 남습니다.");
sessionStorage.setItem("temporary-data", "이 데이터는 탭을 닫으면 사라집니다.");

console.log("  - localStorage와 sessionStorage에 각각 데이터를 저장했습니다.");
console.log("  - 브라우저를 완전히 껐다 켜면 'persistent-data'만 남습니다.");
console.log("  - 이 탭을 닫고 다시 열면 'temporary-data'는 사라집니다.");

// -----------------------------------------------------------------------------
// 3. 활용 사례: 폼 데이터 임시 저장
// -----------------------------------------------------------------------------
/*
 * 사용자가 페이지를 새로고침하거나 잠시 다른 페이지에 갔다 돌아와도
 * 작성 중이던 폼 데이터를 유지하고 싶을 때 유용합니다.
 * 세션이 끝나면 자동으로 데이터가 삭제되므로 깔끔합니다.
 */
console.log("\n3. 활용 사례: 폼 데이터 임시 저장");

const formInput = {
  name: "홍길동",
  email: "gildong@example.com",
  message: "이 내용은 임시 저장된 내용입니다.",
};

// 사용자가 입력할 때마다 sessionStorage에 저장한다고 가정
sessionStorage.setItem("temp-form-data", JSON.stringify(formInput));
console.log("  - 작성 중인 폼 데이터를 sessionStorage에 저장했습니다.");

// 페이지 로드 시, 임시 데이터가 있는지 확인하고 복원
const tempData = sessionStorage.getItem("temp-form-data");
if (tempData) {
  const parsedData = JSON.parse(tempData);
  console.log("  - 임시 저장된 폼 데이터를 발견하고 복원했습니다:", parsedData);
}

// 예제 실행 후 데이터 정리 (실제 시나리오에서는 clear()를 명시적으로 호출하지 않음)
// sessionStorage.clear(); 