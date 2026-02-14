---
id: 20260215020616372000
title: Vector
date: 2026-02-15
comments: "true"
---

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
## 가변 길이 배열 (Dynamic Array)
- 실행 중에 크기를 자유롭게 확장하거나 축소할 수 있는 시퀀스 컨테이너
- 데이터를 순차적으로 저장
- 마지막 위치에서의 삽입과 삭제에 최적화
## 물리적 구조 및 접근
- 연속적 메모리 구조
	![[Memory_Layout#연속적 메모리 (Contiguous Memory)]]
- 인덱스를 통한 **Random Access**를 지원
	- $O(1)$의 속도로 특정 원소에 접근 가능

---
# 2. 시간 복잡도 (Time Complexity)

## 주요 연산별 성능
- **임의 접근 (Access)**
	- $O(1)$
- **끝부분 삽입/삭제 (Push/Pop back)**
	- $O(1)$ (Amortized)
- **중간/앞부분 삽입/삭제 (Insert/Erase)**
	- $O(N)$
    - 특정 원소 삭제 시
	    - 뒤에 있는 모든 데이터를 한 칸씩 당겨야 하는 **데이터 대이동**이 발생

---
# 3. 주요 멤버 함수
## 3.1. 원소 삽입 및 삭제

```cpp
vector<int> v = {1, 2, 3};

// 1. 끝부분 조작
v.push_back(4);  // {1, 2, 3, 4} (O(1))
v.pop_back();     // {1, 2, 3} (O(1))

// 2. 중간 조작 (Iterator 활용)
v.insert(v.begin() + 1, 10); // index 1에 10 삽입 (O(N))
v.erase(v.begin() + 1);      // index 1 원소 삭제 (O(N))

// 3. 전체 초기화
v.clear(); // size는 0이 되지만 capacity는 유지됨
```
## 3.2. 크기 및 용량 관리
```cpp
// 1. 예약 (Performance Optimization)
v.reserve(100); // 100개만큼의 메모리를 미리 할당 (재할당 비용 방지)

// 2. 크기 조정
v.resize(10, 0); // size를 10으로 맞추고 새 공간을 0으로 채움

// 3. 정보 조회
v.size();     // 실제 원소 개수
v.capacity(); // 재할당 없이 담을 수 있는 최대 개수
v.empty();    // 비어있는지 확인 (pop 전 필수 체크)
```
## 3.3. 

---
# 4. PS 실전 테크닉

## 4.1. 역순 순회 (Reverse Scan)
- 데이터를 실제로 뒤집는($O(N)$) 행위 지양
- 반복자(`iterator`)의 방향만 바꾸어 효율적 스캔
	![[Iterator_Interface#2.2. 역방향 순회 (Reverse)]]
## 4.2. 정렬 및 중복 제거
- `std::sort` & `std::unique` 조합
- 유일한 값들만 남기는 처리 수행

```cpp
// [26043] 식당 메뉴 문제 스타일
sort(v.begin(), v.end()); 
v.erase(unique(v.begin(), v.end()), v.end()); 
```
## 4.3. 효율적인 매개변수 전달
- 대형 벡터를 함수에 넘길 때 
	- 복사 비용을 방지하기
	- **상수 참조**를 사용합니다.
	![[Pointer_and_Reference#`const T&` (상수 참조)]]

## 4.4. 안전한 인덱스 접근
- `vector`의 operator `[]`는 경계 검사를 하지 않음
- 인덱스 접근 시 Segmentation Fault 유발 가능
- 주요 예시 : [[EachProblem/boj_2212]]
	- 서로 다른 길이의 vector를 순환하는 loop 에서
	  하나의 vector의 길이인 `n`에 대해서만 상한선을 잡음.
- 해결 전략
```cpp
// [BOJ 2212] 사례: k-1개 만큼 간격을 지우고 싶을 때
// 위험한 코드: i < k - 1 (n < k인 경우 범위를 벗어남)
// 안전한 코드:
int limit = min((int)distance.size(), k - 1);
for (int i = 0; i < limit; ++i) {
    total_dist -= distance[i];
}
```



---
# #Thought

## `Vector` vs `Deque` 선택 기준
### `Vector`
- 데이터 접근 속도가 가장 중요할 때
- 삽입/삭제가 끝에서만 발생할 때
### `Deque`
- `[26042]` 문제처럼 
	- 앞부분 삭제(`pop_front`)**가 빈번하여 
	- $O(1)$ 성능이 필요할 때
## 메모리 연속성의 가치
- `vector`의 데이터가 메모리에 붙어있다는 점
	- CPU 캐시 적중률(Cache Hit) 향상
	- -> 실제 연산 속도를 비약적으로 향상시킴
- 이론적 복잡도가 같은 다른 자료구조보다 `vector`가 실전에서 더 빠른 이유

---

# 주의사항
## Out_Of_Bounds
- `vector`의 operator `[]`는 경계 검사를 하지 않음
- 인덱스 접근 시 Segmentation Fault 유발 가능
- 주요 예시 : [[EachProblem/boj_2212]]
	- 서로 다른 길이의 vector를 순환하는 loop 에서
	  하나의 vector의 길이인 `n`에 대해서만 상한선을 잡음.
### 해결책
```cpp
// [BOJ 2212] 사례: k-1개 만큼 간격을 지우고 싶을 때
// 위험한 코드: i < k - 1 (n < k인 경우 범위를 벗어남)
// 안전한 코드:
int limit = min((int)distance.size(), k - 1);
for (int i = 0; i < limit; ++i) {
    total_dist -= distance[i];
}
```

## Underflow (feat. `size_t`)
- `vec.size()`
	- `size_t` (부호 없는 정수형)을 반환
- 위험 예시
	- `v.size() - 1` 연산
### 해결책
#### 1. type casting
- 명시적 형변환
```cpp
for (int i=0; i < (int)vec.size(); ++i){
	...
}
```
#### 2. C++20 `std::ssize(vec)`

