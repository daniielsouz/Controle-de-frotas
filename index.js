//Array criado para armazenar os dados da viagem
let viagens = [];
let viagensConcluidas = [];
//Array criado para armazenar os dados das placas
let placasCadastradas = [];
//Buscando botões
const botaoAdicionarViagem = document.getElementById('adicionar_viagem');
const botaoCadastrarPlaca = document.getElementById('cadastrarPlaca');
const botaoRemoverPlaca = document.getElementById('removerPlaca');

//Buscando os valores do input
const valorData = document.getElementById('input_data');
const placa = document.getElementById('input_placas');
const motorista = document.getElementById('input_motorista');
const saida = document.getElementById('input_saida');
const chegada = document.getElementById('input_chegada');
//Buscando divs
const divInputs = document.querySelector('.div_inputs');
const divBotaoPlaca = document.querySelector('.bts_placa');
const opçoesPlacas = document.querySelector('.inputs_remover_placa');

function atualizarDados() {
  //Buscando as div das tabelas
  const tabelaViagem = document.getElementById('tabela_viagem');
  const tabelaHistorico = document.getElementById('tabela_historico');


  placa.innerHTML = `            
  <option selected disabled value="Placa veículo">
  Placa veículo
  </option>`;

  placasCadastradas.forEach(i => {
    //Verificando se o veiculo está viajando,caso sim, será desabilitado a selação da placa até o retorno 
    if (i.viajando) {
      placa.innerHTML += `<option value="${i.placa}" selected disabled>${i.placa}</option>
      `;
    } else {

      placa.innerHTML += `<option value="${i.placa}">${i.placa}</option>
      `;
    };
  });

  tabelaViagem.innerHTML = `          
<tr class="tabela_linha">
<th class="tabela_coluna tabela_titulo">Data</th>
<th class="tabela_coluna tabela_titulo">Placa</th>
<th class="tabela_coluna tabela_titulo">Motorista</th>
<th class="tabela_coluna tabela_titulo">Destido saida</th>
<th class="tabela_coluna tabela_titulo">Destino chegada</th>
</tr>`;

  viagens.forEach((i, index) => {
    tabelaViagem.innerHTML += `
<tr class="tabela_linha" index="${index}">
<td class="tabela_coluna">${i.data}</td>
<td class="tabela_coluna">${i.placa}</td>
<td class="tabela_coluna">${i.motorista}</td>
<td class="tabela_coluna">${i.destinoSaida}</td>
<td class="tabela_coluna">${i.destinoChegada}</td>
<td class="tabela_coluna_botao">
  <button class="botao botao_retorno">Informar retorno</button>
</td>
</tr>
`;
  });

  const botaoRetorno = document.querySelectorAll('.botao_retorno');

  tabelaHistorico.innerHTML = ``;
  viagensConcluidas.forEach(i => {
    tabelaHistorico.innerHTML += `
    <td class="tabela_coluna img">
    <img src="/img/concluido.svg" alt="carro" id="img" />
  </td>
  <td class="tabela_coluna">${i.data}</td>
  <td class="tabela_coluna">${i.placa}</td>
  <td class="tabela_coluna">${i.motorista}</td>
  <td class="tabela_coluna">${i.destinoSaida}</td>
  <td class="tabela_coluna">${i.destinoChegada}</td>
</tr>
  `;
  });

  botaoRetorno.forEach((i, index) => {
    i.addEventListener('click', () => {
      viagensConcluidas.push(viagens[index]);
      const placaRetornada = viagens[index].placa;
      placasCadastradas.forEach(i => {
        if (i.placa == placaRetornada) {
          i.viajando = false;
        }
      })
      viagens.splice(index, 1)
      atualizarDados();
    })
  })

  //Limpando todos os campos dos inputs 
  valorData.value = '';
  placa.value = 'Placa veículo';
  motorista.value = '';
  saida.value = '';
  chegada.value = '';
}

function adicionarViagem() {
  //Buscando o paragrafo que contém a mensagens de erro 
  const erroInputs = document.getElementById('erro_inputs');
  //Criando uma condicional para verificar se todos os campos foram preenchidos
  const data = valorData.value.split('-').reverse().join('/');
  if (valorData.value && placa.value != "Placa veículo" && motorista.value && chegada.value && saida.value) {
    //Salvando os valores em um objeto e adicionando no array
    viagens.push({
      data: data,
      placa: placa.value,
      motorista: motorista.value,
      destinoSaida: saida.value,
      destinoChegada: chegada.value,
    });

    placasCadastradas.forEach(i => {
      if (i.placa === placa.value) {
        i.viajando = true;
      }
    })

    //Limpando o campo de aviso 
    erroInputs.textContent = '';
  } else {
    //Informando que não foram preenchidos todos os inputs
    erroInputs.textContent = '*Todos os campos são obrigatórios';
  };
};


