// -----------------------------
// 이력서 제목 (작성 / 보기 공용)
// -----------------------------
const memberName = "홍길동"; 
const resumeContainer =
  document.getElementById("resume-title") ||
  document.getElementById("resumeView-title");

let resumeSpan = null;

function createResumeSpan(text) {
  const span = document.createElement("span");
  span.id = "resumeName";
  span.className = "input-title";
  span.textContent = text;
  return span;
}

if (resumeContainer) {
  const editIcon = document.getElementById("editResume");
  const h1 = resumeContainer.querySelector("h1");

  resumeSpan = createResumeSpan(`${memberName} 이력서`);

  if (editIcon) {
    h1.insertBefore(resumeSpan, editIcon);

    editIcon.addEventListener("click", () => {
      const currentText = resumeSpan.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.className = "resume-input";
      input.style.fontSize = "1em";
      input.style.width = "400px";

      resumeSpan.replaceWith(input);
      input.focus();

      function save() {
        const newSpan = createResumeSpan(input.value || currentText);
        input.replaceWith(newSpan);
        resumeSpan = newSpan;
      }

      input.addEventListener("blur", save);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
      });
    });
  } else {
    h1.appendChild(resumeSpan);
  }
}

// -----------------------------
// 프로필 사진 업로드 & 삭제
// -----------------------------
function previewPhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("profilePhoto").src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  document.getElementById("profilePhoto").src =
    "https://via.placeholder.com/150x200.png?text=사진";
  document.getElementById("photoInput").value = "";
}

// -----------------------------
// 생년월일 입력 포맷 (YYYY.MM.DD)
// -----------------------------
const userBirth = document.getElementById("userBirth");
if (userBirth) {
  userBirth.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    let formatted = value;
    if (value.length >= 5)
      formatted = value.slice(0, 4) + "." + value.slice(4, 6);
    if (value.length >= 7)
      formatted =
        value.slice(0, 4) + "." + value.slice(4, 6) + "." + value.slice(6, 8);

    e.target.value = formatted;
  });
}

// -----------------------------
// 성별 체크박스 단일 선택
// -----------------------------
const genderCheckboxes = document.querySelectorAll(
  '.gender input[type="checkbox"]'
);
genderCheckboxes.forEach((box) => {
  box.addEventListener("change", () => {
    if (box.checked) {
      genderCheckboxes.forEach((other) => {
        if (other !== box) other.checked = false;
      });
    }
  });
});

// -----------------------------
// 이메일 직접입력 기능
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const domainSelect = document.getElementById("userEmailDomain");
  const directInput = document.getElementById("userEmailDirect");

  if (!domainSelect || !directInput) return;

  directInput.style.display =
    domainSelect.value === "direct" ? "inline-block" : "none";

  domainSelect.addEventListener("change", () => {
    if (domainSelect.value === "direct") {
      directInput.style.display = "inline-block";
      directInput.focus();
    } else {
      directInput.style.display = "none";
      directInput.value = "";
    }
  });
});

// -----------------------------
// 중학교 미만 학력 토글
// -----------------------------
const underHighCheckbox = document.getElementById("underHigh");
const educationBody = document.getElementById("education_body");

if (underHighCheckbox && educationBody) {
  underHighCheckbox.addEventListener("change", () => {
    educationBody.style.display = underHighCheckbox.checked ? "none" : "block";
  });
}

// -----------------------------
// 포트폴리오 업로드
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const portfolioFile = document.getElementById("portfolioFile");
  const portfolioList = document.getElementById("portfolioList");
  const addPortfolioBtn = document.getElementById("addPortfolioBtn");

  addPortfolioBtn.addEventListener("click", () => {
    Array.from(portfolioFile.files).forEach((file) => {
      const li = document.createElement("li");
      li.textContent = file.name;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "삭제";
      removeBtn.addEventListener("click", () => li.remove());

      li.appendChild(removeBtn);
      portfolioList.appendChild(li);
    });
    portfolioFile.value = "";
  });
});

