function abrir() {
  document.getElementById("start").style.display = "none";
  document.getElementById("conteudo").classList.remove("hidden");
}

// Redirecionamento para o Spotify
function irParaSpotify() {
  // Se for um link externo (playlist), use:
  // window.location.href = "LINK_DA_SUA_PLAYLIST";
  
  // Se for para o outro arquivo do spotify que você criou, use:
  window.location.href = "spotify.html"; 
}

// CONTADOR
const inicio = new Date("2024-01-07");

function atualizarContador() {
  const agora = new Date();
  const diff = agora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);

  const contadorElemento = document.getElementById("contador");
  if (contadorElemento) {
    contadorElemento.innerText = dias + " dias, " + horas + "h " + minutos + "min ❤️";
  }
}

setInterval(atualizarContador, 1000);
atualizarContador();

// STORIES + MÚSICA
let storyIndex = 0;
const storyTrack = document.getElementById("storyTrack");
const storyImages = document.querySelectorAll("#storyTrack img");
const dotsContainer = document.getElementById("dots");
const player = document.getElementById("player");

const musicas = ["musica1.mp3", "musica2.mp3", "musica3.mp3"];

if (storyImages.length > 0) {
  storyImages.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function atualizarStory() {
    storyTrack.style.transform = `translateX(-${storyIndex * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[storyIndex].classList.add("active");

    player.src = musicas[storyIndex];
    player.play().catch(() => console.log("Autoplay bloqueado pelo navegador"));
  }

  setInterval(() => {
    storyIndex = (storyIndex + 1) % storyImages.length;
    atualizarStory();
  }, 4000);
}