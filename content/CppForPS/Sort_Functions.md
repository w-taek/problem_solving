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
---
- Go to MOC
	- [[C++_Index]]
---
# 1. 핵심 개념

---
# 2. 기본 정렬

---
# 3. 내림차순 정렬

## 3.1. 역방향 반복자 (`rbegin()`, `rend()`)

> [!fag]- \[역방향 반복자\] 참고
> - [[Iterator_Interface## 2.2. 역방향 순회 (Reverse)]]

- `std::sort()`
> [!fag]- `std::sort` 공식 문서
> - [https://en.cppreference.com/w/cpp/header/algorithm.html "cpp/header/algorithm"](https://en.cppreference.com/w/cpp/algorithm/sort.html)
	- 첫번째 인자(시작)부터 두 번째 인자(끝)까지 가면서,
	- 값을 '키우는' 방향으로 정렬
- `rbegin()` : `마지막 원소`를 가리킴
- `rend()` : `첫 번째 원소보다 한 칸 앞`의 가상의 위치를 가리킴
- ∴ "뒤에서부터 앞으로" 가면서 값을 키움
- 결과적으로 배열의 앞쪽에는 큰 값이 남게 됨
  즉, ==내림차순 정렬==됨


---
# 4. 사용자 정의 정렬

---
# 5. 특수 정렬 알고리즘

---
# 6. PS 테크닉

---

