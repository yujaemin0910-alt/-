// ===== <site-header> =====
class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .site-header {
                    background-color: #ffffff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    padding: 1.5rem 0;
                    font-family: 'Pretendard', sans-serif;
                }
                .site-header__wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2rem;
                }
                .site-header__logo {
                    font-size: 2rem;
                    font-weight: 900;
                    color: #1a2a6c;
                    text-decoration: none;
                }
                .site-header__nav {
                    display: flex;
                    gap: 3rem;
                }
                .site-header__nav a {
                    text-decoration: none;
                    color: #333333;
                    font-weight: 600;
                    font-size: 1.4rem;
                }
                .site-header__mobile-menu-btn {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                }
                .site-header__mobile-menu-btn span {
                    width: 25px;
                    height: 3px;
                    background-color: #1a2a6c;
                    border-radius: 2px;
                }

                @media (max-width: 768px) {
                    .site-header__nav {
                        display: none;
                    }
                    .site-header__mobile-menu-btn {
                        display: flex;
                    }
                }
                
                .is-mobile-menu-open .site-header__nav {
                    display: flex;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    flex-direction: column;
                    padding: 2rem;
                    gap: 2rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            </style>
            <header class="site-header">
                <div class="site-header__wrapper">
                    <a href="/" class="site-header__logo">👵 시니어 정보센터</a>
                    <nav class="site-header__nav">
                        <a href="/#main-content">최신 정보</a>
                        <a href="/#quick-links-title">자주 찾는 서비스</a>
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
        
        const btn = this.shadowRoot.querySelector('.site-header__mobile-menu-btn');
        btn.addEventListener('click', () => {
            this.shadowRoot.querySelector('.site-header').classList.toggle('is-mobile-menu-open');
        });
    }
}

// ===== <site-footer> =====
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .site-footer {
                    background-color: #1a2a6c;
                    color: #ffffff;
                    padding: 6rem 2rem;
                    margin-top: 8rem;
                    font-family: 'Pretendard', sans-serif;
                }
                .site-footer__wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                }
                .site-footer__links {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                .site-footer__links a {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 1.4rem;
                }
                .site-footer__copyright {
                    font-size: 1.2rem;
                    opacity: 0.8;
                    margin-bottom: 1rem;
                }
                .site-footer__disclaimer {
                    font-size: 1.1rem;
                    opacity: 0.6;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }
            </style>
            <footer class="site-footer">
                <div class="site-footer__wrapper">
                    <div class="site-footer__links">
                        <a href="/about.html">센터 소개</a>
                        <a href="/privacy.html">개인정보처리방침</a>
                    </div>
                    <p class="site-footer__copyright">© ${new Date().getFullYear()} 시니어 정책 정보센터. All rights reserved.</p>
                    <p class="site-footer__disclaimer">본 사이트의 정보는 공식 발표를 기반으로 하며, 최신 정보와 다를 수 있습니다.</p>
                </div>
            </footer>
        `;
    }
}

// ===== <cookie-consent> =====
class CookieConsent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const isConsented = localStorage.getItem('cookieConsent');
        if (!isConsented) {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .cookie-consent {
                    position: fixed;
                    bottom: 2rem;
                    left: 2rem;
                    right: 2rem;
                    background: #fff;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 9999;
                    border: 2px solid #eee;
                    font-family: 'Pretendard', sans-serif;
                }
                .cookie-consent p {
                    margin: 0;
                    font-size: 1.2rem;
                    color: #333;
                }
                .btn-accept {
                    background: #0052cc;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    white-space: nowrap;
                    margin-left: 2rem;
                }
                @media (max-width: 600px) {
                    .cookie-consent {
                        flex-direction: column;
                        text-align: center;
                        gap: 1.5rem;
                    }
                    .btn-accept {
                        margin-left: 0;
                        width: 100%;
                    }
                }
            </style>
            <div class="cookie-consent">
                <p>본 사이트는 사용자 경험 개선 및 통계 분석을 위해 쿠키를 사용합니다.</p>
                <button class="btn-accept">동의</button>
            </div>
        `;

        this.shadowRoot.querySelector('.btn-accept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            this.remove();
        });
    }
}

// ===== <article-card> =====
class ArticleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const icon = this.getAttribute('icon');
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        const link = this.getAttribute('link');
        const isFeatured = this.hasAttribute('data-featured');

        const defaultImage = 'https://picsum.photos/seed/default/800/600';
        const cardImage = image || defaultImage;

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                    cursor: pointer;
                    font-family: 'Pretendard', sans-serif;
                }
                .card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background-color: #fff;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    color: #333;
                    text-decoration: none;
                    border: 3px solid #eee;
                }
                :host([data-featured]) .card {
                    background: #1a2a6c;
                    color: #fff;
                    border-color: #1a2a6c;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.25);
                }
                .image-wrapper {
                    width: 100%;
                    height: 250px;
                    overflow: hidden;
                    background-color: #ddd;
                }
                .image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
                .icon { 
                    font-size: 4rem; 
                    margin: 2rem 2rem 1rem; 
                    display: ${icon ? 'block' : 'none'};
                }
                .content { 
                    padding: 2rem;
                    flex-grow: 1; 
                }
                .title { 
                    font-size: 2.2rem; 
                    margin-bottom: 1rem; 
                    font-weight: 900; 
                    color: #1a2a6c;
                    line-height: 1.3;
                }
                :host([data-featured]) .title { 
                    color: #ffd700; 
                }
                .description { 
                    font-size: 1.4rem;
                    color: #555; 
                    margin-bottom: 1.5rem; 
                    line-height: 1.6;
                }
                :host([data-featured]) .description { 
                    color: #fff; 
                    opacity: 0.9;
                }
                .link-area {
                    text-align: right;
                    font-weight: 900;
                    color: #0052cc;
                    font-size: 1.4rem;
                    padding: 1.5rem 2rem;
                    background: #f0f7ff;
                    border-top: 1px solid #eee;
                }
                :host([data-featured]) .link-area {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ffd700;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
            </style>
            <div class="card">
                <div class="image-wrapper">
                    <img class="image" src="${cardImage}" alt="${title || ''}" onerror="this.src='${defaultImage}'">
                </div>
                ${icon ? `<div class="icon">${icon}</div>` : ''}
                <div class="content">
                    <h3 class="title">${title}</h3>
                    <p class="description">${description}</p>
                </div>
                <div class="link-area">자세히 보기 &rarr;</div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        this.addEventListener('click', () => {
            if (link) {
                window.location.href = link;
            }
        });
    }
}

// Define all custom elements
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
customElements.define('cookie-consent', CookieConsent);
customElements.define('article-card', ArticleCard);
