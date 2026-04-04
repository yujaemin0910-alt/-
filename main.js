import { SiteHeader } from './components/SiteHeader.js';
import { SiteFooter } from './components/SiteFooter.js';
import { CookieConsent } from './components/CookieConsent.js';

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

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                    cursor: pointer;
                }
                .card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background-color: var(--color-white, #fff);
                    border-radius: var(--border-radius-large, 20px);
                    overflow: hidden;
                    box-shadow: var(--shadow-strong, 0 8px 16px rgba(0,0,0,0.2));
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    color: var(--color-dark-gray, #333);
                    text-decoration: none;
                    border: 3px solid #eee;
                }
                :host([data-featured]) .card {
                    background: var(--color-navy, #1a2a6c);
                    color: var(--color-white, #fff);
                    border-color: var(--color-navy, #1a2a6c);
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.25);
                }
                .image {
                    height: 250px;
                    background-size: cover;
                    background-position: center;
                    background-image: url('${image || ''}');
                    display: ${image ? 'block' : 'none'};
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
                    color: var(--color-navy, #1a2a6c);
                    line-height: 1.3;
                }
                :host([data-featured]) .title { 
                    color: var(--color-yellow, #ffd700); 
                }
                .description { 
                    font-size: 1.4rem;
                    color: #555; 
                    margin-bottom: 1.5rem; 
                    line-height: 1.6;
                }
                :host([data-featured]) .description { 
                    color: var(--color-white, #fff); 
                    opacity: 0.9;
                }
                .link-area {
                    text-align: right;
                    font-weight: 900;
                    color: var(--color-blue, #0052cc);
                    font-size: 1.4rem;
                    padding: 1.5rem 2rem;
                    background: #f0f7ff;
                    border-top: 1px solid #eee;
                }
                :host([data-featured]) .link-area {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--color-yellow, #ffd700);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
            </style>
            <div class="card">
                ${image ? `<div class="image"></div>` : ''}
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


// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('site-header');
    const mobileMenuBtn = header.shadowRoot.querySelector('.site-header__mobile-menu-btn');
    const nav = header.shadowRoot.querySelector('.site-header__nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            header.shadowRoot.querySelector('.site-header').classList.toggle('is-mobile-menu-open');
        });
    }
});
