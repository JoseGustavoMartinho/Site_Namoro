const audioPrincipal = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const fill = document.getElementById('fill');
const curTxt = document.getElementById('cur-time');
const totalTxt = document.getElementById('total-time');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// PLAYER DA PÁGINA INICIAL
playBtn.onclick = () => {
    if (audioPrincipal.paused) { audioPrincipal.play(); playBtn.innerText = '⏸'; }
    else { audioPrincipal.pause(); playBtn.innerText = '▶'; }
};

audioPrincipal.ontimeupdate = () => {
    if(audioPrincipal.duration) {
        fill.style.width = (audioPrincipal.currentTime / audioPrincipal.duration) * 100 + '%';
        curTxt.innerText = format(audioPrincipal.currentTime);
    }
};

audioPrincipal.onloadedmetadata = () => totalTxt.innerText = format(audioPrincipal.duration);

function format(s) { return Math.floor(s/60) + ":" + Math.floor(s%60).toString().padStart(2,'0'); }

// Botões de passar/voltar reiniciam a música atual
function restartSong() {
    audioPrincipal.currentTime = 0;
    audioPrincipal.play();
    playBtn.innerText = '⏸';
}
if(prevBtn) prevBtn.onclick = restartSong;
if(nextBtn) nextBtn.onclick = restartSong;

// CONTADOR
const DATA_INICIO = new Date(2024, 0, 7); 
function updateCounter() {
    const agora = new Date();
    let diff = agora - DATA_INICIO;
    let s = Math.floor(diff/1000), m = Math.floor(s/60), h = Math.floor(m/60), d = Math.floor(h/24);
    document.getElementById('anos').innerText = Math.floor(d/365);
    document.getElementById('meses').innerText = Math.floor((d%365)/30.44);
    document.getElementById('dias').innerText = Math.floor(d%30.44);
    document.getElementById('horas').innerText = h % 24;
    document.getElementById('minutos').innerText = m % 60;
    document.getElementById('segundos').innerText = s % 60;
}
setInterval(updateCounter, 1000);
updateCounter();

// --- CONFIGURAÇÃO DOS STORIES ---
// Adicione o nome do arquivo de música em 'musica' (Ex: "musica1.mp3")
const stories = [
    [ // GRUPO 0: NOSSA UNIÃO
        { h1: "O Começo", p: "Onde tudo mudou.", img: "FOTO.jpeg", musica: "MUSICA.mp3" },
        { 
          h1: "Nossa Linha", 
          img: "FOTO.jpeg",
          isTimelineV3: true, 
          musica: "MUSICA.mp3", // Música para a linha do tempo
          items: [
              { data: "07/01/2024", desc: "Início De Tudo As Aliança", img: "ALIANCA.jpeg" },
              { data: "07/01/2024", desc: "Primeira Foto Juntos", img: "FOTOJUNTO.jpeg" },
              { data: "07/02/2024", desc: "Primeiro Mes Juntos", img: "UMMES.jpeg" },
              { data: "31/03/2024", desc: "Segunda Festa Juntos", img: "FESTAPEDRA.jpeg" },
              { data: "18/04/2024", desc: "Primeiro Buque e Aniversário", img: "SEUANIVERSARIO.jpeg" },
              { data: "14/12/2024", desc: "Minha Formatura", img: "FORMATURA.jpeg" },
              { data: "26/11/2025", desc: "JAMPA e Jorge e Mateus", img: "VANGOGE.jpeg" },
              { data: "07/02/2024", desc: "Viagem com Família", img: "MAROGOGI.jpeg" },
              { data: "Hoje", desc: "Eternidade", img: "FOTO.jpeg" }
          ]
        },
        { h1: "Meu Amor", p: "Para sempre!", img: "FOTO.jpeg", musica: "MUSICA.mp3" }
    ],
    [ // GRUPO 1: RETROSPECTIVA
        { h1: "Momentos", p: "Cada segundo vale a pena.", img: "FOTO2.jpeg", musica: "MUSICA.mp3" },
        { h1: "Nossas Risadas", p: "O melhor som do mundo.", img: "FOTO3.jpeg", musica: "MUSICA.mp3" },
        { h1: "Gratidão", p: "Obrigado por ser você.", img: "FOTO1.jpeg", musica: "MUSICA.mp3" },
        { h1: "Te Amo", p: "Muito mais que tudo!", img: "FOTO2.jpeg", musica: "MUSICA.mp3" }
    ]
];

