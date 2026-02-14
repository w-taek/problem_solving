---
id: 20260215020616330000
title: Pointer_and_Reference
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
# 1. 핵심 개념 : 메모리 주소 다루기

| **연산자**    | **명칭**         | **역할**                                   | **비고**       |
| ---------- | -------------- | ---------------------------------------- | ------------ |
| `*`        | **Pointer**    | 주소값을 담는 변수 타입을 정의하거나, 주소로 가서 값을 가져옴(역참조) | "어디를 가리키는가?" |
| `&`        | **Address-of** | 변수의 실제 메모리 주소를 추출함                       | "주소가 어디인가?"  |
| `<Type>&` | **Reference**  | 기존 변수에 대한 별명을 붙임. 주소 공유                  | "또 다른 이름"    |

---
# 2. PS 활용

## `const T&` (상수 참조)
- 대형 객체 (`vector`, `struct` 등)를 함수에 전달할 때,
	- 값을 복사하면 $O(N)$의 비용이 발생
- 이를 방지하기 위해
	- `const T&`를 사용하여
		- 복사 비용 없이
		- 안전하게 읽기 전용으로 접근
### ex_code
```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Student {
    int id;
    int preference;
    string name; // 문자열이 포함되면 객체 크기가 더 커짐
};

// ❌ 나쁜 예: 값을 복사함 (Pass by Value)
// 함수를 호출할 때마다 vec 전체와 s 전체를 새로 복사함 -> O(N) 비용 발생
void printStudentBad(vector<int> vec, Student s) {
    cout << s.name << "의 점수들: ";
    for (int score : vec) cout << score << " ";
    cout << "\n";
}

// ✅ 좋은 예: 상수 참조 사용 (Pass by const Reference)
// 복사본을 만들지 않고 메모리 주소만 전달함 -> O(1) 비용
// const를 붙여서 함수 내부에서 원본 데이터가 수정되는 것을 방지함 (안전성)
void printStudentGood(const vector<int>& vec, const Student& s) {
    cout << s.name << "의 점수들: ";
    for (int score : vec) cout << score << " ";
    cout << "\n";
}

int main() {
    vector<int> scores(100000, 100); // 10만 개의 원소가 든 벡터
    Student st = {1, 2, "Alice"};
	
    // 좋은 예 호출 (성능 저하 없음)
    printStudentGood(scores, st);
	
    return 0;
}
```

## 구조체 멤버 접근 연산자 (`.` vs `->`)
- **`.` (Dot)**: 실제 객체나 참조자(`&`)를 통해 접근할 때 사용.
- **`->` (Arrow)**: 포인터(`*`)를 통해 해당 주소의 멤버에 접근할 때 사용.
### ex_code

```cpp
#include <iostream>

struct Truck {
    int id;
    int weight;
};

int main() {
    // 1. 실제 객체 (Actual Object)
    Truck t1 = {101, 7};
    cout << t1.id << "\n"; // '.' 연산자 사용

    // 2. 참조자 (Reference)
    // t1에 대한 별명일 뿐이므로 '.' 연산자를 그대로 사용
    Truck& ref = t1;
    ref.weight = 10; // t1.weight가 10으로 변경됨
    cout << ref.weight << "\n"; // '.' 연산자 사용

    // 3. 포인터 (Pointer)
    // 주소값을 들고 있으므로 '->' 연산자를 사용하거나 역참조 후 '.' 사용
    Truck* ptr = &t1;
    cout << ptr->id << "\n";      // '->' 연산자 사용 (가장 일반적)
    cout << (*ptr).id << "\n";    // 역참조(*) 후 '.' 연산자 사용 (위와 동일한 의미)

    return 0;
}
```

---
# #Thought: 포인터와 이터레이터의 관계
- **이터레이터는 포인터의 진화형인가?**
	- 이터레이터는 내부적으로 포인터를 사용하여 구현되지만, 사용자에게는 어떤 자료구조든 동일하게 보이도록 **'포인터처럼 행동하는 객체'**로 추상화된 것입니다.
	- 따라서 `*it` (역참조)이나 `++it` (다음 주소 이동) 같은 포인터의 문법을 그대로 계승한 것입니다.

---
