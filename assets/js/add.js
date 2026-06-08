// ===================================
// 학력
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const educationBody = document.getElementById('education_body');

  function getEducationHTML(index, type = 'default', selected = '') {
    function getSchoolOptions(selectedValue) {
      return `
        <option value="">학교 구분</option>
        <option value="middle" ${selectedValue === 'middle' ? 'selected' : ''}>중학교</option>
        <option value="high" ${selectedValue === 'high' ? 'selected' : ''}>고등학교</option>
        <option value="college" ${selectedValue === 'college' ? 'selected' : ''}>전문대학(2,3년)</option>
        <option value="university" ${selectedValue === 'university' ? 'selected' : ''}>대학교(4년)</option>
        <option value="graduate" ${selectedValue === 'graduate' ? 'selected' : ''}>대학원</option>
      `;
    }

    if (type === 'middleHigh') {
      return `
        <div class="education-item">
          <div class="col-12 form-field-item w-100 mb-3">
            <div class="row high-school w-100">
              <div class="d-flex align-items-center w-100 gap-3">
                <select class="form-select w-auto school-select" name="education[${index}][schoolType]">
                  ${getSchoolOptions(selected)}
                </select>
                <div class='position-relative'>
                    <input type='text' class='form-control school-name' placeholder='학교명 검색' autocomplete='off’>
                    <ul class='school-search-result list-group position-absolute w-100'></ul>
                </div>
                <input type='hidden' name='education[index][schoolCode]' class='school-code'>
                <input type="text" class="form-control graduation-year" placeholder="졸업년도 (예: 2020)" maxlength="6" name="education[${index}][graduationYear]">
                <select class="form-select w-auto graduation-status" name="education[${index}][graduationStatus]">
                  <option value="">졸업여부</option>
                  <option value="graduate">졸업</option>
                  <option value="expected">졸업예정</option>
                  <option value="attending">재학중</option>
                </select>
                <label class="d-flex align-items-center gap-1 ms-2">
                  <input type="checkbox" class="exam-checkbox" name="education[${index}][isExam]"> 대입검정고시
                </label>
                <button type="button" class="btn btn-danger remove-education-btn ms-5">삭제</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'university') {
      return `
        <div class="education-item">
          <div class="col-12 form-field-item w-100 mb-3">
            <div class="row university w-100">
              <div class="d-flex align-items-center w-100 gap-3">
                <select class="form-select w-auto school-select" name="education[${index}][schoolType]">
                  ${getSchoolOptions(selected)}
                </select>
                <div class='position-relative'>
                    <input type='text' class='form-control school-name' placeholder='학교명 검색' autocomplete='off’>
                    <ul class='school-search-result list-group position-absolute w-100'></ul>
                </div>
                <input type='hidden' name='education[index][schoolCode]' class='school-code'>
                <input type="text" class="form-control admission-year" placeholder="입학년도 (예: 2018)" maxlength="6" name="education[${index}][admissionYear]">
                <input type="text" class="form-control graduation-year" placeholder="졸업년도 (예: 2022)" maxlength="6" name="education[${index}][graduationYear]">
                <select class="form-select w-auto graduation-status" name="education[${index}][graduationStatus]">
                  <option value="">졸업여부</option>
                  <option value="graduate">졸업</option>
                  <option value="expected">졸업예정</option>
                  <option value="attending">재학중</option>
                  <option value="dropout">중퇴</option>
                  <option value="completed">수료</option>
                  <option value="leave">휴학</option>
                </select>
                <label class="d-flex align-items-center gap-1 ms-2">
                  <input type="checkbox" class="transfer-checkbox" name="education[${index}][isTransfer]"> 편입
                </label>
                <button type="button" class="btn btn-danger remove-education-btn ms-5">삭제</button>
              </div>
              <div class="d-flex align-items-center w-100 gap-3 mt-2">
                <input type="text" class="form-control major-name" placeholder="전공명" name="education[${index}][majorName]">
                <input type="text" class="form-control gpa" id="gpa" placeholder="학점" maxlength="6" name="education[${index}][gpa]">
                /
                <select class="form-select w-auto total-scale" name="education[${index}][totalScale]">
                  <option value="">총점</option>
                  <option value="4.5">4.5</option>
                  <option value="4.3">4.3</option>
                  <option value="4.0">4.0</option>
                  <option value="100">100</option> 
                </select>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="education-item">
          <div class="col-12 form-field-item w-100 mb-3">
            <div class="row school-choice w-100">
              <div class="col-12 d-flex align-items-center gap-3 flex-nowrap">
                <select class="form-select w-auto school-select" name="education[${index}][schoolType]">
                  ${getSchoolOptions(selected)}
                </select>
                <div class='position-relative'>
                    <input type='text' class='form-control school-name' placeholder='학교명 검색' autocomplete='off’>
                    <ul class='school-search-result list-group position-absolute w-100'></ul>
                </div>
                <input type='hidden' name='education[index][schoolCode]' class='school-code'>
                <button type="button" class="btn btn-danger remove-education-btn ms-5">삭제</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 추가/삭제
  educationBody.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('remove-education-btn')) {
      target.closest('.education-item')?.remove();
      return;
    }
    if (target.classList.contains('add-education-btn')) {
      const field = educationBody.querySelector('.education-field');
      const count = field.querySelectorAll('.education-item').length;
      if (count >= 5) return;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = getEducationHTML(count, 'default');
      field.insertBefore(wrapper.firstElementChild, target.closest('.col-12.text-center'));
    }
  });

  // 학교 선택 시 블록 변경
  educationBody.addEventListener('change', (e) => {
    if (!e.target.classList.contains('school-select')) return;
    const item = e.target.closest('.education-item');
    const index = Array.from(educationBody.querySelectorAll('.education-item')).indexOf(item);
    let type = 'default';
    if (e.target.value === 'middle' || e.target.value === 'high') type = 'middleHigh';
    if (['college','university','graduate'].includes(e.target.value)) type = 'university';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = getEducationHTML(index, type, e.target.value);
    item.replaceWith(wrapper.firstElementChild);
  });

  // 년도 입력 처리
  educationBody.addEventListener('input', (e) => {
    if (!e.target.classList.contains('admission-year') && !e.target.classList.contains('graduation-year')) return;
    let val = e.target.value.replace(/\D/g, '').slice(0,4);
    e.target.value = val;
  });

  // 검정고시 처리
  educationBody.addEventListener('change', (e) => {
    if (!e.target.classList.contains('exam-checkbox')) return;
    const item = e.target.closest('.education-item');
    const schoolInput = item.querySelector('.school-name');
    const graduationInput = item.querySelector('.graduation-year');
    if (e.target.checked) {
      schoolInput.value = '대입자격검정고시';
      graduationInput.placeholder = '합격년도(예: 2020)';
    } else {
      schoolInput.value = '';
      graduationInput.placeholder = '졸업년도 (예: 2020)';
    }
  });
});


