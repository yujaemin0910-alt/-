/*=============================================*
 * W E B   C O M P O N E N T S
 *=============================================*/

// ===== <site-header> =====
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="site-header">
                <div class="site-header__wrapper">
                    <a href="/" class="site-header__logo">👵 시니어 정보센터</a>
                    <nav class="site-header__nav">
                        <a href="#main-content">최신 정보</a>
                        <a href="#quick-links-title">자주 찾는 서비스</a>
                        <a href="#">정책 자료실</a>
                    </nav>
                    <button class="site-header__mobile-menu-btn" aria-label="메뉴 열기">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>
        `;
        this.querySelector('.site-header__mobile-menu-btn').addEventListener('click', this.toggleMobileMenu);
    }

    toggleMobileMenu() {
        const header = document.querySelector('.site-header');
        header.classList.toggle('is-mobile-menu-open');
    }
}
customElements.define('site-header', SiteHeader);

// ===== <site-footer> =====
class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="site-footer__wrapper">
                    <div class="site-footer__links">
                        <a href="#">센터 소개</a>
                        <a href="#">개인정보처리방침</a>
                        <a href="#">광고 문의</a>
                    </div>
                    <p class="site-footer__copyright">© ${new Date().getFullYear()} 시니어 정책 정보센터. All rights reserved.</p>
                    <p class="site-footer__disclaimer">본 사이트의 정보는 공식 발표를 기반으로 하며, 최신 정보와 다를 수 있습니다.</p>
                </div>
            </footer>
        `;
    }
}
customElements.define('site-footer', SiteFooter);

// ===== <article-card> =====
class ArticleCard extends HTMLElement {
    connectedCallback() {
        const icon = this.getAttribute('icon') || '📄';
        const title = this.getAttribute('title') || '제목 없음';
        const description = this.getAttribute('description') || '내용 없음';
        const link = this.getAttribute('link') || '#';
        const isFeatured = this.hasAttribute('data-featured');

        this.innerHTML = `
            <a href="${link}" class="article-card ${isFeatured ? 'article-card--featured' : ''}">
                <div class="article-card__icon">${icon}</div>
                <div class="article-card__content">
                    <h3 class="article-card__title">${title}</h3>
                    <p class="article-card__description">${description}</p>
                </div>
                <span class="article-card__link">자세히 보기 &rarr;</span>
            </a>
        `;
    }
}
customElements.define('article-card', ArticleCard);


// ===== <cookie-consent> =====
class CookieConsent extends HTMLElement {
    connectedCallback() {
        const isConsented = localStorage.getItem('cookieConsent');
        if (!isConsented) {
            this.innerHTML = `
                <div class="cookie-consent">
                    <p>본 사이트는 사용자 경험 개선 및 통계 분석을 위해 쿠키를 사용합니다. <a href="#">자세히 보기</a></p>
                    <button class="btn-accept">동의</button>
                </div>
            `;
            this.querySelector('.btn-accept').addEventListener('click', this.acceptConsent);
        }
    }

    acceptConsent() {
        localStorage.setItem('cookieConsent', 'true');
        document.querySelector('cookie-consent').style.display = 'none';
    }
}
customElements.define('cookie-consent', CookieConsent);