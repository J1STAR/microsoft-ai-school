/**
 * @file repository.factory.js
 * @description
 * 이 파일은 요청된 타입에 따라 적절한 'todo' 리포지토리 인스턴스를 생성하고 반환하는
 * 팩토리(Factory) 역할을 합니다.
 * 이 팩토리를 통해 서비스 계층은 구체적인 리포지토리 구현에 대한 의존성을 분리할 수 있습니다.
 */

import { indexedDbRepository } from "./todo.indexeddb.repository.js";
import { localStorageRepository } from "./todo.localstorage.repository.js";

/**
 * 사용 가능한 리포지토리 구현체들을 모아놓은 레지스트리 객체입니다.
 * 키(key)는 리포지토리 타입을 나타내고, 값(value)은 해당 리포지토리 인스턴스입니다.
 * @type {Object.<string, import('./todo.repository.interface.js').TodoRepository>}
 */
const repositories = {
    indexeddb: indexedDbRepository,
    localstorage: localStorageRepository,
};

/**
 * 지정된 타입에 해당하는 'todo' 리포지토리 인스턴스를 반환합니다.
 * 만약 요청된 타입의 리포지토리를 찾을 수 없으면, 기본값으로 'indexeddb' 리포지토리를 반환합니다.
 * 이를 통해 애플리케이션의 다른 부분(예: 서비스 계층)에서 데이터 저장 방식에 대한 걱정 없이
 * 일관된 인터페이스를 통해 데이터에 접근할 수 있습니다.
 *
 * @param {'indexeddb' | 'localstorage'} [type='indexeddb'] - 사용할 리포지토리의 타입입니다.
 * @returns {import('./todo.repository.interface.js').TodoRepository} 선택된 타입의 리포지토리 객체를 반환합니다.
 */
export const getRepository = (type = 'indexeddb') => {
    const repository = repositories[type];
    if (!repository) {
        // 유효하지 않은 타입이 요청된 경우, 콘솔에 경고를 출력하고 기본 리포지토리를 사용합니다.
        console.warn(`Repository type '${type}' not found. Falling back to 'indexeddb'.`);
        return repositories.indexeddb;
    }
    return repository;
}; 