// ===================================
// 경력
// ===================================
document.addEventListener('DOMContentLoaded', () => {
const employmentBody = document.getElementById('employment_body');

function getEmploymentHTML(index) {
  return `
    <div class="col-12 form-field-item d-flex flex-column w-100 gap-1 mb-3 employment-item">
      <div class="container">
        <div class="row gap-3 mb-3">
          <div class="col-12 text-end">
            <button type="button" class="btn btn-danger remove-employment-btn">삭제</button>
          </div>
        </div>
        <div class="row gap-3 mb-3">
          <div class="col p-0 form-field-item">
            <label><span class="star">*</span> 회사명</label>
            <input type="text" class="form-control company-name" name="employment[${index}][companyName]" placeholder="회사명을 입력하세요.">
          </div>
          <div class="col p-0 form-field-item">
            <label><span class="star">*</span> 담당직무</label>
            <input type="text" class="form-control job-duty" name="employment[${index}][jobDuty]" placeholder="관리소장, 경리, 시설관리 등">
          </div>
          <div class="col p-0 form-field-item">
            <label>직급/직책</label>
            <input type="text" class="form-control job-title" name="employment[${index}][jobTitle]" placeholder="직급/직책을 입력하세요.">
          </div>
        </div>
        <div class="row gap-3 mb-3">
          <div class="col p-0 form-field-item">
            <label><span class="star">*</span> 입사년월</label>
            <input type="text" class="form-control start-date" name="employment[${index}][startDate]" placeholder="2020.01" maxlength="7">
          </div>
          <div class="col p-0 form-field-item">
            <label><span class="star">*</span> 퇴사년월</label>
            <input type="text" class="form-control end-date" name="employment[${index}][endDate]" placeholder="2020.12" maxlength="7">
          </div>
          <div class="col p-0 form-field-item">
            <label class="d-flex align-items-center gap-1 ms-2">
              <input type="checkbox" class="is-working" name="employment[${index}][isWorking]"> 재직
            </label>
          </div>
        </div>
        <div class="row gap-3 mb-3 align-items-center">
          <div class="col-auto p-0 form-field-item">
            <div class="d-flex">
              <label>급여</label>
              <select class="form-select salary-unit" name="employment[${index}][salaryUnit]">
                <option value="monthly" selected>월급</option>
                <option value="annual">연봉</option>
                <option value="hourly">시급</option>
                <option value="daily">일급</option>
              </select>
              <input type="text" class="form-control salary-amount ms-3 me-3" name="employment[${index}][salaryAmount]" placeholder="예) 3,402,000">
              <select class="form-select salary-type" name="employment[${index}][salaryType]">
                <option value="preTax" selected>세전</option>
                <option value="postTax">세후</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row gap-3">
          <div class="col-12 p-0 form-field-item">
            <label>담당업무</label>
            <textarea class="form-control responsibility" name="employment[${index}][responsibility]" placeholder="담당업무를 입력하세요."></textarea>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 추가/삭제
employmentBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-employment-btn')) {
    e.target.closest('.employment-item')?.remove();
    return;
  }
  if (e.target.classList.contains('add-employment-btn')) {
    const field = employmentBody.querySelector('.employment-field');
    const index = field.querySelectorAll('.employment-item').length;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = getEmploymentHTML(index);
    field.insertBefore(wrapper.firstElementChild, e.target.closest('.col-12.text-center'));
  }
});

// 재직 체크 → 퇴사일 비활성
employmentBody.addEventListener('change', (e) => {
  if (!e.target.classList.contains('is-working')) return;
  const endDate = e.target.closest('.employment-item').querySelector('.end-date');
  if (e.target.checked) {
    endDate.value = '';
    endDate.disabled = true;
  } else {
    endDate.disabled = false;
  }
});

// 입사일/퇴사일 입력 처리
employmentBody.addEventListener('input', (e) => {
  if (!e.target.classList.contains('start-date') && !e.target.classList.contains('end-date')) return;
  let val = e.target.value.replace(/\D/g, '').slice(0,6);
  e.target.value = val;
});

// blur 시 YYYY.MM 포맷
employmentBody.addEventListener('blur', (e) => {
  if (!e.target.classList.contains('start-date') && !e.target.classList.contains('end-date')) return;
  let v = e.target.value.replace(/\D/g, '');
  if (v.length < 4) return;
  const y = v.slice(0,4);
  let m = v.slice(4);
  if (m.length === 1) m = '0'+m;
  if (m.length > 2) m = m.slice(0,2);
  e.target.value = m ? `${y}.${m}` : y;
}, true);

// 급여 콤마 처리
employmentBody.addEventListener('input', (e) => {
  if (!e.target.classList.contains('salary-amount')) return;
  let val = e.target.value.replace(/\D/g,'');
  if (!val) { e.target.value=''; return; }
  e.target.value = Number(val).toLocaleString('ko-KR');
  e.target.setSelectionRange(e.target.value.length, e.target.value.length);
});
});


// ===================================
// 교육이수
// ===================================
document.addEventListener('DOMContentLoaded', () => {
const trainingBody = document.getElementById('training_body');
let trainingIndex = 0;

function renderTrainingHTML(index) {
  return `
    <div class="col-12 form-field-item d-flex flex-column w-100 gap-1 mb-3 training-item">
      <div class="container">
        <div class="row gap-3 mb-3">
          <div class="col-12 text-end">
            <button type="button" class="btn btn-danger remove-training-btn">삭제</button>
          </div>
        </div>
        <div class="row gap-3 mb-3">
          <div class="col p-0 form-field-item">
            <label>교육명</label>
            <input type="text" class="form-control training-name" name="training[${index}][trainingName]" placeholder="교육명을 입력하세요.">
          </div>
          <div class="col p-0 form-field-item">
            <label>교육기관</label>
            <input type="text" class="form-control training-institution" name="training[${index}][trainingInstitution]" placeholder="교육기관을 입력하세요.">
          </div>
        </div>
        <div class="row gap-3 mb-3">
          <div class="col p-0 form-field-item">
            <label>교육기간 시작</label>
            <input type="text" class="form-control training-start" name="training[${index}][trainingStart]" placeholder="2020.01" maxlength="6">
          </div>
          <div class="col p-0 form-field-item">
            <label>교육기간 종료</label>
            <input type="text" class="form-control training-end" name="training[${index}][trainingEnd]" placeholder="2020.12" maxlength="6">
          </div>
        </div>
        <div class="row gap-3">
          <div class="col-12 p-0 form-field-item">
            <label>내용</label>
            <textarea class="form-control training-description" name="training[${index}][trainingDescription]" placeholder="교육내용과 성과를 간단히 적어주세요."></textarea>
          </div>
        </div>
      </div>
    </div>
  `;
}

trainingBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-training-btn')) {
    trainingIndex++;
    e.target.closest('.training-field').insertAdjacentHTML('beforebegin', renderTrainingHTML(trainingIndex));
  }
  if (e.target.classList.contains('remove-training-btn')) {
    e.target.closest('.training-item')?.remove();
  }
});

trainingBody.addEventListener('input', (e) => {
  if (!e.target.classList.contains('training-start') && !e.target.classList.contains('training-end')) return;
  e.target.value = e.target.value.replace(/\D/g,'').slice(0,6);
});

trainingBody.addEventListener('blur', (e) => {
  if (!e.target.classList.contains('training-start') && !e.target.classList.contains('training-end')) return;
  let v = e.target.value.replace(/\D/g,'');
  if (v.length < 4) return;
  const y = v.slice(0,4);
  let m = v.slice(4);
  if (m.length === 1) m='0'+m;
  if (m.length>2) m=m.slice(0,2);
  e.target.value = m ? `${y}.${m}` : y;
}, true);
});


// ===================================
// 자격증
// ===================================
document.addEventListener('DOMContentLoaded', () => {
const certificatesBody = document.getElementById('certificates_body');
let certificateIndex = 0;

function renderCertificateHTML(index) {
  return `
    <div class="col-12 form-field-item d-flex flex-column w-100 gap-1 mb-3 certificates-item">
      <div class="container">
        <div class="row gap-3 mb-3">
          <div class="col-12 text-end">
            <button type="button" class="btn btn-danger remove-certificates-btn">삭제</button>
          </div>
        </div>
        <div class="row gap-3 mb-3">
          <div class="col p-0 form-field-item">
            <label>자격증 명</label>
            <input type="text" class="form-control certificate-name" name="certificate[${index}][certificateName]" placeholder="자격증 명을 입력하세요.">
          </div>
          <div class="col p-0 form-field-item">
            <label>발행처</label>
            <input type="text" class="form-control certificate-org" name="certificate[${index}][certificateOrg]" placeholder="발행처를 입력하세요.">
          </div>
          <div class="col p-0 form-field-item">
            <label>취득일</label>
            <input type="text" class="form-control certificate-date" name="certificate[${index}][certificateDate]" placeholder="2020.01" maxlength="6">
          </div>
        </div>
      </div>
    </div>
  `;
}

certificatesBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-certificates-btn')) {
    certificateIndex++;
    e.target.closest('.certificates-field').insertAdjacentHTML('beforebegin', renderCertificateHTML(certificateIndex));
  }
  if (e.target.classList.contains('remove-certificates-btn')) {
    e.target.closest('.certificates-item')?.remove();
  }
});

certificatesBody.addEventListener('input', (e) => {
  if (!e.target.classList.contains('certificate-date')) return;
  e.target.value = e.target.value.replace(/\D/g,'').slice(0,6);
});

certificatesBody.addEventListener('blur', (e) => {
  if (!e.target.classList.contains('certificate-date')) return;
  let v = e.target.value.replace(/\D/g,'');
  if (v.length<4) return;
  const y=v.slice(0,4);
  let m=v.slice(4);
  if (m.length===1) m='0'+m;
  if (m.length>2) m=m.slice(0,2);
  e.target.value = m ? `${y}.${m}`:y;
}, true);
});


// =====================
// 병역(체크박스/셀렉트/날짜) 토글
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const preferences = document.querySelectorAll(".preference");
  const noticeBox = document.getElementById("noticeBox");
  const noticeConsent = document.getElementById("noticeConsent");
  const noticeItems = document.getElementById("noticeItems");
  const disabledDetail = document.getElementById("disabledDetail");
  const disabledGrade = document.getElementById("disabledGrade");
  const militaryCheckbox = document.getElementById("preference_military");
  const militaryBox = document.getElementById("militaryDetail");

  // ✅ 민감정보 박스 표시/숨김 + 수집 항목 업데이트
  const updateNoticeBox = () => {
    const checked = Array.from(preferences).filter(p => p.checked);
    const labels = checked.map(p => p.value);

    if (checked.length > 0) {
      noticeBox?.classList.remove("d-none");
      noticeItems.textContent = labels.join(" / ");
    } else {
      noticeBox?.classList.add("d-none");
      noticeItems.textContent = "";
      noticeConsent.checked = false;
    }
  };

  // ✅ 장애 선택 시 등급 선택 박스 표시
  const toggleDisabledBox = () => {
    if (document.getElementById("preference_disabled").checked) {
      disabledDetail?.classList.remove("d-none");
    } else {
      disabledDetail?.classList.add("d-none");
      disabledGrade.value = "";
    }
  };

  // ✅ 병역 select/입·제대일 (기존 코드 유지)
  const sel = document.getElementById("militaryStatus");
  const wEn = document.getElementById("enlistDateWrap");
  const wDi = document.getElementById("dischargeDateWrap");
  const iEn = document.getElementById("enlistDate");
  const iDi = document.getElementById("dischargeDate");

  const showBox = () => militaryBox?.classList.remove("d-none");
  const hideBox = () => {
    militaryBox?.classList.add("d-none");
    sel.value = "";
    hideInputs();
  };
  const showInputs = () => {
    wEn?.classList.remove("d-none");
    wEn?.classList.add("d-flex");
    wDi?.classList.remove("d-none");
    wDi?.classList.add("d-flex");
  };
  const hideInputs = () => {
    wEn?.classList.add("d-none");
    wEn?.classList.remove("d-flex");
    wDi?.classList.add("d-none");
    wDi?.classList.remove("d-flex");
    if (iEn) iEn.value = "";
    if (iDi) iDi.value = "";
  };

  militaryCheckbox?.addEventListener("change", () => {
    if (militaryCheckbox.checked) showBox();
    else hideBox();
    updateNoticeBox();
  });

  sel?.addEventListener("change", () => {
    if (sel.value === "served") showInputs();
    else hideInputs();
  });

  // ✅ 날짜 입력 포맷
  const handleInput = e => {
    if (!["enlistDate", "dischargeDate"].includes(e.target.id)) return;
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
  };
  const handleBlur = e => {
    if (!["enlistDate", "dischargeDate"].includes(e.target.id)) return;
    let v = e.target.value.replace(/\D/g, "");
    if (v.length < 4) return;
    const y = v.slice(0, 4);
    let m = v.slice(4);
    if (m.length === 1) m = "0" + m;
    if (m.length > 2) m = m.slice(0, 2);
    e.target.value = m ? `${y}.${m}` : y;
  };
  iEn?.addEventListener("input", handleInput);
  iEn?.addEventListener("blur", handleBlur, true);
  iDi?.addEventListener("input", handleInput);
  iDi?.addEventListener("blur", handleBlur, true);

  // ✅ 모든 체크박스 이벤트 공통 처리
  preferences.forEach(p => {
    p.addEventListener("change", () => {
      updateNoticeBox();
      toggleDisabledBox();
    });
  });

  // 초기화
  updateNoticeBox();
  toggleDisabledBox();
});



// ===================================
// 희망 근무조건 금액
// ===================================
const salaryInput = document.getElementById('work-salaryAmount');
salaryInput?.addEventListener('input', (e) => {
let val = e.target.value.replace(/\D/g,'');
if (!val) { e.target.value=''; return; }
e.target.value = Number(val).toLocaleString('ko-KR');
});


// =====================
// 이력서 저장 버튼 클릭 시 민감정보 동의 여부 확인
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveResumeBtn");
  const noticeBox = document.getElementById("noticeBox");
  const noticeConsent = document.getElementById("noticeConsent");

  if (!saveBtn) return;

  saveBtn.addEventListener("click", (e) => {
    // noticeBox가 보이는 상태인지 확인
    const isVisible = noticeBox && !noticeBox.classList.contains("d-none");

    if (isVisible && noticeConsent && !noticeConsent.checked) {
      e.preventDefault();
      alert("민감정보 수집에 동의해야 이력서를 저장할 수 있습니다.");
      return;
    }
  });
});
