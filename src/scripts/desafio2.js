let estoqueInicial = [];   
let dadosEstoque = [];     
let contadorID = 1;

document.addEventListener("DOMContentLoaded", () => {
  carregarEstoque();

  document.getElementById("btnMov").addEventListener("click", registrarMovimentacao);
  document.getElementById("btnLimpar").addEventListener("click", limparDados);
  document.getElementById("btnEstoqueAtual").addEventListener("click", mostrarEstoqueAtual);
});

// CARREGA O ESTOQUE INICIAL

function carregarEstoque() {
  fetch("/estoque.json")
    .then(res => res.json())
    .then(data => {

      // salva o estoque original
      dadosEstoque = data.estoque;

      // cria cópia para ser manipulada
      estoqueInicial = data.estoque.map(p => ({ ...p }));

      carregarTabelaInicial(data.estoque);
    })
    .catch(err => console.error("Erro ao carregar estoque.json:", err));
}

// REGISTRA MOVIMENTAÇÃO

function registrarMovimentacao() {
  const codigo = Number(document.getElementById("codigo").value);
  const tipo = document.getElementById("tipo").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const descricao = document.getElementById("descricao").value;

  const resultado = document.getElementById("resultado");

  if (!codigo || !quantidade || !descricao) {
    resultado.textContent = "Preencha todos os campos!";
    return;
  }

  const produto = estoqueInicial.find(p => p.codigoProduto === codigo);

  if (!produto) {
    resultado.textContent = "Produto não encontrado!";
    return;
  }

  // cálculo do estoque
  let estoqueFinal = produto.estoque;

  if (tipo === "entrada") {
    estoqueFinal += quantidade;
  } else if (tipo === "saida") {
    if (quantidade > produto.estoque) {
      resultado.textContent = "Estoque insuficiente para saída!";
      return;
    }
    estoqueFinal -= quantidade;
  }

  // aplica a atualização definitiva
  produto.estoque = estoqueFinal;

  const id = contadorID++;

  resultado.textContent =
    `Movimentação registrada!\n` +
    `ID: ${id}\n` +
    `Produto: ${produto.descricaoProduto}\n` +
    `Estoque final: ${estoqueFinal}`;

  adicionarNaTabela({
    id,
    produto: produto.descricaoProduto,
    tipo,
    quantidade,
    estoqueFinal,
    descricao
  });

  document.getElementById("quantidade").value = "";
  document.getElementById("descricao").value = "";
}

// ADICIONA MOVIMENTAÇÃO NA TABELA

function adicionarNaTabela(mov) {
  const tbody = document.querySelector("#tabelaMov tbody");

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${mov.id}</td>
    <td>${mov.produto}</td>
    <td>${mov.tipo}</td>
    <td>${mov.quantidade}</td>
    <td>${mov.estoqueFinal}</td>
    <td>${mov.descricao}</td>
  `;

  tbody.appendChild(tr);
}

// BOTÃO: LIMPAR TUDO

function limparDados() {
  document.querySelector("#tabelaMov tbody").innerHTML = "";
  document.getElementById("resultado").textContent = "";
  document.getElementById("estoqueAtual").textContent = "";
}



// BOTÃO: MOSTRAR ESTOQUE ATUAL

function mostrarEstoqueAtual() {
  const div = document.getElementById("estoqueAtual");

  let texto = "";

  estoqueInicial.forEach(p => {
    texto += `${p.codigoProduto} - ${p.descricaoProduto}: ${p.estoque} unidades\n`;
  });

  div.textContent = texto;
}