// -----------------------------
// 기본 이력서 설정 / 공개 여부
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const defaultCheckbox = document.getElementById("default-resume-checkbox");
  const visibilityCheckbox = document.getElementById("resume-visibility-checkbox");

  defaultCheckbox.addEventListener("change", () => {
    console.log("기본 이력서 설정:", defaultCheckbox.checked);
  });

  visibilityCheckbox.addEventListener("change", () => {
    console.log("이력서 공개 여부:", visibilityCheckbox.checked);
  });
});

// -----------------------------
// 이력서 저장하기
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveResumeBtn");

  saveBtn.addEventListener("click", () => {
    // 이메일 조립
    const emailId = document.getElementById("userEmailId")?.value || "";
    const emailDomainSelect =
      document.getElementById("userEmailDomain")?.value || "";
    const emailDomainDirect =
      document.getElementById("userEmailDirect")?.value || "";
    const emailDomain =
      emailDomainSelect === "direct" ? emailDomainDirect : emailDomainSelect;
    const email = emailId && emailDomain ? `${emailId}@${emailDomain}` : "";

    const resumeData = {
      name: document.getElementById("userName")?.value || "",
      birth: document.getElementById("userBirth")?.value || "",
      gender:
        document.querySelector('.gender input[type="checkbox"]:checked')
          ?.value || "",
      phone: document.getElementById("userPhone")?.value || "",
      email: email,
      address: {
        zipcode: document.getElementById("zipcode")?.value || "",
        basic: document.getElementById("basicAddress")?.value || "",
        detail: document.getElementById("detailAddress")?.value || "",
      },
    };

    // // JSON 저장
    // const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
    //   type: "application/json",
    // });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);

    alert("이력서가 저장되었습니다!");
  });
});

// -----------------------------
// 희망지역, 희망연봉 모달창
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Bootstrap 모달 객체 선언
  const jobModal = new bootstrap.Modal(document.getElementById('jobSearchModal'));
  const regionModal = new bootstrap.Modal(document.getElementById('regionSearchModal'));

  // --------------------------
  // 버튼 클릭 시 모달 열기
  // --------------------------
  document.getElementById('jobSearchBtn').addEventListener('click', () => {
    jobModal.show();
  });

  document.getElementById('regionSearchBtn').addEventListener('click', () => {
    regionModal.show();
  });

  // --------------------------
  // 리스트 클릭 시 active 표시
  // --------------------------
  const activateList = (selector) => {
    document.querySelectorAll(selector + ' .list-group-item').forEach(item => {
      item.addEventListener('click', () => {
        item.parentElement.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });
    });
  };
  activateList('#jobSearchResults');
  activateList('#regionSearchResults');

  // --------------------------
  // 선택 버튼 클릭 시 값 입력창 반영
  // --------------------------
  document.getElementById('jobSelectBtn').addEventListener('click', () => {
    const selected = document.querySelector('#jobSearchResults .list-group-item.active');
    if (selected) {
      document.getElementById('jobInput').value = selected.textContent;
    }
    jobModal.hide();
  });

  document.getElementById('regionSelectBtn').addEventListener('click', () => {
    const selected = document.querySelector('#regionSearchResults .list-group-item.active');
    if (selected) {
      document.getElementById('regionInput').value = selected.textContent;
    }
    regionModal.hide();
  });
});


// -----------------------------
// 민감정보 수집·이용 안내 토글
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const infoBtn = document.getElementById("privacyInfoBtn");
  const tooltip = document.getElementById("privacyTooltip");

  document.addEventListener("click", (e) => {
    // ✅ info 아이콘 클릭 시
    if (e.target.closest("#privacyInfoBtn")) {
      e.stopPropagation();

      // 아이콘의 화면상 위치 정보 가져오기
      const rect = infoBtn.getBoundingClientRect();

      // 툴팁 위치 지정
      tooltip.style.position = "fixed"; // 스크롤에도 위치 고정
      tooltip.style.top = rect.bottom + 8 + "px"; // 아이콘 아래 약간 간격
      tooltip.style.left = rect.left - 150 + "px"; // 중앙 정렬을 위한 약간의 왼쪽 보정값 (툴팁 너비 절반 정도)
      tooltip.style.display =
        tooltip.style.display === "block" ? "none" : "block";
      return;
    }

    // ✅ 외부 클릭 시 닫기
    if (!tooltip.contains(e.target)) {
      tooltip.style.display = "none";
    }
  });
});

