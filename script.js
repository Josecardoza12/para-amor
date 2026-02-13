const config = {
    1: { title: "Cena Estelar", text: "Bajo las estrellas y con tu sonrisa, no necesito pedirle nada más al universo. Eres mi todo.", emoji: "🍷✨" },
    2: { title: "Calor de Hogar", text: "Cualquier lugar es perfecto si estoy a tu lado. Tu abrazo es mi refugio favorito.", emoji: "🧸🔥" },
    3: { title: "Amanecer Juntos", text: "Ver el sol nacer en tus ojos es el espectáculo más bello que he visto jamás. Te amo.", emoji: "🌅❤️" }
};

let selectedEmoji = '';

// 1. EL GRAN MOMENTO: DEL CORAZÓN A LOS TULIPANES
function igniteLove() {
    const audio = document.getElementById('loveSong');
    audio.play();

    // Efecto de explosión de corazones al hacer click
    burstHearts();

    // Transición suave
    setTimeout(() => {
        document.body.classList.add('garden-mode');
        nextScene('scene-1');
        
        // Iniciar lluvia masiva de tulipanes y brillos
        spawnRain('tulip-garden', '🌷', 60);
        spawnRain('particles-background', '✨', 30);
    }, 500);
}

// 2. NAVEGACIÓN
function nextScene(id) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 3. SELECCIÓN
function selectChar(name, emoji) {
    selectedEmoji = emoji;
    nextScene('scene-3');
}

function selectOption(id) {
    const res = config[id];
    document.getElementById('res-title').innerText = `${selectedEmoji} ${res.title}`;
    document.getElementById('res-text').innerText = res.text;
    document.getElementById('res-emoji').innerText = res.emoji;
    nextScene('scene-4');
}

function restart() {
    location.reload();
}

// --- EFECTOS VISUALES AVANZADOS ---

function spawnRain(containerId, symbol, count) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerText = symbol;
        
        const size = Math.random() * 20 + 20;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = size + 'px';
        p.style.top = '-50px';
        p.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(p);

        // Animación de caída fluida
        p.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { opacity: 1, offset: 0.1 },
            { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 5000 + 4000,
            iterations: Infinity,
            delay: Math.random() * 8000
        });
    }
}

function burstHearts() {
    for (let i = 0; i < 15; i++) {
        const h = document.createElement('div');
        h.innerText = '❤️';
        h.style.position = 'fixed';
        h.style.left = '50%';
        h.style.top = '50%';
        h.style.fontSize = '2rem';
        h.style.zIndex = '1000';
        document.body.appendChild(h);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 200 + 100;
        
        h.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => h.remove();
    }
}

// Inicializar corazones suaves en la intro
window.onload = () => {
    spawnRain('particles-background', '❤️', 15);
};