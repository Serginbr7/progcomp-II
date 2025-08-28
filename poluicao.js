let regioes = [];
let dias = [];
for (let i = 0; i < 5; i++) {
  regioes.push(prompt(`Digite a: ${i + 1}° região`));
}
for (let i = 0; i < 5; i++) {
  dias.push(prompt(`Digite o: ${i + 1}° dia`));
}

let poluicao = [];
for (let i = 0; i < 5; i++) {
  poluicao[i] = [];
  for (let j = 0; j < 5; j++) {
    poluicao[i][j] = parseInt(Math.random() * 501);
  }
}

let somaDP = 0;
for (let i = 0; i < poluicao.length; i++) {
  console.log(`Elemento da diagonal principal: ${poluicao[i][i]}`);
  somaDP += poluicao[i][i];
}
console.log(
  `A média dos elementos da diagonal principal: ${somaDP / poluicao.length}`
);

let somaDS = 0;
for (let i = 0; i < poluicao.length; i++) {
  console.log(`Elemento da diagonal secundaria: ${poluicao[i][4 - i]}`);
  somaDS += poluicao[i][4 - i];
}
console.log(
  `A média dos elementos da diagonal secundaria: ${somaDS / poluicao.length}`
);

// Encontrar a região com o maior índice de poluição e o dia correspondente
let maiorIndice = -1;
let regiaoMaior = "";
let diaMaior = -1;
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (poluicao[i][j] > maiorIndice) {
      maiorIndice = poluicao[i][j];
      regiaoMaior = regioes[i];
      diaMaior = dias[j];
    }
  }
}
console.log(
  `Maior índice de poluição: ${maiorIndice}, registrado na região ${regiaoMaior} no dia ${diaMaior}`
);

let qtdNivelCritico = 0;
for (let i = 0; i < dias.length; i++) {
  for (let j = 0; j < regioes.length; j++) {
    if (poluicao[i][j] > 300) {
      qtdNivelCritico++;
    }
  }
}
console.log(`Passou o nível critico: ${qtdNivelCritico} vezes`);

//Exibir a região que teve, em média, o menor índice de poluição ao longo dos 5 dias.

let medias = [];
for (leti = 0; i < poluicao.length; i++) {
  let somaLinahas = 0;
  for (let j = 0; j < poluicao[i].length; j++) {
    somaLinahas += poluicao[i][j];
  }
  mediaLinhas = somaLinhas / poluicao.length;
}
let menor = medias[0];
let posMenor = 0;
for (let i = 1; i < medias.length; i++) {
  if (medias[i] < menor) {
    menor = medias[i];
    posMenor = i;
  }
}
console.log(`A região com média ${menor} foi ${regioes[posMenor]}`);