function adicionandoPlaca() {

  divBotaoPlaca.classList.add('oculto');
  botaoAdicionarViagem.classList.add('oculto');
  divInputs.classList.add('oculto');

  //Buscando a div do cadastro
  const divCadastro = document.querySelector('.input_cadastro_placa');
  //Buscando os botoes
  const salvarCadastroPlaca = document.getElementById('salvar_cadastro_placa');
  const cancelarCadastroPlaca = document.getElementById('cancelar_cadastro_placa');
  //Buscando o paragrafo que contém a mensagens de erro 
  const erroPlaca = document.getElementById('erro_placa');
  //Buscando o valor do input
  const numeroPlacaCadastro = document.getElementById('entrada_cadastro_placa');
  //Removendo o classe oculto
  divCadastro.classList.remove('oculto');
  //Limpando os campos  
  erroPlaca.textContent = '';
  numeroPlacaCadastro.value = '';

  //Adicionando um evento de click no botão
  salvarCadastroPlaca.addEventListener('click', () => {
    const placaSalva = numeroPlacaCadastro.value.toUpperCase()
    //Criando uma condicional para verificar se o campo foi preenchido, se tem 7 caracteres e conferindo se a placa já não existe 
    if (placaSalva) {
      if (placaSalva.length === 7) {
        if (placasCadastradas == '') {

          placasCadastradas.push({
            placa: numeroPlacaCadastro.value.toUpperCase(),
            viajando: false

          });
          atualizarDados();
          botaoAdicionarViagem.classList.remove('oculto');
          divBotaoPlaca.classList.remove('oculto')
          divInputs.classList.remove('oculto');
          divCadastro.classList.add('oculto');
          botaoRemoverPlaca.classList.remove('oculto');
        } else {

          placasCadastradas.forEach(i => {
            if (i.placa === placaSalva) {
              erroPlaca.textContent = '*Placa já está cadastrada';
            } else {
              placasCadastradas.push({
                placa: numeroPlacaCadastro.value.toUpperCase(),
                viajando: false

              });
              atualizarDados();
              numeroPlacaCadastro.value = '';
              botaoAdicionarViagem.classList.remove('oculto');
              divBotaoPlaca.classList.remove('oculto')
              divInputs.classList.remove('oculto');
              divCadastro.classList.add('oculto');
              botaoRemoverPlaca.classList.remove('oculto');
            }
          })
        }
      } else {
        erroPlaca.textContent = '*Favor revisar o numero dá placa';
      }
    } else {
      erroPlaca.textContent = '*Favor preencher o número da placa';
    }
  })
  cancelarCadastroPlaca.addEventListener('click', () => {
    numeroPlacaCadastro.value = '';
    botaoAdicionarViagem.classList.remove('oculto');
    divBotaoPlaca.classList.remove('oculto')
    divInputs.classList.remove('oculto');
    divCadastro.classList.add('oculto');
  })
}

function listaRemoverPlaca() {
  const mensagemErro = placasCadastradas == '' ? '<div class="inputs_remover_placa aviso">*Você não tem placas cadastradas</div>' : '<div class="inputs_remover_placa"></div>'
  opçoesPlacas.classList.remove('oculto')
  opçoesPlacas.innerHTML = mensagemErro
  placasCadastradas.forEach(i => {
    opçoesPlacas.innerHTML += `          
      <p class="info_placa_remover">
      <span class="numero_placa_remover">${i.placa}</span>
      <button class="btRemover_placa">Remover Placa</button>
      </button>
    </p>`;
  });
}

function removerPlaca() {

  const cancelarRemocao = document.getElementById('cancelar_remocao');
  const inputDados = document.querySelector('.inputs_dados');

  botaoAdicionarViagem.classList.add('oculto');
  divBotaoPlaca.classList.add('oculto');
  inputDados.classList.add('oculto');
  cancelarRemocao.classList.remove('oculto');
  listaRemoverPlaca()

  const confirmarRemocao = document.querySelectorAll('.btRemover_placa');

  confirmarRemocao.forEach((i, index) => {
    i.addEventListener('click', () => {
      placasCadastradas.splice(index, 1)
      removerPlaca()
      atualizarDados()

    })
  })
  cancelarRemocao.addEventListener('click', () => {
    botaoAdicionarViagem.classList.remove('oculto');
    divBotaoPlaca.classList.remove('oculto');
    inputDados.classList.remove('oculto');
    cancelarRemocao.classList.add('oculto');
    opçoesPlacas.classList.add('oculto');
  })
}

botaoCadastrarPlaca.addEventListener('click', () => {
  adicionandoPlaca();
})

botaoRemoverPlaca.addEventListener('click', () => {
  removerPlaca();
})

botaoAdicionarViagem.addEventListener('click', () => {
  adicionarViagem()
  atualizarDados()
})