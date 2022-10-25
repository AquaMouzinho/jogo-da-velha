import { Jogador } from "../Jogador.js";
import { Jogo } from "../jogo.js";
import { iniciarJogo } from "./iniciarJogo.js";

export function criarJogo() {
  let formaUm = document.querySelector('[data-forma-jog1]').value;
  let formaDois = document.querySelector('[data-forma-jog2]').value;
  if (formaUm == formaDois) {
    alert("As duas formas não podem ser iguais!");
    return;
  }

  let nomeJogadorUm = document.querySelector('[data-nome-jog1]').value;
  let nomeJogadorDois = document.querySelector('[data-nome-jog2]').value;

  if (nomeJogadorUm == '') nomeJogadorUm = 'Jogador 1';
  if (nomeJogadorDois == '') nomeJogadorDois = 'Jogador 2';

  let qtdPartidas = document.querySelector('[data-qtd-partidas]').value;
  if (qtdPartidas == '' || qtdPartidas <= 0) qtdPartidas = 3

  const jogo = new Jogo(qtdPartidas, [new Jogador(nomeJogadorUm, formaUm, document.querySelector('[data-cor-jog1]').value), new Jogador(nomeJogadorDois, formaDois, document.querySelector('[data-cor-jog2]').value)]);

  const secaoConfig = document.querySelector('.sec__jogadores');
  const secaoJogo = document.querySelector('.sec__jogar');

  secaoConfig.style = '';

  secaoJogo.style.display = 'grid';
  secaoJogo.style.visibility = 'visible';
  iniciarJogo(jogo);
}