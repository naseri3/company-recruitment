// 공지사항 롤링
const noticeList = document.getElementById("noticeList");
const notices = noticeList.children;
const noticeHeight = 40; // 공지 하나 높이
let index = 0;

function rollNotice() {
  index++;
  if (index >= notices.length) {
    index = 0;
  }
  noticeList.style.transition = "top 0.5s";
  noticeList.style.top = `-${noticeHeight * index}px`;
}

// 공지 개수가 끝나면 첫 번째로 돌아가기 위해 setInterval 사용
setInterval(() => {
  rollNotice();
}, 3000); // 3초마다 롤링