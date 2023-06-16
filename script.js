// Acesso ao formulário e à lista de vendas
const salesForm = document.getElementById('sales-form');
const salesList = document.getElementById('sales-items');

// Evento de envio do formulário
salesForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obter os valores dos campos do formulário
  const medicationName = document.getElementById('medication-name').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  // Criar um novo item de venda
  const saleItem = document.createElement('li');
  saleItem.className = 'sale-item';
  saleItem.innerHTML = `<strong>Medicamento:</strong> ${medicationName} | <strong>Quantidade:</strong> ${quantity} | <strong>Preço:</strong> R$ ${price}`;

  // Adicionar o item de venda à lista
  salesList.appendChild(saleItem);

  // Limpar os campos do formulário
  salesForm.reset();
});
