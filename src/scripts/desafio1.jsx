document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalc");
  const resultado = document.getElementById("resultado");

  btn.addEventListener("click", calcular);
});

function calcular() {
  fetch("/vendas.json")
    .then(res => res.json())
    .then(data => processarComissoes(data.vendas))
    .catch(err => console.error("Erro ao carregar JSON:", err));
}

function processarComissoes(vendas) {
  const totais = {}; // objeto para somar comissão por vendedor

  vendas.forEach(item => {
    const nome = item.vendedor;
    const valor = item.valor;

    let comissao = 0;

    if (valor >= 500) {
      comissao = valor * 0.05;
    } else if (valor >= 100) {
      comissao = valor * 0.01;
    }

    // se ainda não existe no objeto, inicia com 0
    if (!totais[nome]) {
      totais[nome] = 0;
    }

    totais[nome] += comissao;
  });

  mostrarResultado(totais);
}

function mostrarResultado(totais) {
  const div = document.getElementById("resultado");

  let texto = "";

  for (const vendedor in totais) {
    texto += `${vendedor}: R$ ${totais[vendedor].toFixed(2)}\n`;
  }

  div.textContent = texto;
}