let gIdx = 0, sIdx = 0, storyTimer;
let audioStory = new Audio(); // Player exclusivo para os stories

function openStory(idx) {
    gIdx = idx; sIdx = 0;
    audioPrincipal.pause(); // Pausa a música do fundo
    playBtn.innerText = '▶';
    document.getElementById('story-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    createBars();
    loadStep();
}

function createBars() {
    const container = document.getElementById('progress-bars');
    container.innerHTML = stories[gIdx].map(() => '<div class="p-bar"><div class="p-fill"></div></div>').join('');
}

function loadStep() {
    const step = stories[gIdx][sIdx];
    const content = document.getElementById('story-content');
    const bg = document.getElementById('story-bg');
    const fills = document.querySelectorAll('.p-fill');
    const tLeft = document.getElementById('tap-left');
    const tRight = document.getElementById('tap-right');

    // TEMPOS DEFINIDOS: 45s para Linha do Tempo, 30s para o resto
    const tempoDesteStory = step.isTimelineV3 ? 45000 : 30000; 

    // Toca a música do story atual
    if(step.musica) {
        audioStory.src = step.musica;
        audioStory.play().catch(e => console.log("Erro ao tocar música do story:", e));
    }

    if(step.isTimelineV3) {
        bg.style.backgroundImage = "none";
        bg.style.backgroundColor = "#000";
        tLeft.style.width = "15%"; tRight.style.width = "15%";

        // Estrelas
        let starsHtml = '<div class="stars-container">';
        for(let i = 0; i < 50; i++) {
            let size = Math.random() * 3 + 1;
            let left = Math.random() * 100;
            let duration = Math.random() * 5 + 5;
            let delay = Math.random() * 5;
            starsHtml += `<div class="star" style="width:${size}px; height:${size}px; left:${left}%; animation-duration:${duration}s; animation-delay:-${delay}s;"></div>`;
        }
        bg.innerHTML = starsHtml + '</div>';

        let html = '<div class="timeline-scroll-area"><div class="timeline-v3">';
        step.items.forEach(item => {
            html += `<div class="tl3-item"><div class="tl3-marker"></div><img src="${item.img}" class="tl3-img"><div class="tl3-text"><div class="tl3-date">${item.data}</div><div class="tl3-desc">${item.desc}</div></div></div>`;
        });
        content.innerHTML = `<h1 style="font-size:36px; margin-top:20px;">${step.h1}</h1>` + html + '</div></div>';
    } else {
        bg.innerHTML = "";
        bg.style.backgroundImage = `url('${step.img}')`;
        tLeft.style.width = "30%"; tRight.style.width = "70%";
        content.innerHTML = `<h1 style="font-size:36px;">${step.h1}</h1><p style="font-size:22px;">${step.p}</p>`;
    }

    fills.forEach((f, i) => { 
        f.style.transition = 'none'; 
        f.style.width = i < sIdx ? '100%' : '0%'; 
    });
    
    setTimeout(() => {
        fills[sIdx].style.transition = `width ${tempoDesteStory}ms linear`;
        fills[sIdx].style.width = '100%';
    }, 50);

    clearTimeout(storyTimer);
    storyTimer = setTimeout(() => nextStep(), tempoDesteStory);
}

function nextStep() {
    if(sIdx < stories[gIdx].length - 1) { sIdx++; loadStep(); }
    else closeStory();
}
function prevStep() {
    if(sIdx > 0) { sIdx--; loadStep(); }
    else loadStep();
}
function closeStory() {
    audioStory.pause();
    document.getElementById('story-modal').style.display = 'none';
    document.body.style.overflow = ''; 
    clearTimeout(storyTimer);
}

document.getElementById('close-x').onclick = (e) => { e.stopPropagation(); closeStory(); };
document.getElementById('tap-left').onclick = (e) => { e.stopPropagation(); prevStep(); };
document.getElementById('tap-right').onclick = (e) => { e.stopPropagation(); nextStep(); };