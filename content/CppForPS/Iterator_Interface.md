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
	- [[C++_Index]]
---
# 1. 핵심 개념
## 추상화된 포인터
- 컨테이너의 내부 구조(배열, 연결 리스트 등)에 상관없이 
- 동일한 방식으로 원소에 접근할 수 있게 해주는 
- **추상화된 인터페이스**
## 반복자의 위치 정의
| **구분**     | **명칭**     | **의미**                          | **비고**                 |
| ---------- | ---------- | ------------------------------- | ---------------------- |
| **정방향 시작** | `begin()`  | 첫 번째 원소를 가리킴                    | 순회 시작점                 |
| **정방향 끝**  | `end()`    | **마지막 원소의 다음(Past-the-end)** 위치 | 실제 데이터 없음, 주의!         |
| **역방향 시작** | `rbegin()` | 맨 마지막 원소를 가리킴                   | `reverse_iterator` 시작점 |
| **역방향 끝**  | `rend()`   | 첫 번째 원소보다 한 칸 앞의 가상 위치          | 역순 순회 종료점              |

---
# 2. 순회 테크닉 (Traversal)
## 2.1. 정방향 순회(Forward)
- 전통적 방식 : 명시적으로 반복자 선언
```cpp
for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " "; 
    // 역참조(*)를 통해 데이터 접근
}
```
## 2.2. 역방향 순회 (Reverse)
- 데이터를 물리적으로 뒤집지 않고, 
- 읽는 방향만 바꾸어 효율성을 극대화
- **장점**
	- `std::reverse()`를 호출하는 $O(N)$ 비용을 아낄 수 있음
	- 원본 배열의 순서를 유지할 수 있음
```cpp
// [17608] 막대기 문제: 오른쪽 끝부터 스캔할 때 사용
for (auto it = sticks.rbegin(); it != sticks.rend(); ++it) {
    if (*it > max_so_far) {     // 오른쪽에서 보이는 막대기 처리
	    ... 
	} 
}
```

### 순회와 정렬
- 내림차순 정렬 활용
	- `std::sort()` 함수 + 역방향 반복자
		- -> 내림차순 정렬 가능
- 원리
	- `sort()` : 반복자를 이용해서 시작부터 끝까지 "오름차순"으로 정렬
	- 역방향 반복자를 이용하면 "뒤에서 앞으로 오름차순"
		∴ 메모리상에는 큰 값부터 배치됨.

> [!fag]- \[역방향 반복자 & 내림차순 정렬\] 참고
> - [[Memory_Layout#연속적 메모리 (Contiguous Memory)]]
> - [[Sort_Functions]]

---
# 3. Range-based for loop (향상된 for문)
- C++11부터 도입
- 내부적으로 `begin()`과 `end()` 이터레이터를 자동으로 다룸
## 사용 팁
- 순회 시 데이터의 크기에 따라 참조 방식을 결정
	- **`auto item`**: 값을 복사함. 소형 데이터(int 등)에 적합.
	- **`auto& item`**: 원본을 수정해야 할 때 사용.
	- **`const auto& item`**: 복사 비용을 없애면서 안전하게 읽기 전용으로 접근.
### ex-code
```cpp
vector<int> v = {1, 2, 3, 4, 5};

// 1. 값 복사 (Pass by Value)
// 각 요소를 복사해서 가져오므로 원본 수정 불가, 대형 객체일 때 비효율적
for (auto item : v) { 
    cout << item << " "; 
}

// 2. 참조 활용 (Pass by Reference)
// 원본에 직접 접근하여 수정 가능, 복사 비용 없음
for (auto& item : v) {
    item *= 2; // 원본 값이 2배가 됨
}

// 3. 상수 참조 활용 (Pass by const Reference)
// 복사 비용을 없애면서 원본 수정도 방지함. 읽기 전용 순회에 최적
for (const auto& item : v) {
    cout << item << " ";
}
```
## `Iterator` 와의 관계 (내부 작동 원리)
- 우리가 작성한 코드는 컴파일 시 아래와 같이 이터레이터 코드로 변환되어 실행
```cpp
// User Code
for (auto& x : v) { ... }

// Internal Logic
for (auto it = v.begin(); it != v.end(); ++it) {
    auto& x = *it;
    { ... }
}
```

---
# 4. STL 알고리즘과의 협업
- 대부분의 STL 알고리즘
	- **반복자의 범위(Range)**를 입력으로 받아 동작
- **정렬**
    ```cpp
    std::sort(v.begin(), v.end())
    ```
- **부분 정렬**
	```cpp
    std::sort(v.begin(), v.begin() + 3)     // 앞의 3개 원소만 정렬
    ```
- **중복 제거**
	```cpp
	v.erase(unique(v.begin(), v.end()), v.end())
	```

---
# #Thought: 제약 사항과 설계 이유
- 왜 Queue/Stack은 이터레이터가 없는가?
	- 큐(`queue`) & 스택(`stack`)
		: 특정 지점(Top/Front)에서의 접근만을 강제하는 자료구조
	- 중간 원소를 순회하거나 접근하는 기능 제한
		∴ 해당 자료구조의 본질(LIFO/FIFO)을 유지하도록 설계되었습니다.

---

