---
id: 20260215020616600000
title: Pair_and_Tuple
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
# 1. std::pair
- 두 개의 서로 다른 타입의 데이터를 하나로 묶어주는 템플릿 클래스
- `STL <utility>` 헤더에 포함됨
## 기본 문법
```cpp
#include <utility>

// 1. 선언 및 초기화
std::pair<int, int> p1 = {1, 2}; 
std::pair<int, string> p2 = make_pair(10, "Alice"); // make_pair 활용

// 2. 멤버 접근
int first_val = p1.first;   // 첫 번째 인자
int second_val = p1.second; // 두 번째 인자

// 3. 중첩 사용 (데이터가 3개인 경우의 임시 방편)
pair<int, pair<int, int>> triple = {1, {2, 3}};
```

---
# 2. PS 실전 비교: Pair vs Struct
## `std::pair` 활용 시점
- 별도의 구조체 선언 없이 빠르게 데이터를 묶고 싶을 때
- 2개의 데이터만 다루며, `first`와 `second`로 의미 전달이 충분할 때
- `std::sort`를 활용하여 사전순(Lexicographical) 정렬이 필요할 때
## `struct` 활용 시점
- 다루는 데이터가 3개 이상일 때
- 멤버 변수에 직관적인 이름(예: `weight`, `left_len`)을 부여해 가독성을 높이고 싶을 때
- 복잡한 상태 변화나 시뮬레이션 로직이 포함될 때

---
# 3. 정렬 로직 (Lexicographical Order)

- `pair`는 별도의 비교 함수 없이도 `std::sort` 사용 시 자동 정렬 지원
    
- 정렬 우선순위: `first` 기준 오름차순 → `first`가 같으면 `second` 기준 오름차순
    
- 코드 예시 (좌표 정렬):

```cpp
vector<pair<int, int>> points = {{1, 5}, {1, 2}, {3, 3}};

sort(points.begin(), points.end()); 
// 결과: {1, 2}, {1, 5}, {3, 3}
```

---
# 4. Structured Binding (C++17)
- `first`, `second` 대신 직관적인 변수 이름을 즉시 할당하는 문법
- 가독성 향상 및 코드 길이 단축에 효과적

```cpp
pair<int, int> student = {10, 1}; // {id, menu}

// 구조 분해 할당 적용
auto [id, menu] = student; 
cout << "학생 번호: " << id << ", 선호 메뉴: " << menu;
```

---
# 5. std::tuple
- 3개 이상의 데이터를 하나로 묶을 때 사용
- `STL <tuple>` 헤더 사용

## 기본 문법
```cpp
#include <tuple>

// 1. 선언 및 초기화
tuple<int, int, int> t = {10, 20, 30};

// 2. 데이터 접근 (std::get<인덱스> 활용)
int first = get<0>(t);
int second = get<1>(t);

// 3. 변수에 한 번에 할당 (std::tie)
int a, b, c;
tie(a, b, c) = t; 

// 4. 구조 분해 할당 (C++17 이상 권장)
auto [val1, val2, val3] = t;
```

---
# #Thought

- **구조체의 이점**: [13335] 트럭 문제에서 `pair`를 중첩해 썼다면 `truck.first.second` 같은 난해한 코드가 나왔겠지만, `struct`를 사용해 `truck.left_len`으로 표현한 것은 가독성 측면에서 나을 수 있음
- **데이터 패키징**: `pair`는 알고리즘의 '부품'으로, `struct`는 문제의 '모델'로 접근하는 것이 PS의 정석임.