
//coleta de dados dinâmica com o html:

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-poluicao");
  const regiaoNome = document.getElementById("regiao-nome");
  const diasInputs = [
    document.getElementById("dia1"),
    document.getElementById("dia2"),
    document.getElementById("dia3"),
    document.getElementById("dia4"),
    document.getElementById("dia5"),
  ];
  const anteriorBtn = document.getElementById("anterior");
  const proximaBtn = document.getElementById("proxima");
  const finalizarBtn = document.getElementById("finalizar");
  const regiaoIndiceSpan = document.getElementById("regiao-indice");
  const output = document.getElementById("output");

  const totalRegioes = 5;
  let regiaoAtual = 0;
  let regioes = Array(totalRegioes).fill("");
  let poluicao = Array(totalRegioes)
    .fill(0)
    .map(() => Array(5).fill(0));

  function atualizarFormulario() {
    regiaoNome.value = regioes[regiaoAtual] || "";
    for (let i = 0; i < 5; i++) {
      diasInputs[i].value =
        poluicao[regiaoAtual][i] !== 0 ? poluicao[regiaoAtual][i] : "";
    }
    regiaoIndiceSpan.textContent = `Região ${regiaoAtual + 1} de ${totalRegioes}`;
    anteriorBtn.disabled = regiaoAtual === 0;
    proximaBtn.style.display = regiaoAtual < totalRegioes - 1 ? "inline-block" : "none";
    finalizarBtn.style.display = regiaoAtual === totalRegioes - 1 ? "inline-block" : "none";
  }

  function salvarDadosAtual() {
    regioes[regiaoAtual] = regiaoNome.value;
    for (let i = 0; i < 5; i++) {
      poluicao[regiaoAtual][i] = Number(diasInputs[i].value) || 0;
    }
  }

  anteriorBtn.addEventListener("click", function () {
    salvarDadosAtual();
    if (regiaoAtual > 0) {
      regiaoAtual--;
      atualizarFormulario();
    }
  });

  proximaBtn.addEventListener("click", function () {
    salvarDadosAtual();
    if (regiaoAtual < totalRegioes - 1) {
      regiaoAtual++;
      atualizarFormulario();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    salvarDadosAtual();

    // Calcular resultados
    // Diagonal principal e secundária
    let diagonalPrincipal = [];
    let somaDP = 0;
    let diagonalSecundaria = [];
    let somaDS = 0;
    for (let i = 0; i < totalRegioes; i++) {
      diagonalPrincipal.push(poluicao[i][i]);
      somaDP += poluicao[i][i];
      diagonalSecundaria.push(poluicao[i][totalRegioes - 1 - i]);
      somaDS += poluicao[i][totalRegioes - 1 - i];
    }
    let mediaDP = somaDP / totalRegioes;
    let mediaDS = somaDS / totalRegioes;

    // Maior índice
    let maiorIndice = -1;
    let regiaoMaior = "";
    let diaMaior = "";
    for (let i = 0; i < totalRegioes; i++) {
      for (let j = 0; j < 5; j++) {
        if (poluicao[i][j] > maiorIndice) {
          maiorIndice = poluicao[i][j];
          regiaoMaior = regioes[i];
          diaMaior = `Dia ${j + 1}`;
        }
      }
    }

    // Nível crítico
    let qtdNivelCritico = 0;
    for (let i = 0; i < totalRegioes; i++) {
      for (let j = 0; j < 5; j++) {
        if (poluicao[i][j] > 300) {
          qtdNivelCritico++;
        }
      }
    }

    // Média por região
    let medias = [];
    for (let i = 0; i < totalRegioes; i++) {
      let somaLinhas = 0;
      for (let j = 0; j < 5; j++) {
        somaLinhas += poluicao[i][j];
      }
      medias[i] = somaLinhas / 5;
    }
    let menor = medias[0];
    let posMenor = 0;
    for (let i = 1; i < medias.length; i++) {
      if (medias[i] < menor) {
        menor = medias[i];
        posMenor = i;
      }
    }

    // Exibir resultados
    output.innerHTML = `
      <strong>Diagonal Principal:</strong> ${diagonalPrincipal.join(", ")}<br>
      <strong>Média Diagonal Principal:</strong> ${mediaDP.toFixed(2)}<br>
      <strong>Diagonal Secundária:</strong> ${diagonalSecundaria.join(", ")}<br>
      <strong>Média Diagonal Secundária:</strong> ${mediaDS.toFixed(2)}<br>
      <strong>Maior índice de poluição:</strong> ${maiorIndice}, registrado na região ${regiaoMaior} no ${diaMaior}<br>
      <strong>Passou o nível crítico:</strong> ${qtdNivelCritico} vezes<br>
      <strong>Região com menor média:</strong> ${regioes[posMenor]} (${menor.toFixed(2)})<br>
    `;
  });
  atualizarFormulario();
});



