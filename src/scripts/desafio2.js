fetch('/estoque.json')
  .then(res => res.json())
  .then(data => {
    console.log("Estoque carregado:", data);
  });
