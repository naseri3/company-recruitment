// 오늘 날짜
const today = new Date();

// JSON 데이터 저장용
let jobsList = [];

// 요소 선택
const tableBody = document.getElementById("jobTableBody");
const pagination = document.querySelector(".pagination");
const pageSizeSelect = document.getElementById("pageSize");
const statusRadios = document.querySelectorAll('input[name="status"]');

// 설정
let pageSize = pageSizeSelect ? parseInt(pageSizeSelect.value) : 10;
let currentPage = 1;
let currentStatus = "전체";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// JSON 로드
async function loadJobs() {
  try {
    const response = await fetch("/assets/data/jobs.json");

    if (!response.ok) {
      throw new Error("데이터 로드 실패");
    }

    jobsList = await response.json();

    // JSON 데이터 불러온 뒤 렌더링
    renderJobs();
  } catch (error) {
    console.error("JSON 로드 실패:", error);
  }
}

// ===================================
// 필터 적용 함수
// ===================================
function getFilteredJobs() {
  return jobsList.filter(job => {
    if (!job.endDate) return true;

    const end = new Date(job.endDate);
    end.setHours(23, 59, 59, 999);

    return today <= end;
  });
}

// ===================================
// 목록 렌더링
// ===================================
function renderJobs() {
  tableBody.innerHTML = "";

  const filtered = getFilteredJobs();

  const pageData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (filtered.length === 0) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td colspan="9" style="text-align:center; padding:20px; color:#333; font-size:16px">
        해당 공고가 없습니다.
      </td>
    `;

    tableBody.appendChild(tr);

    if (pagination) {
      pagination.innerHTML = "";
    }

    return;
  }

  pageData.forEach(job => {
    const end = new Date(job.endDate);
    end.setHours(23, 59, 59, 999);

    const expired = today > end;
    const isFavorite = favorites.includes(job.title);

    const tr = document.createElement("tr");

    tr.addEventListener("click", (e) => {
      if (e.target.classList.contains("favorite-star")) return;
      window.location.href = job.detailUrl;
    });

    const endDateHtml = expired
      ? `<span style="color:#999;">${job.endDate}</span>`
      : `<span style="color:red; font-weight:bold;">${job.endDate}</span>`;

    const buttonHtml = expired
      ? `<button class="btn btn-expired">마감</button>`
      : `<button class="btn btn-apply">상세보기</button>`;

    tr.innerHTML = `
      <td class="favorite" style="text-align:center;">
        <span class="favorite-star ${isFavorite ? "active" : ""}" title="즐겨찾기">
          ★
        </span>
      </td>
      <td class="title">${job.title}</td>
      <td>${job.region}</td>
      <td>${job.jobType}</td>
      <td>${job.salary}</td>
      <td class="company">${job.company}</td>
      <td>${job.apartmentSize}</td>
      <td>${endDateHtml}</td>
      <td>${buttonHtml}</td>
    `;

    const button = tr.querySelector("button");

    if (button) {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = job.detailUrl;
      });
    }

    const star = tr.querySelector(".favorite-star");

    star.addEventListener("click", (e) => {
      e.stopPropagation();

      star.classList.toggle("active");

      if (star.classList.contains("active")) {
        if (!favorites.includes(job.title)) {
          favorites.push(job.title);
        }
      } else {
        favorites = favorites.filter(f => f !== job.title);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    tableBody.appendChild(tr);
  });

  renderPagination(filtered.length);
}

// ===================================
// 페이지네이션 렌더링
// ===================================
function renderPagination(totalItems) {
  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / pageSize);
  pagination.innerHTML = "";

  const prev = document.createElement("li");
  prev.classList.add("page-item");

  if (currentPage === 1) {
    prev.classList.add("disabled");
  }

  prev.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;

  prev.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentPage > 1) {
      currentPage--;
      renderJobs();
    }
  });

  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");

    if (i === currentPage) {
      li.classList.add("active");
    }

    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

    li.addEventListener("click", (e) => {
      e.preventDefault();

      currentPage = i;
      renderJobs();
    });

    pagination.appendChild(li);
  }

  const next = document.createElement("li");
  next.classList.add("page-item");

  if (currentPage === totalPages) {
    next.classList.add("disabled");
  }

  next.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;

  next.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentPage < totalPages) {
      currentPage++;
      renderJobs();
    }
  });

  pagination.appendChild(next);
}

// ===================================
// 상태 라디오 변경 이벤트
// ===================================
statusRadios.forEach(radio => {
  radio.addEventListener("change", (e) => {
    currentStatus = e.target.value;
    currentPage = 1;
    renderJobs();
  });
});

// ===================================
// 페이지 크기 변경
// ===================================
if (pageSizeSelect) {
  pageSizeSelect.addEventListener("change", (e) => {
    pageSize = parseInt(e.target.value);
    currentPage = 1;
    renderJobs();
  });
}

// 초기 렌더링
loadJobs();