```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```
---
- Go to MOC
	- [[MOC-C++]]
---
# 1. 핵심 개념
## `std::map`
- **Key-Value 쌍**
	- 데이터를 키(Key)와 값(Value)의 쌍으로 저장하는 연관 컨테이너    
- **자동 정렬**
	- 내부적으로 **Red-Black Tree**(균형 이진 탐색 트리) 구조 사용
	- 데이터가 삽입됨과 동시에 키를 기준으로 오름차순 정렬
- **고유성**
	- `map` 내의 키는 중복 불가
	- 중복된 키를 삽입 시도하면
		- 기존 값 갱신
		- or
		- 무시
- **양방향 반복자**
	- 트리 구조를 따라 순회할 수 있는 양방향 반복자 제공
## std::multimap 이란?
- (추후 작성 예정)

---
# 2. 시간 복잡도
## 탐색, 삽입, 삭제
- **$O(\log N)$**
	- 모든 주요 작업
	- 시간 복잡도 ∝ 트리의 높이
- 데이터가 100만 개($10^6$)일 때
	- 약 20번의 비교만으로 원하는 데이터를 찾을 수 있음
- **주의**
	- [[boj_20920]] 처럼 
		- 정렬 상태가 유지될 필요가 없는
		- 단순 빈도 계산 작업
		- `unordered_map`의 $O(1)$보다 느릴 수 있음.

---
# 3. 주요 멤버 함수
## 선언 및 초기화
```cpp
#include <map>

std::map<string, int> m;
// 키 기준 내림차순 정렬을 원할 경우
std::map<string, int, greater<string>> m_desc;
```

## 데이터 삽입 및 수정
```cpp
// 1. operator `[]` 사용 (가장 직관적)
m["apple"] = 5; // 존재하지 않으면 기본값 0으로 생성 후 5 대입

// 2. insert() 사용
m.insert({"banana", 3});
m.insert(make_pair("cherry", 10));

// 3. emplace() 사용 (불필요한 복사 방지, 효율적)
m.emplace("orange", 7);
```

## 탐색 및 확인
```cpp
// 1. find(): 요소를 찾으면 해당 반복자 반환, 없으면 end() 반환
if (m.find("apple") != m.end()) {
    cout << "찾음! 값: " << m["apple"] << '\n';
}

// 2. count(): 특정 키의 개수 반환 (map에서는 0 또는 1)
if (m.count("banana")) {
    cout << "존재함" << '\n';
}
```

## 삭제 및 순회
```cpp
// 특정 키 삭제
m.erase("apple");

// 전체 순회 (C++17 구조 분해 할당)
for (const auto& [key, value] : m) {
    cout << key << " : " << value << '\n';
}

// 반복자 활용 순회
for (auto it = m.begin(); it != m.end(); ++it) {
    cout << it->first << " : " << it->second << '\n';
}
```

---
# 4. 실전 테크닉
## `value` 기준 정렬
- `std::map`
	- 키 기준 정렬만 지원
- **값(Value)을 기준으로 정렬**하려면
	- `std::vector`로 데이터를 옮긴 후
	- `std::sort`를 사용
```cpp
// map을 vector로 변환
vector<pair<string, int>> vec(my_map.begin(), my_map.end());

// 사용자 정의 비교 함수(compare)를 이용한 정렬
sort(vec.begin(), vec.end(), compare);
```

---

