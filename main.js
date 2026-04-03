import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// --- Three.js Background Scene ---
class BackgroundScene {
  constructor() {
    this.container = document.getElementById('bg-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    this.init();
    this.animate();
    this.handleResize();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Add some floating spheres
    this.spheres = [];
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < 20; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      this.scene.add(mesh);
      this.spheres.push({
        mesh,
        speed: Math.random() * 0.01 + 0.002,
        rotSpeed: Math.random() * 0.02
      });
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040));

    this.camera.position.z = 5;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.spheres.forEach(s => {
      s.mesh.rotation.x += s.rotSpeed;
      s.mesh.rotation.y += s.rotSpeed;
      s.mesh.position.y += Math.sin(Date.now() * 0.001 * s.speed) * 0.01;
    });

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

// --- Web Components ---

class GlassCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || '';
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          color: white;
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.5);
        }
        h2 {
          margin-top: 0;
          font-size: 1.5rem;
          background: linear-gradient(to right, #fff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      </style>
      <div class="card">
        ${title ? `<h2>${title}</h2>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="nav-bar">
        <div class="logo" style="font-weight: 800; font-size: 1.5rem;">JAMNA</div>
        <div class="links">
          <button class="btn-primary">Connect Wallet</button>
        </div>
      </nav>
    `;
  }
}

// Register Components
customElements.define('glass-card', GlassCard);
customElements.define('nav-bar', NavBar);

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  new BackgroundScene();
});
