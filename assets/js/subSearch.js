/* ===============================
   Subdomain Search
=============================== */
function initSubSearch() {
    const searchInput = document.querySelector(".subSearch input");

    if (!searchInput) return;

    searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const keyword = searchInput.value.trim();

        if (!keyword) {
            alert("검색어를 입력해주세요.");
            return;
        }

        if (keyword.length > 50) {
            alert("검색어는 최대 50자까지 입력 가능합니다.");
            return;
        }

        location.href = `default.html?keyword=${encodeURIComponent(keyword)}`;
    });
}

/* ===============================
   Search Result Keyword
=============================== */
function initSearchResultKeyword() {
    const keywordBox = document.querySelector(".subSearchResult-keyword");

    if (!keywordBox) return;

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword");

    if (!keyword) {
        keywordBox.innerHTML = `<span class="subSearchResult-tag">전체</span>`;
        return;
    }

    keywordBox.innerHTML = `
        <span class="subSearchResult-tag">${keyword}</span>
    `;
}