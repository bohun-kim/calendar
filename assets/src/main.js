const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

// 오늘 날짜 받아오기
let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth(); // getMonth() 는 월을 나타내는 메서드인데 0월부터 시작하기 때문에 +1 을 해줌

// 오늘 날짜 화면에 출력
const renderCalendar = () => {
  // firstDayOfMonth 에서 .getDay()는 요일을 정수로 나타내는 메소드로 해당 월에 1일에 해당하는 요일을
  //  정수로 리턴값을 받는다. (일요일은 0, 월요일은 1, 화요일은 2, ...)
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  // 현재달의 1일의 요일에 해당하는 정수 리턴값을 i 에 대입해주고, i (현재달의 1일의 요일을 정수로 반환한 값) 값
  // 의 수만큼 이전달의 마자막 날의 값에서 i 값을 반복해서 빼주면 현재달에 보여지는 전달 일(day)이 나온다.
  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  // 이번 달 마지막날의 요일의 정수 (=lastDayOfMonth) 의 6미만의 수만큼 반복을 하는데
  // 이 때 반복될때 i 값을 이번 달 마지막날의 요일의 정수 (=lastDayOfMonth) 를 다시 빼주고
  // + 1 을 해주면 해당 월의 마지막 날에서 다음 달 토요일 전까지의 값이 나온다.
  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${currYear}년 ${currMonth + 1}월`;
  daysTag.innerHTML = liTag;
};

renderCalendar();

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
