// --------------------------
// 모달창 지역선택
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const regionButtons = document.querySelectorAll(".region-options .btn");
  const districtContainer = document.querySelector(".district-options");
  const allDistrictGroups = document.querySelectorAll(".district-options .district");
  const regionInput = document.getElementById("regionInput");
  const regionSelectBtn = document.getElementById("regionSelectBtn");
  const regionResetBtn = document.getElementById("regionResetBtn");

  let selectedRegions = [];
  const MAX_SELECTION = 5;

  // 처음엔 시군구 전체 숨김
  districtContainer.style.display = "none";
  allDistrictGroups.forEach(group => (group.style.display = "none"));

  // --------------------------
  // 지역 버튼 클릭 이벤트 (토글)
  // --------------------------
  regionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedRegion = button.dataset.district;

      // 전국 클릭 시
      if (selectedRegion === "all") {
        regionButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        allDistrictGroups.forEach(group => (group.style.display = "none"));
        districtContainer.style.display = "none";

        selectedRegions = ["전국"];
        regionInput.value = "전국";
        return;
      }

      // 전국 선택 해제
      selectedRegions = selectedRegions.filter(r => r !== "전국");
      document.querySelector('.region-options .btn[data-district="all"]')?.classList.remove("active");

      // 클릭된 지역 토글
      if (button.classList.contains("active")) {
        // 🔹 해제 시
        button.classList.remove("active");
        const targetDistrict = document.querySelector(`.district.${selectedRegion}`);
        if (targetDistrict) {
          targetDistrict.style.display = "none";
          // 해당 지역의 시/군/구 버튼들 선택 해제
          targetDistrict.querySelectorAll(".btn.active").forEach(btn => {
            btn.classList.remove("active");
            const parentRegion = button.textContent.trim();
            const regionFullName = `${parentRegion} > ${btn.textContent.trim()}`;
            selectedRegions = selectedRegions.filter(r => r !== regionFullName);
          });
        }
      } else {
        // 🔹 선택 시
        button.classList.add("active");
        districtContainer.style.display = "grid";
        const targetDistrict = document.querySelector(`.district.${selectedRegion}`);
        if (targetDistrict) targetDistrict.style.display = "grid";
      }
    });
  });

// --------------------------
// 시/군/구 버튼 클릭 
// --------------------------
districtContainer.addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if (!btn) return; // 클릭한 게 버튼이 아니면 무시

  const parentDistrict = btn.closest(".district");
  if (!parentDistrict) return;

  const upperRegion = [...parentDistrict.classList].find(cls => cls !== "district");
  const upperRegionName =
    document.querySelector(`.region-options .btn[data-district="${upperRegion}"]`)?.textContent.trim() || "";
  const regionFullName = `${upperRegionName} > ${btn.textContent.trim()}`;

  // 이미 선택된 경우 → 해제
  if (btn.classList.contains("active")) {
    btn.classList.remove("active");
    btn.blur(); // 눌림 포커스 제거
    void btn.offsetWidth; // 강제 리렌더링
    selectedRegions = selectedRegions.filter(r => r !== regionFullName);
  } else {
    // 새로 선택하는 경우
    if (selectedRegions.length >= MAX_SELECTION) {
      // ✅ alert 전에 미리 비주얼 해제
      btn.blur();
      btn.classList.remove("active");
      void btn.offsetWidth; // 즉시 반영

      // ✅ 살짝 지연시켜 alert 표시 (렌더링 후 실행)
      setTimeout(() => {
        alert(`최대 ${MAX_SELECTION}개까지만 선택 가능합니다.`);
      }, 10);
      return;
    }

    btn.classList.add("active");
    selectedRegions.push(regionFullName);
  }
});


  // --------------------------
  // "선택" 버튼 클릭 시 input 반영
  // --------------------------
  regionSelectBtn.addEventListener("click", () => {
    const uniqueRegions = [...new Set(selectedRegions)];
    regionInput.value = uniqueRegions.join(" | ");
  });

  // --------------------------
  // ✅ 초기화 버튼 클릭 시
  // --------------------------
  regionResetBtn.addEventListener("click", () => {
    // 모든 버튼 active 해제
    document.querySelectorAll(".btn.active").forEach(btn => btn.classList.remove("active"));

    // 하위 구/시/군 숨기기
    allDistrictGroups.forEach(group => (group.style.display = "none"));
    districtContainer.style.display = "none";

    // 선택값 초기화
    selectedRegions = [];
    regionInput.value = "";

    // 포커스
    regionButtons[0]?.focus();
  });
});



// --------------------------
// 모달창 직무선택
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    const jobButtons = document.querySelectorAll(".occupation-options .btn");
    const jobInput = document.getElementById("jobInput");
    const jobSelectBtn = document.getElementById("jobSelectBtn");
  
    let selectedJobs = [];
    const MAX_SELECTION = 3;
  
    // --------------------------
    // 직무 버튼 클릭 (토글 + 최대 3개 제한)
    // --------------------------
    jobButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault(); // Bootstrap 기본 active 방지
        e.stopPropagation();
  
        const jobName = button.textContent.trim();
  
        // ✅ 이미 선택된 경우 → 해제
        if (button.classList.contains("active")) {
          button.classList.remove("active");
          button.blur(); // 포커스 제거 (색상 잔상 방지)
          selectedJobs = selectedJobs.filter(j => j !== jobName);
          return;
        }
  
        // ✅ 새로 선택 시, 3개 초과 방지
        if (selectedJobs.length >= MAX_SELECTION) {
          // alert 전에 임시 스타일 복구
          button.classList.remove("active");
          button.blur();
          alert(`직무는 최대 ${MAX_SELECTION}개까지만 선택 가능합니다.`);
          return;
        }
  
        // ✅ 정상 선택
        button.classList.add("active");
        selectedJobs.push(jobName);
      });
    });
  
    // --------------------------
    // "선택" 버튼 클릭 시 input에 반영
    // --------------------------
    jobSelectBtn.addEventListener("click", () => {
      const uniqueJobs = [...new Set(selectedJobs)];
      jobInput.value = uniqueJobs.join(" | ");
  
      // Bootstrap 모달 닫기
      const modal = bootstrap.Modal.getInstance(document.getElementById("jobSearchModal"));
      modal.hide();
    });
  });
  
  
  