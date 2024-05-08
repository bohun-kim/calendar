# calendar

![](https://velog.velcdn.com/images/bohun-kim/post/5e320412-8147-4b85-a672-0c57d5acd9c7/image.png)

[프로젝트 구경하기](https://bohun-kim.github.io/calendar/)

현재 달(月) 과 일(日) 을 표시해주는 달력입니다.

# 목표

- HTML, CSS, Javascript 만을 이용한 웹앱 만들기
- Date 객체를 이용하여 날짜 데이터 최신화

# 사용기술

- HTML, CSS, Javascript

# 주요기능

- [현재 년도 월 출력](#현재-년도-월-출력)
- [화살표 클릭 시 다음 월, 일 출력](#화살표-클릭-시-다음-월-일-출력)
- [현재 월에 해당하는 일 출력](#현재-월에-해당하는-일-출력)

# 현재 년도 월 출력

![](https://velog.velcdn.com/images/bohun-kim/post/c501704d-dd08-4d33-86a9-ce0f39c7bf36/image.png)

```html
<header>
  <p class="current-date"></p>
  <div class="icons">
    <span id="prev" class="material-symbols-outlined"> chevron_left </span>
    <span id="next" class="material-symbols-outlined"> chevron_right </span>
  </div>
</header>
```

```js
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

// 오늘 날짜 받아오기
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

// 오늘 날짜 화면에 출력
const renderCalendar = () => {
    .
    .
    .
  currentDate.innerText = `${currYear}년 ${currMonth + 1}월`;
};

// header 현재 월, 일 출력
prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
```

1. .current-date 클래스를 querySelector 로 선택하여 currentDate.innerText 로 DOM 조작하여 화면에 출력합니다.

2. 전, 후 버튼을 클릭했을 때 icon.id 가 "prev" 라면 현재 currMonth 값에서 -1 하고 그 반대인 id("next") 라면 +1 을 해줍니다.

3. 1월~12월이 지날때 13월이라는 값은 없기 때문에 다음해의 1월로 변경되기 위해서 currMonth 값이 0보다 작거나 11 보다 클 때 출력되는 값을 새로 Date 값을 받아와서 출력한다. </br>
   (currMonth > 11 이 12가 아닌 11인 이유는 getMonth() 메소드를 불러올 때 1월 부터 시작하는 것이 아닌 0부터 시작하기 때문에 12가 아닌 11부터 시작합니다.)

# 현재 월에 해당하는 일 출력

![](https://velog.velcdn.com/images/bohun-kim/post/0f99a969-374a-4a40-933d-05643ad859b1/image.png)

```js
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

// 오늘 날짜 화면에 출력
const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  // 1번
  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // 2번
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  // 3번
  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${currYear}년 ${currMonth + 1}월`;
  daysTag.innerHTML = liTag;
};

renderCalendar();
```

renderCalender() 함수는 현재 월에 해당하는 일을 나타내는 함수입니다.

- 1번 : 현재 월의 기준으로 1일 기준으로 이전 월의 1일 이전의 일을 출력합니다.
- 2번 : 현재 월의 기준으로 전체 일(日)을 출력합니다.
- 3번 : 현재 월의 기준으로 이전 달의 마지막 일의 요일을 인덱스 값으로 가져와서 인덱스 값이 6이 되기 전까지 반복하여 더해진 i 값에서 다시 마지막 일의 요일의 인덱스 값을 빼주고 다시 + 1 을 더한 값을 반복된 수 만큼 보여줍니다.
