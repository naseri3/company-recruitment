document.addEventListener("DOMContentLoaded", async () => {
    await loadHeader();
    await loadFooter();

    initBackToTop();
    initFooterInfoPanel();
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

        // 헤더가 들어온 다음 실행
        // setSubdomainLoginState(true);  // 로그인 된 상태
        setSubdomainLoginState(false);    // 로그인 안 된 상태

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
    const footerArrow = companyInfoBtn.querySelector(".footer-arrow");

    if (!companyInfoBtn || !footerInfoPanel) return;

    companyInfoBtn.addEventListener("click", function (e) {
        e.preventDefault();

        footerInfoPanel.classList.toggle("show");

        footerArrow.textContent = footerInfoPanel.classList.contains("show")
            ? "▲"
            : "▼";
    });
}