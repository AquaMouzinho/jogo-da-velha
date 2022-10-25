export class Jogo {
  qtd_partidas;
  jogadores;
  tabuleiro = new Array(9);

  get qtd_partidas() {
    return this.qtd_partidas;
  }

  menosPartida() {
    this.qtd_partidas -= 1;
  }

  get jogadores() {
    return this.jogadores;
  }

  constructor(qtd_partidas, jogadores) {
    this.qtd_partidas = qtd_partidas;
    this.jogadores = jogadores;
  }
}