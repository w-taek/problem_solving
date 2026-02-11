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
# 1. C++ 프로그램의 메모리 구조
- 프로그램이 실행될 때 운영체제로부터 할당받는 영역
- 관리 방식에 따라 크게 **Stack**과 **Heap**으로 구분
## Stack vs Heap
- **Stack (스택 영역)**
    - 함수 호출 시 생성되는 지역 변수와 매개변수가 저장됨
    - 컴파일 타임에 크기가 결정되며, 함수 종료 시 자동으로 해제됨
    - 메모리 할당 속도가 매우 빠름 (단순 포인터 이동)
- **Heap (힙 영역)**
    - 사용자가 직접 관리하는 메모리 영역 (동적 할당)
    - 런타임에 크기가 결정되며, C++에서는 `new`/`delete` 또는 STL 컨테이너 내부에서 사용함
    - Stack보다 할당 속도는 느리지만, 큰 데이터를 다룰 수 있음

---
# 2. 물리적 배치: 연속적 vs 불연속적
- PS 자료구조 선택의 성능을 결정짓는 핵심 요소
## 연속적 메모리 (Contiguous Memory)
- 데이터가 메모리 상에 빈틈없이 나란히 배치됨
- **장점**
    - **Random Access**: 인덱스로 즉시 접근 가능 ($O(1)$)
    - **Cache Locality**: 인접한 데이터가 캐시에 함께 올라와 연산 속도가 매우 빠름
- **단점**
    - 중간 삽입/삭제 시 뒤쪽 데이터를 모두 밀어야 함 ($O(N)$)
    - 공간 부족 시 전체를 새 장소로 복사(Reallocation)해야 함
## 불연속적 메모리 (Non-contiguous Memory)
- 데이터가 메모리 여러 곳에 흩어져 있고, 주소(Pointer)로 연결됨
- **장점**
    - 삽입/삭제 시 주소값만 바꿔주면 됨 ($O(1)$)
    - 대규모 재할당(이사)이 필요 없음        
- **단점**
    - **Random Access 불가**: 특정 위치를 찾으려면 처음부터 타고 가야 함 ($O(N)$)
    - 캐시 효율이 낮음 (데이터가 멀리 떨어져 있음)

---
# 3. PS 자료구조와의 연결
- 메모리 구조에 따른 컨테이너별 특징

| **컨테이너**     | **메모리 구조**      | **주요 특징**                    |
| ------------ | --------------- | ---------------------------- |
| **`vector`** | 완전 연속적          | 인덱스 접근 최강, 중간 삽입 취약          |
| **`deque`**  | 부분 연속적 (블록 체인)  | 앞/뒤 삽입 $O(1)$, 메모리 재할당 비용 적음 |
| **`list`**   | 완전 불연속적 (노드 기반) | 삽입/삭제 최강, 탐색/접근 최약           |

---
# 4. 관련 문법 코드 예시

## 정적 할당 vs 동적 할당

```cpp
// 1. Stack 할당 (정적)
int arr[100]; // 컴파일 타임에 100개 크기 고정

// 2. Heap 할당 (동적)
int* ptr = new int[n]; // 런타임에 n만큼 할당
delete[] ptr; // 사용 후 반드시 해제 (STL은 자동 관리)
```
## 메모리 연속성 증명

```cpp
vector<int> v = {10, 20, 30};
// 주소값을 출력해보면 데이터 크기(4byte)만큼 딱 붙어 있음을 확인 가능
cout << &v[0] << endl;
cout << &v[1] << endl;
cout << &v[2] << endl;
```

---
# #Thought
- **캐시 효율의 위력**: 이론적으로 `list`의 삽입이 $O(1)$이라 빨라 보이지만, 실제 PS에서는 메모리가 연속적인 `vector`가 캐시 적중률 덕분에 웬만한 작업에서 더 압도적인 성능을 보임.
- **데이터 이동의 비용**: `[26042]` 문제에서 `vector` 대신 `deque`를 쓴 이유는, 메모리가 연속적인 배열 구조에서 "앞부분을 삭제"할 때 발생하는 데이터 대이동 비용을 피하기 위함이었음.

---

