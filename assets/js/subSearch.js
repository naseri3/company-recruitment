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

        location.href =
            `default.html?keyword=${encodeURIComponent(keyword)}`;
    });
}

/* ===============================
   Search Result Keyword
=============================== */
function initSearchResultKeyword() {
    const keywordBox =
        document.querySelector(".subSearchResult-keyword");

    if (!keywordBox) return;

    const params =
        new URLSearchParams(window.location.search);

    const keyword =
        params.get("keyword");

    if (!keyword) {
        keywordBox.innerHTML =
            '<span class="subSearchResult-tag">전체</span>';
        return;
    }

    const keywords = keyword
        .trim()
        .split(/\s+/);

    keywordBox.innerHTML = keywords
        .map(item =>
            `<span class="subSearchResult-tag">${item}</span>`
        )
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    initSubSearch();
    initSearchResultKeyword();
});