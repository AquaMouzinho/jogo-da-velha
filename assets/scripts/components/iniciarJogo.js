import { Jogo } from "../jogo.js";

export function iniciarJogo(dadosJogo) {
  let vezJogador = 0;

  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canva => {
    canva.addEventListener('mouseup', () => {
      if (canva.classList.contains('disabled')) return;

      const context = canva.getContext("2d");
      let index = Array.prototype.indexOf.call(canva.parentNode.children, canva);

      context.lineWidth = 10;
      context.fillStyle = dadosJogo.jogadores[vezJogador].cor;

      let shape = new Path2D();
      switch (dadosJogo.jogadores[vezJogador].forma) {
        case '0':
          shape.rect(canva.width * 0.1, canva.height * 0.1, canva.width * 0.75, canva.height * 0.75); // quadrado
          break;
        case '1':
          shape.arc(canva.width * 0.5, canva.height * 0.5, canva.height * 0.4, 0, 2 * Math.PI); // circulo
          break;
        case '2':
          shape.rect(canva.width * 0.1, canva.height * 0.1, canva.width * 0.75, canva.height * 0.75); // quadrado
          break;
      }
      context.fill(shape);

      if (vezJogador > 0) { // JOGADOR 2
        dadosJogo.tabuleiro[index] = 'O';
        vezJogador = 0;
      } else { // JOGADOR 1
        dadosJogo.tabuleiro[index] = 'X';
        vezJogador = 1;
      }
      canva.classList.add('disabled');

      verificaTabuleiro(dadosJogo, dadosJogo.tabuleiro);
    });
  });


  const botaoReset = document.getElementById('btnReset');
  botaoReset.addEventListener('click', () => {
    const canvas = document.querySelectorAll('canvas');
    const linhaResultado = document.getElementById('resultadoJogo');

    canvas.forEach(canva => {
      if (canva.classList.contains('disabled')) {
        console.log('sim')
        canva.classList.remove('disabled');
      }

      const ctx = canva.getContext('2d');
      ctx.clearRect(0, 0, canva.width, canva.height);
    });

    dadosJogo.tabuleiro = new Array(9);
    vezJogador = 0;
    linhaResultado.innerHTML = '';
  });
}

function fimDeJogo(algmGanhou, nome = 'E', dadosJogo) {
  const linhaResultado = document.getElementById('resultadoJogo');
  const botaoReset = document.getElementById('btnReset');

  if (algmGanhou) {
    if (nome === 'X') {
      console.log(dadosJogo.jogadores, dadosJogo.jogadores[0])
      dadosJogo.jogadores[0].aumentarPontuacao();
      linhaResultado.innerText = `${dadosJogo.jogadores[0].nome} ganhou essa partida!`;
    } else {
      console.log(dadosJogo.jogadores, dadosJogo.jogadores[1])
      dadosJogo.jogadores[1].aumentarPontuacao();
      linhaResultado.innerText = `${dadosJogo.jogadores[1].nome} ganhou essa partida!`;
    }
  } else {
    linhaResultado.innerHTML = 'Partida empatada!'
  }

  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canva => {
    if (!canva.classList.contains('disabled')) {
      canva.classList.add('disabled');
    }
  });

  dadosJogo.menosPartida();

  if (dadosJogo.qtd_partidas <= 0) {
    if (dadosJogo.jogadores[0]._pontuacao > dadosJogo.jogadores[1]._pontuacao) {
      linhaResultado.innerText = `FIM DE JOGO! ${dadosJogo.jogadores[0].nome} ganhou o jogo!`;
    } else if (dadosJogo.jogadores[0]._pontuacao < dadosJogo.jogadores[1]._pontuacao) {
      linhaResultado.innerText = `FIM DE JOGO! ${dadosJogo.jogadores[1].nome} ganhou o jogo!`;
    } else {
      linhaResultado.innerText = `FIM DE JOGO! EMPATE!`;
    }

    console.log(dadosJogo);
    botaoReset.disabled = true;
  }
}

function verificaTabuleiro(dadosJogo, arrGrid) {
  // VERIFICA TABULEIRO CHEIO
  if (!(arrGrid.includes(undefined))) {
    fimDeJogo(false, 'E', dadosJogo);
  }
  // VERIFICA SE GANHOU NAS COLUNAS
  for (let i = 0; i < 3; i++) {
    if (arrGrid[i] != undefined) {
      if (arrGrid[i] == arrGrid[i + 3] && arrGrid[i] == arrGrid[i + 6]) {
        fimDeJogo(true, arrGrid[i], dadosJogo)
        return
      }
    }
  }

  // VERIFICA SE GANHOU NAS LINHAS
  for (let i = 0; i < 7; i += 3) {
    if (arrGrid[i] != undefined) {
      //console.log(arrGrid[i] == arrGrid[i + 1] && arrGrid[i] == arrGrid[i + 2])
      if (arrGrid[i] == arrGrid[i + 1] && arrGrid[i] == arrGrid[i + 2]) {
        fimDeJogo(true, arrGrid[i], dadosJogo);
        return;
      }
    }
  }

  //VERIFICA SE GANHOU NAS DIAGONAIS
  if (arrGrid[0] != undefined && arrGrid[0] == arrGrid[4] && arrGrid[0] == arrGrid[8]) {
    fimDeJogo(true, arrGrid[0]);
    return;
  } else if (arrGrid[2] != undefined && arrGrid[2] == arrGrid[4] && arrGrid[2] == arrGrid[6]) {
    fimDeJogo(true, arrGrid[2]);
    return;
  }
}

