// =========================
// 채용 공고 JSON 데이터
// =========================
const mainJobs = [
  {
    company: "레미안크레시티",
    title: "[서울] 시설기사_경력",
    location: { city: "서울", district: "동대문구" },
    position: "시설기사",
    salary: { amount: 2990000, currency: "KRW", tax_included: false },
    experience: "경력 3년 이상",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=1" },
  },
  {
    company: "신평신성미소지움아파트",
    title: "사설주임 구인합니다",
    location: { city: "충남", district: "당진시" },
    position: "시설관리",
    salary: { amount: 3300000, currency: "KRW", tax_included: false },
    experience: "경력 무관",
    education: "고졸 이상",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=2" },
  },
  {
    company: "강서동광모닝스카이",
    title: "경리과장(회계)모집",
    location: { city: "세종", district: "세종시" },
    position: "경리과장",
    salary: { amount: 2850000, currency: "KRW", tax_included: false },
    experience: "경력 5년 이상",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=3" },
  },
  {
    company: "계약센트레빌2단지아파트",
    title: "전기과장(격일제) 구인",
    location: { city: "인천", district: "계양구" },
    position: "전기과장",
    salary: { amount: 3678000, currency: "KRW", tax_included: false },
    experience: "경력 무관",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=4" },
  },
  {
    company: "하안주공1단지",
    title: "전기팀장님을 모십니다(급구)",
    location: { city: "경기", district: "광명시" },
    position: "전기팀장",
    salary: { amount: 4190000, currency: "KRW", tax_included: false },
    experience: "경력 10년 이상",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=5" },
  },
  {
    company: "양주옥정메타엑스지식산업센터",
    title: "기전대리 구인",
    location: { city: "경기", district: "양주시" },
    position: "시설기사",
    salary: { amount: 2350000, currency: "KRW", tax_included: false },
    experience: "경력 무관",
    education: "고졸 이상",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=6" },
  },
  {
    company: "가경뜨란채7단지",
    title: "경비원 채용",
    location: { city: "충북", district: "청주시" },
    position: "경비원",
    salary: { amount: 2350000, currency: "KRW", tax_included: false },
    experience: "경력 무관",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=7" },
  },
  {
    company: "힐스테이트인천시청역",
    title: "격일제 기전주임 채용(2인1조)_즉시근무가능자 우대",
    location: { city: "인천", district: "남동구" },
    position: "기전주임",
    salary: { amount: 3678000, currency: "KRW", tax_included: false },
    experience: "경력 3년 이상",
    education: "학력 무관",
    deadline: "2025-12-31",
    button: { text: "상세보기", url: "detailPage.html?no=8" },
  },
];

// =========================
// 랜덤 선택 함수
// =========================
function getRandomItems(array, count) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

// =========================
// 카드 생성 함수 (최적화)
// =========================
function renderJobs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = new Date();
  const validJobs = mainJobs.filter((job) => {
    const [y, m, d] = job.deadline.split("-").map(Number);
    const deadlineDate = new Date(y, m - 1, d, 23, 59, 59);
    return deadlineDate >= now;
  });

  let jobsToShow = [];
  if (validJobs.length === 0) {
    jobsToShow = [{ preparation: true }, { preparation: true }];
  } else if (validJobs.length === 1) {
    jobsToShow = [validJobs[0], { preparation: true }];
  } else {
    jobsToShow = getRandomItems(validJobs, 6);
    if (jobsToShow.length % 2 !== 0) jobsToShow.push({ preparation: true });
  }

  container.innerHTML = "";

  const fragment = document.createDocumentFragment();
  jobsToShow.forEach((job) => {
    const card = document.createElement("div");

    if (job.preparation) {
      card.className = "main-card-preparation";
      card.textContent = "준비중";
    } else {
      card.className = "main-card";
      card.innerHTML = `
        <div class="main-card-header">${job.company}</div>
        <div class="main-card-title">${job.title}</div>
        <div class="main-card-info">
          <div class="main-card-info-left">
            ${job.location.city} > ${job.location.district} | ${job.position}<br>
            월 ${job.salary.amount.toLocaleString()} (${job.salary.tax_included ? "세후" : "세전"})<br>
            ${job.experience} | ${job.education}
          </div>
          <div class="main-card-info-right">
            <span class="main-deadline">~ ${job.deadline.slice(5)}</span>
            <button class="btn main-btn" onclick="location.href='${job.button.url}'">
              ${job.button.text}
            </button>
          </div>
        </div>
      `;
    }

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

// =========================
// 준비중 애니메이션
// =========================
let prepInterval;
function startPreparationAnimation() {
  if (prepInterval) clearInterval(prepInterval);
  const prepCards = document.querySelectorAll(".main-card-preparation");
  let dots = 0;
  prepInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    prepCards.forEach(
      (card) => (card.textContent = "준비중" + ".".repeat(dots))
    );
  }, 500);
}

// =========================
// 초기 렌더링
// =========================
function initJobs() {
  renderJobs("job-list");
  startPreparationAnimation();
  setInterval(() => {
    renderJobs("job-list");
    startPreparationAnimation();
  }, 2 * 60 * 1000);
}

// =========================
// DOM 로드 후 실행
// =========================
initJobs();
