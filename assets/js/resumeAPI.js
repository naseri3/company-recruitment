// =======================================
// 📌 API Endpoint 목록 (BASE_URL 기준)
// BASE_URL: https://api.example.com     // 실제 API 주소로 변경 요망
// ---------------------------------------
// [POST] /login                  → 로그인
// [POST] /resume                 → 이력서 저장
// [GET]  /resume/{id}            → 이력서 조회
// [GET]  /resume/{id}/download   → 이력서 PDF 다운로드
// =======================================

const BASE_URL = 'https://api.example.com'; // 실제 API 주소로 변경할 것


// 로그인 API
export async function login(email, password) {
   const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
   });
   const data = await res.json();
   return data.token;
}

// 공통 헤더 생성
function getAuthHeaders() {
   const token = localStorage.getItem('token');
   return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
   };
}

// 이력서 저장
export async function saveResume(data) {
   const res = await fetch(`${BASE_URL}/resume`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
   });
   return res.json();
}

// 이력서 불러오기
export async function getResume(id) {
   const res = await fetch(`${BASE_URL}/resume/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
   });
   return res.json();
}

// 이력서 PDF 다운로드
export async function downloadResumePDF(id) {
   const res = await fetch(`${BASE_URL}/resume/${id}/download`, {
      method: 'GET',
      headers: getAuthHeaders(),
   });

   const blob = await res.blob();
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'resume.pdf';
   document.body.appendChild(a);
   a.click();
   a.remove();
}