// -----------------------------
// 희망연봉 내규에 따름 체크박스
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const policyCheck = document.getElementById("salaryAccordingPolicy");
  const amountInput = document.getElementById("work-salaryAmount");
  const unitSelect = document.getElementById("work-salaryUnit");
  const typeSelect = document.getElementById("work-salaryType");

  policyCheck.addEventListener("change", () => {
    const disabled = policyCheck.checked;
    amountInput.disabled = disabled;
    unitSelect.disabled = disabled;
    typeSelect.disabled = disabled;

    if (disabled) {
      amountInput.value = "";
    }
  });
});


// -----------------------------
// 이력서 공고 튤팁
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const infoBtn = document.getElementById("resumeVisibilityInfoBtn");
  const tooltip = document.getElementById("resumeVisibilityTooltip");

  document.addEventListener("click", (e) => {
    if (e.target.closest("#resumeVisibilityInfoBtn")) {
      e.stopPropagation();
      const rect = infoBtn.getBoundingClientRect();
      tooltip.style.position = "fixed";
      tooltip.style.top = rect.bottom + 8 + "px";
      tooltip.style.left = rect.left - 150 + "px";
      tooltip.style.display =
        tooltip.style.display === "block" ? "none" : "block";
      return;
    }

    if (!tooltip.contains(e.target)) {
      tooltip.style.display = "none";
    }
  });
});


// -----------------------------
// 사용자 미 작성 알림창
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveResumeBtn");

  saveBtn.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 제출 방지

    const missingFields = [];

    const name = document.getElementById("userName")?.value.trim();
    const birth = document.getElementById("userBirth")?.value.trim();
    const phone = document.getElementById("userPhone")?.value.trim();
    const emailId = document.getElementById("userEmailId")?.value.trim();
    const emailDomainSelect = document.getElementById("userEmailDomain")?.value;
    const emailDirect = document.getElementById("userEmailDirect")?.value.trim();
    const zipcode = document.getElementById("zipcode")?.value.trim();
    const basicAddress = document.getElementById("basicAddress")?.value.trim();

    const job = document.getElementById("jobInput")?.value.trim();
    const region = document.getElementById("regionInput")?.value.trim();
    const salaryAmount = document.getElementById("work-salaryAmount")?.value.trim();
    const salaryAccordingPolicy = document.getElementById("salaryAccordingPolicy")?.checked;

    const genderMale = document.getElementById("genderMale")?.checked;
    const genderFemale = document.getElementById("genderFemale")?.checked;

    // 이메일 도메인 처리
    let email = "";
    if (emailId) {
      if (emailDomainSelect === "direct") {
        email = emailId + "@" + emailDirect;
      } else {
        email = emailId + "@" + emailDomainSelect;
      }
    }

    // 누락 항목 체크
    if (!name) missingFields.push("이름");
    if (!birth) missingFields.push("생년월일");
    if (!genderMale && !genderFemale) missingFields.push("성별");
    if (!phone) missingFields.push("휴대폰번호");
    if (!emailId || (!emailDomainSelect && !emailDirect)) missingFields.push("이메일");
    if (!zipcode || !basicAddress) missingFields.push("주소");
    if (!job) missingFields.push("희망 직무");
    if (!region) missingFields.push("희망 지역");

    // ✅ 급여 입력 안 했을 때 — 단, “내규에 따름”이 체크된 경우는 제외
    if (!salaryAmount && !salaryAccordingPolicy) {
      missingFields.push("희망 급여");
    }

    if (missingFields.length > 0) {
      alert("다음 항목을 입력해주세요:\n\n" + missingFields.join(", "));
      return false;
    }

    alert("이력서가 정상적으로 저장됩니다 ✅");
    // 실제 저장 로직 추가 (예: form.submit() or API 호출)
  });
});