export class Jogador {
  nome;
  forma;
  cor;
  _pontuacao = 0;

  get nome() {
    return this.nome;
  }
  set nome(nome) {
    this.nome = nome;
  }
  get pontuacao() {
    return this.pontuacao;
  }

  aumentarPontuacao() {
    this._pontuacao += 1;
  }
  resetarPontuacao() {
    this._pontuacao = 0;
  }

  constructor(nome, forma, cor) {
    this.nome = nome;
    this.forma = forma;
    this.cor = cor;
  }
}