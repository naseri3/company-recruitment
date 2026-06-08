document.getElementById('loadPensionBtn').addEventListener('click', () => {
   // 여기서 국민연금 API 호출 함수 실행
   loadNationalPensionData();
});

function loadNationalPensionData() {
   console.log('국민연금 API 연동 시작');
}
