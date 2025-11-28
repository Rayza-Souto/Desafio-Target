document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCalc").addEventListener("click", calcularJuros);
});

function calcularJuros() {
  const valor = Number(document.getElementById("valor").value);
  const dataVenc = document.getElementById("vencimento").value;
  const resultado = document.getElementById("resultado");

  if (!valor || !dataVenc) {
    resultado.textContent = "Preencha todos os campos!";
    return;
  }

  const hoje = new Date();
  const vencimento = new Date(dataVenc);

  const diffMs = hoje - vencimento;
  const diasAtraso = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diasAtraso <= 0) {
    resultado.textContent = "Nenhum atraso. Sem juros.";
    return;
  }

  const multaPorDia = 0.025; // 2,5% ao dia
  const juros = valor * multaPorDia * diasAtraso;
  const total = valor + juros;

  resultado.textContent =
    `Dias de atraso: ${diasAtraso}\n` +
    `Juros: R$ ${juros.toFixed(2)}\n` +
    `Total a pagar: R$ ${total.toFixed(2)}`;
}
