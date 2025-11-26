document.getElementById("calcular").addEventListener("click", () => {
  const valor = Number(document.getElementById("valor").value);
  const vencimento = new Date(document.getElementById("vencimento").value);
  const hoje = new Date();

  const dias = Math.ceil((hoje - vencimento) / (1000 * 60 * 60 * 24));

  console.log("Dias de atraso:", dias);
});
