window.addEventListener('DOMContentLoaded', () => {
  // URL 파라미터에서 'name' 값 가져오기
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');

  if (name) {
    // 문서 제목 변경
    document.title = `${name}님의 이력서`;
    const h1 = document.querySelector('#resume h1');
    if (h1) {
      // H1 태그 내용 변경
      h1.textContent = `${name}님의 이력서 상세 보기`;
    }
  }

  // 로컬 스토리지에서 저장된 이력서 데이터를 가져오기
  const savedData = JSON.parse(localStorage.getItem('resumeData'));
  const saveButton = document.getElementById('saveButton');

  if (savedData) {
    // 저장된 데이터가 있으면 불러오기
    loadResumeData(savedData);
    saveButton.textContent = '수정하기'; // 버튼 텍스트 변경
  } else {
    saveButton.textContent = '저장하기'; // 버튼 텍스트 변경
  }

  // 체크박스 기능 연결
  setupStillWorkingToggle(); 
});

// 재직중 체크박스에 대한 기능 설정
function setupStillWorkingToggle() {
  const careerItems = document.querySelectorAll('.career-item');

  careerItems.forEach((item) => {
    const checkbox = item.querySelector('.stillWorking');
    const retirementWrapper = item.querySelector('.retirement-wrapper');
    const retirementDateDiv = item.querySelector('.retirementDate');

    if (!retirementWrapper || !retirementDateDiv) return; // 퇴사일 정보가 없으면 종료

    // 퇴사일이 있는지 확인
    const hasRetirementDate = retirementDateDiv.textContent.trim() !== '';

    // 체크박스와 퇴사일 영역의 visibility 처리
    if (checkbox) {
      // 퇴사일이 있을 경우 체크박스 숨기기
      checkbox.closest('.col-12.col-md-4.p-0').classList.toggle('hidden', hasRetirementDate); 
      retirementWrapper.classList.toggle('hidden', checkbox.checked); // 재직중이면 퇴사일 숨기기

      // 체크박스가 체크될 때 퇴사일 영역 보이기/숨기기
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          retirementWrapper.classList.add('hidden'); // 재직중 체크박스가 선택되었을 경우 퇴사일 숨기기
        } else {
          retirementWrapper.classList.remove('hidden'); // 체크해제 시 퇴사일 표시
        }
      });
      
      // 레이아웃 원래대로 유지
      retirementWrapper.classList.remove('col-md-8');
    } else { 
      // 재직중 체크박스가 없으면 퇴사일 영역을 8칸으로 넓히기
      retirementWrapper.classList.add('col-md-8');
    }
  });
}

// 자격증 삭제 이벤트 연결
function attachDeleteEvent(item) {
  const deleteBtn = item.querySelector('.deleteQualifications');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      item.remove(); // 해당 항목 삭제
    });
  }
}

// 날짜 포맷 수정 이벤트 연결
function attachDateFormatEvent(item) {
  const dateInput = item.querySelector('input[placeholder="2020.01"]');
  if (dateInput) {
    dateInput.addEventListener('input', () => {
      // 입력 시 날짜 포맷 보정
      autoFormatYearMonth(dateInput);
    });
  }
}

// 연도-월 자동 포맷팅 기능
function autoFormatYearMonth(input) {
  const value = input.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
  // 6자리 이상일 때 포맷 변화
  if (value.length > 4) {
    input.value = `${value.slice(0, 4)}.${value.slice(4, 6)}`;
  } else if (value.length === 4) {
    input.value = `${value}.`;
  }
}

// 저장 버튼 클릭 이벤트
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
  const nameInput = document.getElementById('userName');
  // 이름 입력 확인
  if (!nameInput || !nameInput.value.trim()) {
    alert('이름을 입력해주세요.'); // 알림 메시지
    return; // 함수 종료
  }

  // 이력서 데이터 저장 함수 호출
  saveResumeData();
});

// localStorage 저장된 이력서 데이터 불러오기 함수
function loadResumeData(savedData) {
    document.querySelector('.userName').textContent = savedData.name || ''; // 이름
    document.querySelector('.userBirth').textContent = savedData.birth || ''; // 생년월일
    document.querySelector('.userGender').textContent = savedData.gender || ''; // 성별
    document.querySelector('.userEmail').textContent = savedData.email || ''; // 이메일
    document.querySelector('.userTel').textContent = savedData.tel || ''; // 전화번호
    document.querySelector('.userPhone').textContent = savedData.phone || ''; // 휴대폰번호
    document.querySelector('.userzipcode').textContent = savedData.zipcode || ''; // 우편번호
    document.querySelector('.userbasicAddress').textContent = savedData.basicAddress || ''; // 기본주소
    document.querySelector('.userdetailAdress').textContent = savedData.detailAddress || ''; // 상세주소
    document.querySelector('.companyName').textContent = savedData.company || ''; // 회사명
    document.querySelector('.job').textContent = savedData.job || ''; // 담당직무
    document.querySelector('.position').textContent = savedData.position || ''; // 직무직책
    document.querySelector('.employmentDate').textContent = savedData.employmentDate || ''; // 입사일
    document.querySelector('.retirementDate').textContent = savedData.retirementDate || ''; // 퇴사일
    document.querySelector('.educationName').textContent = savedData.educationName || ''; // 교육명
    document.querySelector('.educationInstitutions').textContent = savedData.educationInstitutions || ''; // 교육기관
    document.querySelector('.startDate').textContent = savedData.startDate || ''; // 시작일
    document.querySelector('.endDate').textContent = savedData.endDate || ''; // 종료일
    document.querySelector('.certificateName').textContent = savedData.certificateName || ''; // 자격증명
    document.querySelector('.publisher').textContent = savedData.publisher || ''; // 발행처
    document.querySelector('.aAcquisitionDate').textContent = savedData.acquisitionDate || ''; // 취득일
    document.querySelector('.detailDate').textContent = savedData.detail || ''; // 자격증, 교육 내용

    // 자기소개서 불러오기 (배열로 저장하고 불러올 경우)
    const selfIntroductions = savedData.selfIntroduction || [];
    selfIntroductions.forEach((intro, index) => {
        const introElement = document.querySelector(`.self-introduction:nth-of-type(${index + 1}) .text`);
        if (introElement) {
            introElement.textContent = intro;
        }
    });
}

