// Senior Policy News Website - Main JS

document.addEventListener('DOMContentLoaded', () => {
  console.log('Senior Policy News Website initialized.');

  const newsCards = document.querySelectorAll('.news-card');
  
  newsCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h2').innerText;
      alert(`뉴스 상세 보기: ${title}\n(기능 준비 중입니다.)`);
    });

    // Handle accessibility for the button specifically
    const btn = card.querySelector('.btn-action');
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card click trigger
      const title = card.querySelector('h2').innerText;
      alert(`상세 내용을 준비 중입니다: ${title}`);
    });
  });

  // Future feature: Fetch real-time data from Open API (data.go.kr)
  // For now, using sample content.
});
