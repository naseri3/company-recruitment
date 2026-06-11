let directorList = [];

/* ===============================
   컨테이너 선택
=============================== */
const container = document.querySelector('.director-card-list');

/* ===============================
   JSON 로드
=============================== */
async function loadDirectorJobs() {
    try {
        const response = await fetch("/assets/data/director_jobs.json");

        if (!response.ok) {
            throw new Error("소장 채용 데이터 로드 실패");
        }

        directorList = await response.json();

        renderDirectorCards(directorList);
    } catch (error) {
        console.error("JSON 로드 실패:", error);
        renderEmptyCards(3);
    }
}

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
                <img class="job-card__img" src="/assets/img/ssyong.png"
                    alt="공고 준비중 로고" />

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
    if (!container) return;

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

    if (!list || list.length === 0) {
        renderEmptyCards(3);
        return;
    }

    const filteredList = list.filter(item => {
        if (item.isClosed) return false;
        if (isExpired(item.deadline)) return false;

        return true;
    });

    if (filteredList.length === 0) {
        renderEmptyCards(3);
        return;
    }

    filteredList.forEach(item => {
        const registerDateText = formatDate(item.registerDate);
        const deadlineText = formatDate(item.deadline);

        const cardHTML = `
            <a href="/recruit_detail.html?id=${item.id}" 
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

    const remainder = filteredList.length % 3;
    let emptyCount = 0;

    if (remainder === 1) emptyCount = 2;
    if (remainder === 2) emptyCount = 1;

    renderEmptyCards(emptyCount);
}

/* ===============================
   실행
=============================== */
document.addEventListener('DOMContentLoaded', () => {
    loadDirectorJobs();
});