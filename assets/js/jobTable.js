// premium job data
// 오늘 날짜 가져오기
const today = new Date();

// 모든 카드 선택
const cards = document.querySelectorAll('.premium-card');

cards.forEach(card => {
  const dateDiv = card.querySelector('.premium-date');
  if (!dateDiv) return;

  // "09.01 ~ 09.30" 형태
  const dateText = dateDiv.textContent.trim();
  const [start, end] = dateText.split('~').map(d => d.trim());

  // 연도 붙이기 (현재 연도 기준)
  const currentYear = new Date().getFullYear();
  const endDateParts = end.split('.');
  const endDate = new Date(currentYear, parseInt(endDateParts[0]) - 1, parseInt(endDateParts[1]));

  // 종료일 지났으면 카드 제거
  if (today > endDate) {
    card.remove();
  }
});

const jobs = [
  {
    no: 1,
    title: "경기_경리(경력)",
    region: "경기 > 하남시",
    jobType: "경리",
    salary: "월 4,686,350 (세전)",
    company: "압구정신현대",
    apartmentSize: "1,942",
    endDate: "2025-12-31",
    detailUrl: "detail1.html",
  },
  {
    no: 2,
    title: "서울_사무직",
    region: "서울 > 강남구",
    jobType: "사무직",
    company: "현대아파트",
    salary: "월 3,200,000 (세전)",
    apartmentSize: "214",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 3,
    title: "시설주임 구인합니다.",
    region: "충남 > 당진시",
    jobType: "시설주임",
    company: "신평신성미소지움아파트",
    salary: "월 3,400,000 (세전)",
    apartmentSize: "409",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 4,
    title: "경리과장(회계)모집",
    region: "세종 > 세종시",
    jobType: "경리",
    company: "강서동광모닝스카이",
    salary: "월 2,850,000 (세전)",
    apartmentSize: "734",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 5,
    title: "전기과장(격일제)구인",
    region: "인천 > 계양구",
    jobType: "전기과장",
    company: "계양센트레빌2단지아파트",
    salary: "월 3,678,000 (세전)",
    apartmentSize: "256",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 6,
    title: "전기팀장님을 모십니다(급구)",
    region: "경기 > 광명시",
    jobType: "전기팀장",
    company: "하안주공1단지",
    salary: "월 4,190,000 (세전)",
    apartmentSize: "1,980",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 7,
    title: "기전대리 구인",
    region: "경기 > 양주시",
    jobType: "기전대리",
    company: "양주옥정메타엑스지식산업센터",
    salary: "월 3,250,000 (세전)",
    apartmentSize: "500",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 8,
    title: "경비원 채용",
    region: "충북 > 청주시",
    jobType: "경비원",
    company: "가경뜨란채7단지",
    salary: "월 2,350,000 (세전)",
    apartmentSize: "370",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 9,
    title: "격일제 기전주임 채용(2인1조)_즉시근무가능자 우대",
    region: "인천 > 남동구",
    jobType: "기전주임",
    company: "힐스테이트인천시청역",
    salary: "월 3,284,830 (세전)",
    apartmentSize: "746",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  },
  {
    no: 10,
    title: "기전직 직원구인",
    region: "서울 > 서초구",
    jobType: "기전직",
    company: "서초진흥",
    salary: "월 3,120,000 (세전)",
    apartmentSize: "615",
    endDate: "2025-12-31",
    detailUrl: "detail2.html",
  }
];

const tableBody = document.getElementById("jobTable");

jobs.forEach((job) => {
  const end = new Date(job.endDate);
  const expired = end < today; // 오늘까지는 지원 가능

  const tr = document.createElement("tr");

  // ✅ 클릭 이벤트: 상세페이지 이동
  tr.addEventListener("click", () => {
    window.location.href = job.detailUrl;
  });

  // ✅ 마감일 스타일 조건 적용
  const endDateHtml = expired
    ? job.endDate
    : `<span style="color: red; font-weight: bold;">${job.endDate}</span>`;

  tr.innerHTML = `
    <td>${job.no}</td>
    <td class="title">${job.title}</td>
    <td>${job.region}</td>
    <td>${job.jobType}</td>
    <td>${job.salary}</td>
    <td class="company">${job.company}</td>
    <td>${job.apartmentSize}</td>
    <td class="end-date">${endDateHtml}</td>
    <td>
      ${
        expired
          ? `<button class="btn btn-expired">마감</button>`
          : `<button class="btn btn-apply">상세보기</button>`
      }
    </td>
  `;

  tableBody.appendChild(tr);
});
