document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();

    initBackToTop();
    initFooterInfoPanel();
    initSubSearch();
    initSearchResultKeyword();
});


/* ===============================
   Header Fetch
=============================== */
async function loadHeader() {
    try {
        const headerResponse = await fetch("./assets/components/header.html");
        const headerHtml = await headerResponse.text();

        document.querySelector("#headerWrap").innerHTML = headerHtml;

        console.log("Header Load Success");

        setSubdomainLoginState(true);
        // setSubdomainLoginState(false);

    } catch (error) {
        console.error("Header Load Error", error);
    }
}


/* ===============================
   Footer Fetch
=============================== */
async function loadFooter() {
    try {
        const footerResponse = await fetch("./assets/components/footer.html");
        const footerHtml = await footerResponse.text();

        document.querySelector("#footerWrap").innerHTML = footerHtml;

        console.log("Footer Load Success");

    } catch (error) {
        console.error("Footer Load Error", error);
    }
}


/* ===============================
   Back To Top
=============================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");

    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ===============================
   Footer Company Info Panel
=============================== */
function initFooterInfoPanel() {
    const companyInfoBtn = document.getElementById("companyInfoBtn");
    const footerInfoPanel = document.getElementById("footerInfoPanel");

    if (!companyInfoBtn || !footerInfoPanel) return;

    const footerArrow = companyInfoBtn.querySelector(".footer-arrow");

    companyInfoBtn.addEventListener("click", (e) => {
        e.preventDefault();

        footerInfoPanel.classList.toggle("show");

        if (footerArrow) {
            footerArrow.textContent =
                footerInfoPanel.classList.contains("show")
                    ? "▲"
                    : "▼";
        }
    });
}


/* ===============================
   Search Enter
=============================== */
function initSubSearch() {
    const searchInput = document.querySelector(".subSearch input");

    console.log("searchInput :", searchInput);

    if (!searchInput) return;

    searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const keyword = searchInput.value.trim();

        console.log("검색어 :", keyword);

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