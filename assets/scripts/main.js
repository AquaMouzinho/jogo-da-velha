import { criarJogo } from './components/criarJogo.js';

const botaoIniciar = document.getElementById('btnIniciarJogo');
botaoIniciar.addEventListener('click', () => {
  //mudar visibilidades
  const secaoInicial = document.querySelector('.sec__inicial');
  const secaoConfig = document.querySelector('.sec__jogadores');

  secaoInicial.style.display = 'none';
  secaoInicial.style.visibility = 'hidden';

  secaoConfig.style.display = 'grid';
  secaoConfig.style.visibility = 'visible';
});

const botaoJogadores = document.getElementById('btnConfirmarJogo');
botaoJogadores.addEventListener('click', criarJogo);
