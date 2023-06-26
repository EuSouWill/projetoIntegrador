// Acesso ao formulário e à lista de vendas
const salesForm = document.getElementById('sales-form');
const salesList = document.getElementById('sales-items');
const totalPriceElement = document.getElementById('total-price');

// Variáveis globais
let totalPrice = 0.0;
const salesItems = [];

// Função para registrar a venda
function registrarVenda(event) {
  event.preventDefault(); // Evita o envio do formulário

  // Obtém os valores dos campos do formulário
  const medicationName = document.getElementById('medication-name').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);

  // Calcula o preço total do item
  const totalItemPrice = quantity * price;

  // Atualiza o preço total da compra
  totalPrice += totalItemPrice;
  totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;

  // Cria o elemento da lista de vendas
  const listItem = document.createElement('li');
  listItem.textContent = `${medicationName} - Quantidade: ${quantity} - Preço Unitário: R$ ${price.toFixed(2)} - Total: R$ ${totalItemPrice.toFixed(2)}`;
  listItem.className = 'sale-item';

  // Adiciona o elemento à lista de vendas
  salesList.appendChild(listItem);

  // Limpa os campos do formulário
  document.getElementById('medication-name').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';

  // Armazena os detalhes da venda
  const salesItem = {
    medicationName: medicationName,
    quantity: quantity,
    price: price,
    totalItemPrice: totalItemPrice
  };
  salesItems.push(salesItem);
}

// Adiciona o evento de submit ao formulário
salesForm.addEventListener('submit', registrarVenda);

// função goBack para retornar a página anterior
function goBack() {
    window.history.back();
  }
  