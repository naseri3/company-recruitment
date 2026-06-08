document.addEventListener("DOMContentLoaded", () => {
  // ✅ 위탁사 리스트 (이름, 로고, 링크)
  const companies = [
    { name: "거창유지관리", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=거창유지관리" },
    { name: "경기진흥주택관리", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=경기진흥주택관리" },
    { name: "광인산업", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=광인산업" },
    { name: "더씨앤(주)", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=더씨앤(주)" },
    { name: "(주)동우개발", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=(주)동우개발" },
    { name: "(주)백운에프엠", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=(주)백운에프엠" },
    { name: "부건피앤피(주)", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=부건피앤피(주)" },
    { name: "서림주택관리(주)", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=서림주택관리(주)" },
    { name: "서일개발", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=서일개발" },
    { name: "신한영관리(주)", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=신한영관리(주)" },
    { name: "에이비엠", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=에이비엠" },
    { name: "율산개발", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=율산개발" },
    { name: "태룡에스디", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=태룡에스디" },
    { name: "푸른종합주택관리", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=푸른종합주택관리" },
    { name: "한영파트너스FH", logo: "./assets/img/brandBox_logo.png", link: "./companyDetail.html?name=한영파트너스FH" },
  ];

  // ✅ 가나다 순 정렬
  companies.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

  const listContainer = document.getElementById("companyList");

  // ✅ 카드 렌더링
  companies.forEach((c) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3 col-lg-2 d-flex";

    col.innerHTML = `
      <div
        class="company-card bg-white rounded-4 shadow-sm flex-fill d-flex flex-column align-items-center justify-content-center"
        role="button"
        onclick="window.location.href='${c.link}'"
        title="${c.name}"
      >
        <img
          src="${c.logo}"
          alt="${c.name}"
          class="img-fluid mb-2"
          style="max-width: 70%; max-height: 60px; object-fit: contain;"
        >
        <h6 class="mb-0 mt-2 text-center">${c.name}</h6>
      </div>
    `;
    listContainer.appendChild(col);
  });
});
