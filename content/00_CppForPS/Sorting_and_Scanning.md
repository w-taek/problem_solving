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
## 1. 차원 제거 (Dimension Reduction)
- 두 가지 변수 중 하나를 정렬함으로써
- 비교 대상에서 제외
## 2. 기준값 유지 (Maintaining Invariants)
- 순회하며 현재까지의 최댓값/최소값만 변수로 관리

## 3. 복잡도 전이
- 원래는 $O(N^2)$ 의 비교 연산
	- 정렬 $O(N \log N)$
	- 스캔 $O(N)$
	- 으로 변환 

## 4. 대표 사례
- BOJ
	- 신입 사원(1946)
	- 회의실 배정(1931)
	- 선 긋기(2170)