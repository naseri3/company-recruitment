const track = document.querySelector('.slider-track');
const leftBtn = document.querySelector('.slider-btn.left');
const rightBtn = document.querySelector('.slider-btn.right');

const cardWidth = 152; // 카드(110px) + 여백 포함
const visibleCards = 8; // 한번에 보여지는 카드 개수
let currentIndex = 0;
let totalCards = document.querySelectorAll('.card').length;

// -------------------------
// 슬라이드 이동 함수
// -------------------------
function updateSlider() {
  track.style.transition = 'transform 0.3s ease'; // 버튼 클릭 시 부드럽게 이동
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// -------------------------
// 좌우 버튼 이벤트
// -------------------------
leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

rightBtn.addEventListener('click', () => {
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    updateSlider();
  }
});

// -------------------------
// 카드 랜덤 섞기 기능
// -------------------------
function shuffleCards() {
  const cards = Array.from(track.children);

  // Fisher-Yates shuffle 알고리즘
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  track.innerHTML = "";
  cards.forEach(card => track.appendChild(card));

  currentIndex = 0;
  updateSlider();
}

setInterval(shuffleCards, 60000);

// -------------------------
// 드래그 슬라이드 기능 추가
// -------------------------
let isDragging = false;
let startX = 0;
let currentTranslate = 0; // 현재 슬라이드 위치
let prevTranslate = 0;

track.addEventListener('mousedown', dragStart);
track.addEventListener('touchstart', dragStart);

track.addEventListener('mousemove', dragMove);
track.addEventListener('touchmove', dragMove);

track.addEventListener('mouseup', dragEnd);
track.addEventListener('mouseleave', dragEnd);
track.addEventListener('touchend', dragEnd);

function dragStart(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  track.style.transition = 'none'; // 드래그 중엔 부드럽게 이동 제거
}

function dragMove(e) {
  if (!isDragging) return;
  const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;

  // 좌우 경계 제한
  const maxTranslate = 0;
  const minTranslate = -cardWidth * (totalCards - visibleCards);
  if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
  if (currentTranslate < minTranslate) currentTranslate = minTranslate;

  track.style.transform = `translateX(${currentTranslate}px)`;
}
function dragStart(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  track.style.transition = 'none';
  
  // 기본 동작 방지 (이미지/텍스트 선택 방지)
  if (e.type.includes('mouse')) e.preventDefault();
}

function dragEnd(e) {
  if (!isDragging) return;
  isDragging = false;

  // 가장 가까운 카드 위치로 스냅
  const cardIndex = Math.round(-currentTranslate / cardWidth);
  currentIndex = Math.min(Math.max(cardIndex, 0), totalCards - visibleCards); // 범위 제한
  currentTranslate = -currentIndex * cardWidth;
  prevTranslate = currentTranslate;

  track.style.transition = 'transform 0.3s ease'; // 스냅 이동 애니메이션
  track.style.transform = `translateX(${currentTranslate}px)`;
}
