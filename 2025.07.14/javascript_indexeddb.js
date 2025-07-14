/**
 * @fileoverview 브라우저의 클라이언트 사이드 데이터베이스인 IndexedDB에 대해 설명합니다.
 * IndexedDB는 대용량의 구조화된 데이터를 저장하고 효율적으로 검색할 수 있는
 * 비동기(asynchronous) API입니다. localStorage/sessionStorage와 달리
 * 객체, 파일, Blob 등 다양한 타입을 저장할 수 있으며 트랜잭션(transaction)을 지원합니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API
 */

console.log("--- JavaScript IndexedDB ---");

// -----------------------------------------------------------------------------
// 1. IndexedDB 기본 개념
// -----------------------------------------------------------------------------
/*
 * - Database: 가장 상위의 컨테이너입니다. 이름과 버전 번호로 관리됩니다.
 * - Object Store: 데이터를 저장하는 공간. 관계형 데이터베이스의 '테이블'과 유사합니다.
 * - Index: 특정 속성(property)을 기준으로 데이터를 빠르게 검색하기 위해 사용합니다.
 * - Transaction: 데이터베이스 작업을 위한 래퍼(wrapper)입니다. 원자성(atomicity)을 보장합니다.
 * - Cursor: 객체 저장소나 인덱스의 여러 레코드를 순회하며 탐색합니다.
 */

// -----------------------------------------------------------------------------
// 2. 데이터베이스 열기 및 업그레이드
// -----------------------------------------------------------------------------
console.log("\n2. 데이터베이스 열기 및 업그레이드:");

// 'notesDB'라는 이름의 데이터베이스를 버전 1로 엽니다.
// 데이터베이스가 없으면 새로 생성하고, 버전이 다르면 업그레이드를 시도합니다.
const request = indexedDB.open("notesDB", 1);

// 데이터베이스를 열거나 생성하는 데 에러가 발생했을 때
request.onerror = (event) => {
  console.error("데이터베이스를 여는 데 실패했습니다:", event.target.error);
};

// 데이터베이스가 처음 생성되거나 버전이 변경될 때 발생하는 이벤트
// 객체 저장소(테이블)나 인덱스 생성/수정은 이 이벤트 핸들러 안에서만 가능합니다.
request.onupgradeneeded = (event) => {
  console.log("  - onupgradeneeded: 데이터베이스를 업그레이드합니다.");
  const db = event.target.result;

  // 'notes'라는 이름의 객체 저장소를 생성합니다. 'id'를 고유 키로 사용하고 자동 증가시킵니다.
  const objectStore = db.createObjectStore("notes", {
    keyPath: "id",
    autoIncrement: true,
  });

  // 'timestamp' 속성을 기준으로 데이터를 검색할 수 있도록 인덱스를 생성합니다.
  objectStore.createIndex("timestamp", "timestamp", { unique: false });
  console.log("  - 'notes' 객체 저장소와 'timestamp' 인덱스를 생성했습니다.");
};

// 데이터베이스가 성공적으로 열렸을 때
request.onsuccess = (event) => {
  console.log("  - onsuccess: 데이터베이스가 성공적으로 열렸습니다.");
  const db = event.target.result;

  // 데이터베이스 연결을 다른 함수에서 사용할 수 있도록 전달합니다.
  performDatabaseOperations(db);
};

// -----------------------------------------------------------------------------
// 3. 데이터 추가, 조회, 수정, 삭제 (CRUD)
// -----------------------------------------------------------------------------

function performDatabaseOperations(db) {
  console.log("\n3. 데이터베이스 작업 (CRUD) 수행:");

  // 3-1. 데이터 추가 (Create)
  // 'readwrite' 모드로 트랜잭션을 시작합니다.
  const addTransaction = db.transaction(["notes"], "readwrite");
  const noteObjectStore = addTransaction.objectStore("notes");

  const newNote = {
    text: "IndexedDB 배우기",
    timestamp: new Date().getTime(),
  };

  const addRequest = noteObjectStore.add(newNote);
  addRequest.onsuccess = () => {
    console.log(`  - 데이터 추가 성공! ID: ${addRequest.result}`);
    
    // 3-2. 데이터 조회 (Read)
    readData(db, addRequest.result);
  };
  addRequest.onerror = (event) => console.error("데이터 추가 실패:", event.target.error);

  // 트랜잭션 완료 이벤트
  addTransaction.oncomplete = () => console.log("  - 추가 트랜잭션 완료.");
}

function readData(db, key) {
  const readTransaction = db.transaction(["notes"], "readonly");
  const noteObjectStore = readTransaction.objectStore("notes");
  const getRequest = noteObjectStore.get(key);

  getRequest.onsuccess = () => {
    console.log("  - 데이터 조회 성공:", getRequest.result);

    // 3-3. 데이터 수정 (Update)
    updateData(db, key, "내용 수정됨!");
  };
  getRequest.onerror = (event) => console.error("데이터 조회 실패:", event.target.error);
}

function updateData(db, key, newText) {
    const updateTransaction = db.transaction(["notes"], "readwrite");
    const noteObjectStore = updateTransaction.objectStore("notes");
    
    // 먼저 기존 데이터를 가져옵니다.
    const getRequest = noteObjectStore.get(key);
    getRequest.onsuccess = () => {
        const noteToUpdate = getRequest.result;
        noteToUpdate.text = newText; // 내용을 수정합니다.

        const updateRequest = noteObjectStore.put(noteToUpdate);
        updateRequest.onsuccess = () => {
            console.log("  - 데이터 수정 성공!");

            // 3-4. 데이터 삭제 (Delete)
            deleteData(db, key);
        };
        updateRequest.onerror = (event) => console.error("데이터 수정 실패:", event.target.error);
    };
}

function deleteData(db, key) {
    const deleteTransaction = db.transaction(["notes"], "readwrite");
    const noteObjectStore = deleteTransaction.objectStore("notes");
    const deleteRequest = noteObjectStore.delete(key);

    deleteRequest.onsuccess = () => {
        console.log(`  - ID(${key}) 데이터 삭제 성공!`);

        // 모든 작업이 끝난 후 데이터베이스 연결을 닫습니다.
        db.close();
        console.log("\n모든 작업 완료 후 데이터베이스 연결을 닫았습니다.");
    };
    deleteRequest.onerror = (event) => console.error("데이터 삭제 실패:", event.target.error);
} 