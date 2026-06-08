function execDaumPostcode() {
   new daum.Postcode({
      oncomplete: function (data) {
         let fullAddr = ''; // 기본주소
         let extraAddr = ''; // 참고 항목 (동, 건물명 등)

         const isRoad = data.userSelectedType === 'R';

         // 기본 주소 설정
         fullAddr = isRoad ? data.roadAddress : data.jibunAddress;

         // 참고 항목 처리
         if (isRoad) {
            if (data.bname) extraAddr += data.bname;
            if (data.buildingName) {
               extraAddr += extraAddr
                  ? ', ' + data.buildingName
                  : data.buildingName;
            }
            if (extraAddr) {
               fullAddr += ` (${extraAddr})`;
            }
         }

         // input 요소에 값 삽입 (클래스로 선택)
         document.getElementById('zipcode').value = data.zonecode;
         document.querySelector('.basic-address').value = fullAddr;
         document.querySelector('.detail-address').focus();
      },
   }).open();
}
