import { criarJogo } from './components/criarJogo.js';
import { limparTabuleiro } from './components/limparTabuleiro.js';

const botaoJogadores = document.getElementById('btnConfirmarJogo');
botaoJogadores.addEventListener('click', criarJogo);
