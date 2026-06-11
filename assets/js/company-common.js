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
        const headerResponse = await fetch("./assets/components/SubHeader.html");
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
        const footerResponse = await fetch("./assets/components/SubFooter.html");
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

