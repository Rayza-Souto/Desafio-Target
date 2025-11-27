document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalc");
  btn.addEventListener("click", calcular);
});

function calcular() {
  fetch("/vendas.json")
    .then(res => res.json())
    .then(data => processarVendas(data.vendas))
    .catch(err => console.error("Erro ao carregar JSON:", err));
}

function processarVendas(vendas) {
  const tbody = document.querySelector("#tabelaVendas tbody");
  const tfoot = document.querySelector("#totais");

  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  const totais = {}; // soma de comissão por vendedor

  vendas.forEach(item => {
    const nome = item.vendedor;
    const valor = item.valor;

    let comissao = 0;

    if (valor >= 500) {
      comissao = valor * 0.05;
    } else if (valor >= 100) {
      comissao = valor * 0.01;
    }

    // ---- tabela de vendas ----
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nome}</td>
      <td>R$ ${valor.toFixed(2)}</td>
      <td>R$ ${comissao.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);

    // ---- soma ----
    if (!totais[nome]) totais[nome] = 0;
    totais[nome] += comissao;
  });

  // ---- tabela de totais ----
  for (const vendedor in totais) {
    const trTotal = document.createElement("tr");
    trTotal.innerHTML = `
      <td colspan="2"><strong>Total de ${vendedor}</strong></td>
      <td><strong>R$ ${totais[vendedor].toFixed(2)}</strong></td>
    `;
    tfoot.appendChild(trTotal);
  }
}