// localStorage 이력서 데이터를 로컬 스토리지에 저장하는 함수
function saveResumeData() {
    const savedData = {
        name: document.querySelector('.userName').textContent.trim(), 
        birth: document.querySelector('.userBirth').textContent.trim(), 
        gender: document.querySelector('.userGender').textContent.trim(), 
        email: document.querySelector('.userEmail').textContent.trim(), 
        tel: document.querySelector('.userTel').textContent.trim(), 
        phone: document.querySelector('.userPhone').textContent.trim(), 
        zipcode: document.querySelector('.userzipcode').textContent.trim(), 
        basicAddress: document.querySelector('.userbasicAddress').textContent.trim(), 
        detailAddress: document.querySelector('.userdetailAdress').textContent.trim(), 
        company: document.querySelector('.companyName').textContent.trim(), 
        job: document.querySelector('.job').textContent.trim(), 
        position: document.querySelector('.position').textContent.trim(), 
        employmentDate: document.querySelector('.employmentDate').textContent.trim(), 
        retirementDate: document.querySelector('.retirementDate').textContent.trim(), 
        educationName: document.querySelector('.educationName').textContent.trim(), 
        educationInstitutions: document.querySelector('.educationInstitutions').textContent.trim(), 
        startDate: document.querySelector('.startDate').textContent.trim(), 
        endDate: document.querySelector('.endDate').textContent.trim(), 
        certificateName: document.querySelector('.certificateName').textContent.trim(), 
        publisher: document.querySelector('.publisher').textContent.trim(), 
        acquisitionDate: document.querySelector('.aAcquisitionDate').textContent.trim(),
        detail: document.querySelector('.detailDate').textContent.trim(),
        selfIntroduction: [
            document.querySelector('.self-introduction:nth-of-type(1) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(2) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(3) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(4) .text').textContent.trim(),
        ],
    };

    localStorage.setItem('resumeData', JSON.stringify(savedData)); // 데이터를 JSON 형식으로 저장
    alert('이력서가 저장되었습니다.'); // 성공 알림
}

// JSON으로 이력서 데이터를 서버에 저장하는 함수
async function saveResumeDataToServer() {
    const savedData = {
        name: document.querySelector('.userName').textContent.trim(),
        birth: document.querySelector('.userBirth').textContent.trim(), 
        gender: document.querySelector('.userGender').textContent.trim(), 
        email: document.querySelector('.userEmail').textContent.trim(), 
        tel: document.querySelector('.userTel').textContent.trim(), 
        phone: document.querySelector('.userPhone').textContent.trim(), 
        zipcode: document.querySelector('.userzipcode').textContent.trim(), 
        basicAddress: document.querySelector('.userbasicAddress').textContent.trim(), 
        detailAddress: document.querySelector('.userdetailAdress').textContent.trim(), 
        company: document.querySelector('.companyName').textContent.trim(), 
        job: document.querySelector('.job').textContent.trim(), 
        position: document.querySelector('.position').textContent.trim(), 
        employmentDate: document.querySelector('.employmentDate').textContent.trim(), 
        retirementDate: document.querySelector('.retirementDate').textContent.trim(), 
        educationName: document.querySelector('.educationName').textContent.trim(), 
        educationInstitutions: document.querySelector('.educationInstitutions').textContent.trim(), 
        startDate: document.querySelector('.startDate').textContent.trim(), 
        endDate: document.querySelector('.endDate').textContent.trim(), 
        certificateName: document.querySelector('.certificateName').textContent.trim(), 
        publisher: document.querySelector('.publisher').textContent.trim(), 
        acquisitionDate: document.querySelector('.aAcquisitionDate').textContent.trim(),
        detail: document.querySelector('.detailDate').textContent.trim(),
        selfIntroduction: [
            document.querySelector('.self-introduction:nth-of-type(1) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(2) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(3) .text').textContent.trim(),
            document.querySelector('.self-introduction:nth-of-type(4) .text').textContent.trim(),
        ],
    };

    try {
        const response = await fetch('https://your-api-endpoint.com/resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedData), // JSON으로 변환하여 전송
        });

        if (!response.ok) {
            throw new Error('서버에 데이터 저장 실패');
        }

        const result = await response.json();
        alert('이력서가 성공적으로 저장되었습니다.');
    } catch (error) {
        console.error('오류:', error);
        alert('데이터 저장 중 오류가 발생했습니다.');
    }
}


// JSON으로 서버에서 이력서 데이터를 불러오는 함수
async function loadResumeDataFromServer() {
    try {
        const response = await fetch('https://your-api-endpoint.com/resume');
        
        if (!response.ok) {
            throw new Error('서버에서 데이터 불러오기 실패');
        }

        const savedData = await response.json(); // JSON 형태로 변환
        
        // loadResumeData 함수를 호출하여 DOM에 데이터를 표시
        loadResumeData(savedData); 
    } catch (error) {
        console.error('오류:', error);
        alert('데이터 불러오기 중 오류가 발생했습니다.');
    }
}