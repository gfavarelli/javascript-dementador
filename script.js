const telas = document.querySelectorAll('.tela');
const btnEscolhaDementador = document.querySelectorAll('.escolher-lista-dementador');
const btnIniciarJogo = document.getElementById('iniciar');
const gameConteudo = document.getElementById('game-conteudo');
const tempoElemento = document.getElementById('tempo');
const pontosElemento = document.getElementById('pontos');
const mensagemElemento = document.getElementById('mensagem');
const audioHP = document.getElementById('audio');
let segundos = 0;
let pontos = 0;
let dementadorSelecionado = {};


btnIniciarJogo.addEventListener('click', () => telas[0].classList.add('up'))


btnEscolhaDementador.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        dementadorSelecionado = { src, alt };
        telas[1].classList.add('up');
        setTimeout(criarDementador, 1000);
        iniciarCacadaDementador();
    });
});

function iniciarCacadaDementador() {
    setInterval(aumentarTempo, 1000);
}

function aumentarTempo() {
    let m = Math.floor(segundos / 60);
    let s = segundos % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    tempoElemento.innerHTML = `Tempo: ${m}:${s}`;
    segundos++;
}

function criarDementador() {
    const dementador = document.createElement('div');
    dementador.classList.add('dementador');
    const { x, y } = getLocalizacaoTelaAleatoria();
    dementador.style.top = `${y}px`;
    dementador.style.left = `${x}px`;
    dementador.innerHTML = `<img src='${dementadorSelecionado.src}'
                                alt='${dementadorSelecionado.alt}' 
                                style="transform: rotate(${Math.random() * 360}deg)"
                                />`;
    dementador.addEventListener('click', avadaKedavra);
    gameConteudo.appendChild(dementador);

}

function getLocalizacaoTelaAleatoria() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
}

function avadaKedavra() {
    aumentarPontuacao();
    this.classList.add('dementador1');
    setTimeout(() => this.remove(), 2000);
    adicionarDementador();
}

function adicionarDementador() {
    setTimeout(criarDementador, 1000);
    setTimeout(criarDementador, 1500);
}

function aumentarPontuacao() {
    pontos++;

    if(pontos > 19) {
        mensagemElemento.classList.add('visible');
    }
    pontosElemento.innerHTML = `Pontos: ${pontos}`;
}