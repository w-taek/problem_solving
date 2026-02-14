---
id: 20260215020616933000
title: Custom_Comparator
date: 2026-02-15
comments: true
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

## Strict Weak Ordering (엄격한 약순서)
### **정의**
- C++ STL의 
	- 정렬 알고리즘 `std::sort` 
	- 또는
	- 연관 컨테이너`std::map`, `std::set`
	- 가 
- 정상적으로 동작하기 위해 
- 비교 함수가 반드시 만족해야 하는 수학적 조건
### **규칙**
#### 1. **비반사성 (Irreflexivity)**
- **정의**
	- 모든 $a$에 대해 `f(a, a)`는 항상 `false`
- **의미**
	- 자기 자신보다 우선순위가 높을 수는 없음
- **주의**
	- 만약 `a <= b`와 같이 같은 값에 대해 `true`를 반환하도록 설계하면, 
	- 정렬 과정에서 요소 간의 위치를 무한히 교환하려 시도하다가 
	- **런타임 에러(Segmentation Fault)**가 발생
#### 2. **비대칭성 (Asymmetry)**
- **정의**
	- `f(a, b)`가 `true`이면 
	- `f(b, a)`는 반드시 `false`
- **의미**
	- 두 요소의 우선순위 관계는 일관되어야 함
	- 서로가 서로보다 앞설 수는 없음
#### 3. **이행성 (Transitivity)**
- **정의**
	- `f(a, b)`가 `true`이고 `f(b, c)`가 `true`이면, 
	- `f(a, c)`는 반드시 `true`
- **의미**
	- 우선순위의 논리적 흐름이 끊기지 않고 연결되어야 함
#### 4. **동치 관계의 이행성 (Transitivity of Equivalence)**
- **정의**
	- `f(a, b)`가 `false`이고 `f(b, a)`가 `false`이면 
		- $a, b$는 같은 순위(equivalent)로 간주
	- 이때 $a \equiv b$ 이고 $b \equiv c$이면 
		- $a \equiv c$ 여야 함
## 비교 함수의 반환 의미
### `true` 반환 : "우선순위 선점"
- **논리**
	- `comp(a, b)`가 `true`라면, 
	- 정렬된 결과에서 **`a`가 `b`보다 반드시 앞(왼쪽)**에 위치해야 함
- **결과**
	- 오름차순 정렬($1, 2, 3...$)을 원할 경우
	- `a < b`일 때 `true`를 반환하도록 설계
### `false` 반환 : "현상 유지 또는 후순위"
- **논리**
	- `comp(a, b)`가 `false`라면, 
	- `a`가 `b`보다 반드시 앞에 올 필요가 없음을 의미
- **결과**
	- `a`와 `b`의 위치가 바뀌거나(후순위), 
	- 두 값이 논리적으로 같아서 순서가 중요하지 않은 상태(동치)
### ex_code
```cpp
bool compare(int a, int b) {
    if (a < b) return true;  // a가 작으면 무조건 앞에 둬라 (오름차순)
    return false;            // 그 외(a가 크거나 같으면)는 앞에 둘 필요 없다
}
```
## 효율적인 인자 전달 (Performance)
### **상수 참조자 (const reference)**
- **정의**
	- 인자를 전달할 때 `(T a, T b)` 대신 
	- `(const T& a, const T& b)` 사용
- **이유**
	- 문자열(string)이나 구조체와 같은 큰 데이터를 복사할 때 발생하는 불필요한 메모리 오버헤드를 방지
- **Const Correctness**
	- 비교 함수 내부에서 원본 데이터를 실수로 수정하는 것을 방지
	- 코드의 안정성을 높임

---
# 2. 구현 형태

## 2.1. 전역 함수 (Global Function)
- 특징
	- 가장 직관적이고 일반적인 방식
	- `std::sort()`의 세 번째 인자로 함수 이름을 넘김
- 장점
	- 가독성
	- 재사용 가능
```cpp
bool compare(const int& a, const int& b) {
    return a > b; // 내림차순
}

// 사용 예시
sort(vec.begin(), vec.end(), compare);
```
## 람다 함수 (Lambda Expression)
- 특징
	- 함수 내부에서 즉석으로 정의하는 익명함수 (C++11 이상)
- 장점
	- 일회성 로직 작성 시, 보다 간결
```cpp
// 사용 예시
sort(vec.begin(), vec.end(), [](const string& a, const string& b) {
    return a.length() < b.length(); // 길이 오름차순
});
```
## 함수 객체 (Comparator Struct)
- 특징
	- `operator()`를 오버로딩한 구조체(`sturct`)
- 장점
	- 연관 컨테이너 `std::set`, `std::map`
		- 또는
	- 데이터 개조 어댑터 `std::priority_queue`
	- 의
	- 템플릿 인자로 정렬 기준을 주입할 때
	- 반드시 필요
```cpp
struct CustomOrder {
    bool operator()(const int& a, const int& b) const {
        return a > b; 
    }
};

// 사용 예시 (컨테이너 선언 시 정렬 기준 주입)
priority_queue<int, vector<int>, CustomOrder> pq;
```

---

# 3. 조건 구성 방식
## 단일 조건 정렬
```cpp
bool compare(int a, int b) {
    return a < b; // 오름차순 (단순 크기 비교)
}
```

## 다중 조건 정렬 (Hierarchical Sorting)
- 여러 기준이 존재할 때
- 상위 조건이 
	- 일치하지 '않을 때만' 
		- 결과를 반환
	- 일치하면
		- 다음 조건으로 넘어감
```cpp
// [예시] 1순위: 빈도수 내림차순, 2순위: 사전순 오름차순
bool compare(const pair<string, int>& a, const pair<string, int>& b) {
    if (a.second != b.second) {
        return a.second > b.second; // [1순위] 다르면 즉시 반환
    }
    return a.first < b.first;       // [2순위] 1순위가 같으면 2순위로 결정
}
```
## Priority Queue에서의 반환
(추후 작성 예정)    

---

# 4. 주의사항
## Strict Weak Ordering 위반 사례
```cpp
// 위험한 코드: 비반사성 위반
bool bad_compare(int a, int b) {
    // a와 b가 같을 때도 true를 반환함
    // std::sort는 "누가 더 앞인가?"를 묻는데 둘 다 앞이라고 답하면 충돌 발생
    return a <= b; 
}
```

