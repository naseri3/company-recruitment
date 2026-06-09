/* ===============================
   1️⃣ JSON 데이터
=============================== */
const directorList = [
  {
    id: 301,
    title: "관리소장 경력직 채용",
    area: "서울 > 서초구",
    position: "시설관리",
    salary: "월급 420만원(세전)",
    complexName: "래미안 서초 에스티지",
    experience: "경력 5년 이상",
    complexSize: 820,
    registerDate: "2026-06-08",
    deadline: "2026-12-31",
    isClosed: false
  }, /*
  {
    id: 302,
    title: "아파트 관리소장 모집",
    area: "경기 > 성남시 분당구",
    position: "기전과장",
    salary: "월급 480만원(세전)",
    complexName: "힐스테이트 판교",
    experience: "경력 무관",
    complexSize: 980,
    registerDate: "2026-06-07",
    deadline: "2026-12-31",
    isClosed: false
  },
  {
    id: 303,
    title: "주택관리사(보) 소장 채용",
    area: "경기 > 수원시 영통구",
    position: "전기기사",
    salary: "월급 390만원(세전)",
    complexName: "광교 자이",
    experience: "경력 3년 이상",
    complexSize: 740,
    registerDate: "2026-06-06",
    deadline: "2026-12-31",
    isClosed: false
  },
  {
    id: 304,
    title: "공동주택 관리소장 모집",
    area: "서울 > 마포구",
    position: "관리과장",
    salary: "월급 410만원(세전)",
    complexName: "마포 래미안 푸르지오",
    experience: "경력 무관",
    complexSize: 690,
    registerDate: "2026-06-05",
    deadline: "2026-12-31",
    isClosed: false
  },
  {
    id: 305,
    title: "아파트 소장 채용",
    area: "경기 > 화성시",
    position: "시설과장",
    salary: "월급 395만원(세전)",
    complexName: "동탄 센트럴자이",
    experience: "경력 무관",
    complexSize: 950,
    registerDate: "2026-06-04",
    deadline: "2026-12-31",
    isClosed: false
  }
    */
];


/* ===============================
   컨테이너 선택
=============================== */
const container = document.querySelector('.director-card-list');


/* ===============================
   날짜 포맷 (05.31)
=============================== */
function formatDate(dateStr) {
    return dateStr.slice(5).replace("-", ".");
}


/* ===============================
   마감 여부 체크
=============================== */
function isExpired(dateStr) {
    const now = new Date();
    const endDate = new Date(dateStr + "T23:59:59");

    return now > endDate;
}


/* ===============================
   빈 카드 생성
=============================== */
function createEmptyCard() {
    return `
        <div class="director-card director-card--empty subDirector-card">
            <div class="director-card__empty">
                <img
                    class="job-card__img"
                    src="/assets/img/ssyong.png"
                    alt="공고 준비중 로고"
                />

                <span class="job-card__empty-text">
                    진행 중인 소장 채용공고가 없습니다.
                </span>
            </div>
        </div>
    `;
}


/* ===============================
   빈 카드 렌더링
=============================== */
function renderEmptyCards(count = 3) {
    for (let i = 0; i < count; i++) {
        container.insertAdjacentHTML('beforeend', createEmptyCard());
    }
}


/* ===============================
   카드 렌더링
=============================== */
function renderDirectorCards(list) {
    if (!container) return;

    container.innerHTML = '';

    /* ---------- 데이터가 아예 없을 때 ---------- */
    if (!list || list.length === 0) {
        renderEmptyCards(3);
        return;
    }

    /* ---------- 마감 공고 제외 ---------- */
    const filteredList = list.filter(item => {
        if (item.isClosed) return false;
        if (isExpired(item.deadline)) return false;

        return true;
    });

    /* ---------- 노출 가능한 공고가 없을 때 ---------- */
    if (filteredList.length === 0) {
        renderEmptyCards(3);
        return;
    }

    /* ---------- 카드 생성 ---------- */
    filteredList.forEach(item => {
        const registerDateText = formatDate(item.registerDate);
        const deadlineText = formatDate(item.deadline);

        const cardHTML = `
            <a href="/detailPage.html?id=${item.id}" 
               class="director-card-link">

                <div class="director-card subDirector-card">

                    <div class="director-card__top">
                        <span class="director-card__company">
                            ${item.complexName}
                        </span>
                    </div>

                    <h3 class="director-card__title">
                        ${item.title}
                    </h3>

                    <div class="director-card__tags">
                        <span class="tag">${item.area} |</span>
                        <span class="tag">${item.experience} |</span>
                        <span class="tag">${item.salary}</span>
                    </div>

                    <div class="director-card__bottom">
                        <span class="director-card__dday">
                            ${registerDateText} ~ ${deadlineText}
                        </span>

                        <button class="director-card__detail">
                            상세보기
                        </button>
                    </div>

                </div>

            </a>
        `;

        container.insertAdjacentHTML('beforeend', cardHTML);
    });

    /* ---------- 빈 카드 계산 ---------- */
    const remainder = filteredList.length % 3;
    let emptyCount = 0;

    if (remainder === 1) emptyCount = 2;
    if (remainder === 2) emptyCount = 1;

    /* ---------- 빈 카드 생성 ---------- */
    renderEmptyCards(emptyCount);
}


/* ===============================
   실행
=============================== */
document.addEventListener('DOMContentLoaded', () => {
    renderDirectorCards(directorList);
});