const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');


window.onload = () => {
console.log(curso.textContent)

    data.pegaDados(curso.textContent)
        .then(dados => {
            tempo.textContent = dados.tempo
        });
}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});


let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;

botaoPlay
    .addEventListener('click', () => {

        if (play) {
            timer.parar(curso.textContent);
            play = false;

            new Notification('Alura Timer', {
                body: `O curso ${curso.textContent} foi parado`,
                icon: 'img/stop-button.png'
            });
        } else {
            timer.iniciar(tempo);
            play = true;

            new Notification('Alura Timer', {
                body: `O curso ${curso.textContent} foi iniciado!!!`,
                icon: 'img/play-button.png'
            });
        }


        imgs = imgs.reverse();
        botaoPlay.src = imgs[0];
    });


ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    data.pegaDados(nomeCurso)
        .then(dados => {
            tempo.textContent = dados.tempo;
            curso.textContent = nomeCurso
        });
});


botaoAdicionar.addEventListener('click', function() {
   let novoCurso = campoAdicionar.value;

   curso.textContent = novoCurso;
   tempo.textContent = '00:00:00';

   campoAdicionar.value = '';

   ipcRenderer.send('curso-adicionado', novoCurso);
});


ipcRenderer.on('atalho-iniciar-parar', () => {
   console.log('atalaho bem loko')

   let click  = new MouseEvent('click');
   botaoPlay.dispatchEvent(click);
});