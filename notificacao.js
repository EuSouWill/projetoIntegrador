var proximaSenha = 1;
var filaPrioritaria = [];
var filaNormal = [];
var relatorio = [];

document.getElementById('gerarSenha').addEventListener('click', function() {
  var senhaGerada = gerarSenha();
  var clienteSenha = {
    senha: senhaGerada,
    nome: '',
    horaGeracao: new Date().toLocaleTimeString(),
    horaAtendimento: ''
  };
  relatorio.push(clienteSenha);
  document.getElementById('senhaGerada').innerHTML = 'A senha gerada é: ' + senhaGerada;
  exibirRelatorio();
  exibirProximaSenha();
});

document.getElementById('adicionarPrioritario').addEventListener('click', function() {
  var clientePrioritario = document.getElementById('clientePrioritario').value;
  filaPrioritaria.push(clientePrioritario);
  document.getElementById('clientePrioritario').value = '';
  exibirProximoPrioritario();
});

document.getElementById('adicionarNormal').addEventListener('click', function() {
  var clienteNormal = document.getElementById('clienteNormal').value;
  filaNormal.push(clienteNormal);
  document.getElementById('clienteNormal').value = '';
  exibirProximoNormal();
});

document.getElementById('atenderPrioritario').addEventListener('click', function() {
  if (filaPrioritaria.length > 0) {
    var clienteAtendido = filaPrioritaria.shift();
    exibirProximoPrioritario();
    atualizarHoraAtendimento(clienteAtendido);
    exibirProximaSenha();
    alertaDeSom();
    setTimeout(function() {
      alertaDeVoz("Atendendo cliente prioritário: " + clienteAtendido);
    }, 1000);
    
  } else {
    alert('Não há clientes prioritários na fila.');
  }
});

document.getElementById('atenderNormal').addEventListener('click', function() {
  if (filaNormal.length > 0) {
    var clienteAtendido = filaNormal.shift();
    exibirProximoNormal();
    atualizarHoraAtendimento(clienteAtendido);
    exibirProximaSenha();
    alertaDeSom();
    setTimeout(function() {
      alertaDeVoz("Atendendo cliente normal: " + clienteAtendido);
    }, 1000);
    
   
  } else {
    alert('Não há clientes normais na fila.');
  }
});

function exibirProximoPrioritario() {
  if (filaPrioritaria.length > 0) {
    document.getElementById('proxPrioritario').innerHTML = 'Próximo cliente prioritário: ' + filaPrioritaria[0];
  } else {
    document.getElementById('proxPrioritario').innerHTML = 'Não há clientes prioritários na fila.';
  }
}

function exibirProximoNormal() {
  if (filaNormal.length > 0) {
    document.getElementById('proxNormal').innerHTML = 'Próximo cliente normal: ' + filaNormal[0];
  } else {
    document.getElementById('proxNormal').innerHTML = 'Não há clientes normais na fila.';
  }
}

function exibirRelatorio() {
  var relatorioCorpo = document.getElementById('relatorioCorpo');
  relatorioCorpo.innerHTML = '';

  for (var i = 0; i < relatorio.length; i++) {
    var row = document.createElement('tr');
    var senhaCell = document.createElement('td');
    senhaCell.textContent = relatorio[i].senha;
    var nomeCell = document.createElement('td');
    nomeCell.textContent = relatorio[i].nome || 'Não atendido';
    var horaGeracaoCell = document.createElement('td');
    horaGeracaoCell.textContent = relatorio[i].horaGeracao;
    var horaAtendimentoCell = document.createElement('td');
    horaAtendimentoCell.textContent = relatorio[i].horaAtendimento || 'Não atendido';
    row.appendChild(senhaCell);
    row.appendChild(nomeCell);
    row.appendChild(horaGeracaoCell);
    row.appendChild(horaAtendimentoCell);
    relatorioCorpo.appendChild(row);
  }
}

function gerarSenha() {
  var senha = proximaSenha.toString().padStart(3, '0');
  proximaSenha++;
  return senha;
}

function atualizarHoraAtendimento(nomeCliente) {
  for (var i = 0; i < relatorio.length; i++) {
    if (relatorio[i].nome === '' && relatorio[i].horaAtendimento === '') {
      relatorio[i].nome = nomeCliente;
      relatorio[i].horaAtendimento = new Date().toLocaleTimeString();
      exibirRelatorio();
      break;
    }
  }
}

function exibirProximaSenha() {
  var proximaSenhaExibicao = proximaSenha.toString().padStart(3, '0');
  document.getElementById('miniTela').textContent = 'Próxima senha: ' + proximaSenhaExibicao;
}
function goBack() {
    window.history.back();
  }

  function alertaDeSom() {
    var audio = new Audio('/sons/simple-notification-trial-152054.mp3');
    audio.play();
  }
  
  function alertaDeVoz(mensagem) {
    var message = new SpeechSynthesisUtterance(mensagem);
    window.speechSynthesis.speak(message);
  }