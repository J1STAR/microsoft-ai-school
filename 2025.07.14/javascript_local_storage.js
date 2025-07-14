/**
 * @fileoverview 브라우저의 웹 스토리지 API 중 하나인 localStorage에 대해 설명합니다.
 * localStorage는 데이터를 영구적으로 저장하며, 브라우저를 껐다 켜도 데이터가 유지됩니다.
 * 데이터는 key-value 쌍의 형태로 저장되며, 문자열(String)만 저장할 수 있습니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
 */

console.log("--- JavaScript localStorage ---");

// -----------------------------------------------------------------------------
// 1. localStorage 기본 사용법 (setItem, getItem, removeItem, clear)
// -----------------------------------------------------------------------------
console.log("\n1. localStorage 기본 사용법:");

// 1-1. 데이터 저장: localStorage.setItem(key, value)
// 'theme'라는 키에 'dark'라는 값을 저장합니다.
localStorage.setItem("theme", "dark");
console.log("  - localStorage에 'theme: dark'를 저장했습니다.");

// 1-2. 데이터 조회: localStorage.getItem(key)
const savedTheme = localStorage.getItem("theme");
console.log(`  - localStorage에서 가져온 theme 값: ${savedTheme}`);

// 1-3. 데이터 삭제: localStorage.removeItem(key)
localStorage.removeItem("theme");
console.log("  - localStorage에서 'theme' 항목을 삭제했습니다.");
console.log(`  - 삭제 후 theme 값: ${localStorage.getItem("theme")}`); // null

// 1-4. 모든 데이터 삭제: localStorage.clear()
localStorage.setItem("user", "JohnDoe");
localStorage.setItem("isLoggedIn", "true");
console.log("\n  - 여러 데이터를 저장합니다: user, isLoggedIn");
console.log(`  - 현재 localStorage 길이: ${localStorage.length}`);
localStorage.clear();
console.log("  - localStorage의 모든 데이터를 삭제했습니다.");
console.log(`  - clear 후 localStorage 길이: ${localStorage.length}`);

// -----------------------------------------------------------------------------
// 2. 객체(Object) 저장하기 (JSON 활용)
// -----------------------------------------------------------------------------
/*
 * localStorage는 문자열만 저장할 수 있으므로, 객체나 배열을 저장하려면
 * JSON.stringify()를 사용하여 문자열로 변환해야 합니다.
 * 조회 시에는 JSON.parse()를 사용하여 다시 원래 객체로 변환합니다.
 */
console.log("\n2. 객체 저장하기 (JSON 활용):");

const userSettings = {
  username: "Alice",
  notifications: {
    email: true,
    sms: false,
  },
  language: "ko",
};

// 2-1. 객체를 JSON 문자열로 변환하여 저장
localStorage.setItem("settings", JSON.stringify(userSettings));
console.log("  - userSettings 객체를 JSON 문자열로 변환하여 저장했습니다.");

// 2-2. 저장된 문자열을 가져와서 객체로 파싱
const savedSettingsString = localStorage.getItem("settings");
const parsedSettings = JSON.parse(savedSettingsString);

console.log("  - 저장된 설정을 다시 객체로 파싱했습니다:", parsedSettings);
console.log(`  - 파싱된 객체의 사용자 이름: ${parsedSettings.username}`);
console.log(`  - 파싱된 객체의 이메일 알림 설정: ${parsedSettings.notifications.email}`);

localStorage.clear(); // 예제 실행 후 데이터 정리 