document.addEventListener("DOMContentLoaded", () => {
  const dataEl = document.getElementById("resumeData");

  try {
    const resume = JSON.parse(dataEl.textContent);
    const info = resume.personalInfo || {};

    /* ===============================
       1. 기본 인적사항 렌더링
    =============================== */
    document.getElementById("resumeName").textContent = info.resumeTitle || "";
    document.getElementById("profilePhotoView").src = info.photo || "";
    document.getElementById("userName").textContent = info.name || "";
    document.getElementById("userBirth").textContent = info.birth || "";
    document.getElementById("userGender").textContent = info.gender || "";
    document.getElementById("userPhone").textContent = info.phone || "";
    document.getElementById("userEmail").textContent = info.email || "";
    document.getElementById("userAddress").textContent = info.address || "";
    document.getElementById("userdesired-region1").textContent = info.desiredRegion1 || "";
    document.getElementById("userdesired-region2").textContent = info.desiredRegion2 || "";
    document.getElementById("userdesired-job").textContent = info.desiredJob || "";
    document.getElementById("userdesired-salary").textContent = info.desiredSalary || "";


    /* ===============================
       2. 학력 (employmentList)
    =============================== */
    const employmentContainer = document.getElementById("employmentList");
    if (resume.employmentList && Array.isArray(resume.employmentList)) {
      resume.employmentList.forEach(item => {
        const isCollege = item.schoolType && item.schoolType.includes("대학");

        const div = document.createElement("div");
        div.className = "employment-item";

        div.innerHTML = `
          <div class="row align-items-center">
            <div class="col-md-2 col-sm-2 col-4 text-secondary fw-semibold">${item.schoolType || ""}</div>
            <div class="col-md-3 col-sm-3 col-8 fw-bold">${item.schoolName || ""}</div>
            <div class="col-md-2 col-sm-3 col-6 text-secondary">
              ${item.admissionYear ? `${item.admissionYear} ~ ${item.graduationYear}` : item.year || "-"}
            </div>
            <div class="col-md-2 col-sm-2 col-6 text-secondary">${item.status || "-"}</div>
            <div class="col-md-3 mt-1 mt-md-0">
              ${
                isCollege
                  ? `<div class="employment-detail small text-muted">
                      전공: ${item.major || "-"}<br>
                      학점: ${item.grade || "-"} / ${item.totalGrade || "-"}
                    </div>`
                  : ""
              }
            </div>
          </div>
        `;
        employmentContainer.appendChild(div);
      });
    }

    /* ===============================
       3. 경력 (careerList) + 총 경력 계산
    =============================== */
    const careerContainer = document.getElementById("careerList");
    const totalCareerSpan = document.querySelector(".total-career");
    let totalMonths = 0;

    if (resume.careerList && Array.isArray(resume.careerList)) {
      resume.careerList.forEach(item => {
        // 근무기간 계산
        const startParts = item.joinDate.split(".").map(Number);
        const startDate = new Date(startParts[0], startParts[1] - 1);

        let endDate;
        if (item.resignDate === "재직중" || item.resignDate === "재직 중") {
          const today = new Date();
          endDate = new Date(today.getFullYear(), today.getMonth());
        } else {
          const endParts = item.resignDate.split(".").map(Number);
          endDate = new Date(endParts[0], endParts[1] - 1);
        }

        const monthsDiff =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth()) + 1;

        totalMonths += monthsDiff;

        const years = Math.floor(monthsDiff / 12);
        const months = monthsDiff % 12;
        const formattedPeriod = `${years > 0 ? years + "년 " : ""}${months}개월`;

        const div = document.createElement("div");
        div.className = "career-item";

        const taskList = item.tasks.map(t => `<li>${t}</li>`).join("");

        div.innerHTML = `
          <div class="row">
            <div class="col-md-2 col-sm-2 col-4 text-secondary">
              <div class="fw-semibold">${item.joinDate} ~ ${item.resignDate}</div>
              <div class="small text-muted">${formattedPeriod}</div>
            </div>
            <div class="col-md-10 col-8">
              <div class="fw-bold fs-6">${item.companyName}</div>
              <div class="text-secondary small mb-2">${item.department} · ${item.position}</div>
              <ul class="career-task text-body-secondary small mb-2 ms-3">${taskList}</ul>
              <div class="career-meta text-secondary small d-flex flex-wrap gap-3">
                <div>💰 ${item.salaryType} ${item.salaryAmount} (${item.taxType})</div>
              </div>
            </div>
          </div>
        `;
        careerContainer.appendChild(div);
      });

      // 총 경력 표시
      const totalYears = Math.floor(totalMonths / 12);
      const remainingMonths = totalMonths % 12;
      totalCareerSpan.textContent = `(${totalYears}년 ${remainingMonths}개월)`;
    }

    /* ===============================
       4. 교육이수 (trainingList)
    =============================== */
    const trainingContainer = document.getElementById("trainingList");
    if (resume.trainingList && Array.isArray(resume.trainingList)) {
      resume.trainingList.forEach(item => {
        const div = document.createElement("div");
        div.className = "training-item";

        div.innerHTML = `
          <div class="row align-items-center">
            <div class="col-md-3 col-sm-3 fw-bold">${item.trainingName}</div>
            <div class="col-md-2 col-sm-2 text-secondary">${item.organization}</div>
            <div class="col-md-2 col-sm-2 text-secondary">${item.startDate} ~ ${item.endDate}</div>
            <div class="col-md-4 col-sm-4 text-muted small">${item.content || ""}</div>
          </div>
        `;
        trainingContainer.appendChild(div);
      });
    }

    /* ===============================
       5. 자격증 (certificatesList)
    =============================== */
    const certificatesContainer = document.getElementById("certificatesList");
    if (resume.certificatesList && Array.isArray(resume.certificatesList)) {
      resume.certificatesList.forEach(item => {
        const div = document.createElement("div");
        div.className = "certificates-item";

        div.innerHTML = `
          <div class="row align-items-center">
            <div class="col-md-3 col-sm-3 fw-bold">${item.certificateName}</div>
            <div class="col-md-3 col-sm-3 text-secondary">${item.issuer}</div>
            <div class="col-md-2 col-sm-2 text-secondary">${item.acquisitionDate}</div>
          </div>
        `;
        certificatesContainer.appendChild(div);
      });
    }

    /* ===============================
    6. 취업우대 / 병역 (preferenceInfo)
    =============================== */
    const preferenceContainer = document.getElementById("preferenceList");
    const pref = resume.preferenceInfo;

    if (pref) {
    const div = document.createElement("div");
    div.className = "preference-item";

    // 병역 표시 처리
    let militaryHTML = "";
    if (pref.military) {
        const status = pref.military.status || "-";
        if (status === "군필") {
        militaryHTML = `${status} / ${pref.military.startDate} ~ ${pref.military.endDate}`;
        } else {
        militaryHTML = status;
        }
    }

    // 한 줄씩 표시되도록
    div.innerHTML = `
        <div class="preference-line">
        <span class="label">취업우대</span>
        <span class="value">${pref.employmentSupport || "-"}</span>
        </div>
        <div class="preference-line">
        <span class="label">장애</span>
        <span class="value">${pref.disability || "-"}</span>
        </div>
        <div class="preference-line">
        <span class="label">병역</span>
        <span class="value">${militaryHTML}</span>
        </div>
    `;
    preferenceContainer.appendChild(div);
    }

    /* ===============================
    7. 자기소개서 (selfIntroduction)
    =============================== */
    const introContainer = document.getElementById("selfIntroductionList");
    const intro = resume.selfIntroduction;

    if (intro) {
    const div = document.createElement("div");
    div.className = "self-introduction-item";

    // 줄바꿈(\n)을 <br>로 변환하여 표시
    const contentHTML = (intro.content || "").replace(/\n/g, "<br>");

    div.innerHTML = `
        <div class="intro-title fw-bold mb-1">${intro.title || "자기소개서"}</div>
        <div class="intro-content text-secondary">${contentHTML}</div>
    `;
    introContainer.appendChild(div);
    }

    /* ===============================
    8. 포트폴리오 (portfolioList)
    =============================== */
    const portfolioContainer = document.getElementById("portfolioList");

    if (resume.portfolioList && Array.isArray(resume.portfolioList)) {
    resume.portfolioList.forEach(item => {
        const div = document.createElement("div");
        div.className = "portfolio-item";

        // 파일명 + 경로 렌더링
        div.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-3 col-sm-2 col-4 fw-semibold text-secondary">포트폴리오</div>
            <div class="col-md-9 col-8">
            ${
                item.filePath
                ? `<a href="${item.filePath}" target="_blank" class="portfolio-file-link">${item.fileName}</a>`
                : `<span class="portfolio-file-text">${item.fileName || "-"}</span>`
            }
            </div>
        </div>
        `;
        portfolioContainer.appendChild(div);
    });
    }

  } catch (err) {
    console.error("JSON 파싱 오류:", err);
  }
});

// ================================
// 9. 이력서 수정하기 & 인쇄하기
// ================================

// ✅ 이력서 수정하기 버튼
document.querySelectorAll(".edit-resume-btn, .edit-resume-btn-bottom").forEach((btn) => {
  btn.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const rSeq = params.get("R_SEQ"); // 현재 페이지의 R_SEQ 파라미터 값 가져오기

    // R_SEQ 값이 존재하면 해당 값 포함해서 이동
    if (rSeq) {
      window.location.href = `./resumeWrite.html?R_SEQ=${rSeq}`;
    } else {
      // 값이 없을 경우 기본 페이지로 이동
      window.location.href = "./resumeWrite.html";
    }
  });
});

// ✅ 인쇄하기 버튼
const printBtn = document.querySelector(".print-resume-btn");
if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print(); // 브라우저 인쇄 창 열기
  });
}



// ===============================
// 10. 신입/경력 배지 토글
// ===============================
const userType = "career"; // "career" 또는 "rookie"
const badge = document.getElementById("careerBadge");

if (userType === "career") {
  badge.textContent = "경력";
  badge.classList.add("career");
} else {
  badge.textContent = "신입";
  badge.classList.add("rookie");
}
