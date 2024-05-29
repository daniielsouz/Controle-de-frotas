const placas = [];
const viagens = [];
const divInputsDadosViagem = document.querySelector('.adicionar_viagem_inputs');
const btCadastrarPlaca = document.querySelector('.bt_cadastrar_placa');
const btRemoverPlaca = document.querySelector('.bt_remover_placa');
const btAdicionarViagem = document.querySelector('.bt_adicionar_viagem');


function cadastrarPlacaSistema() {
  function ocultar(ocultar, mostrar) {
    ocultar.classList.add('oculto');
    mostrar.classList.remove('oculto');
  }
  const divCadastrarPlaca = document.querySelector('.dados_placa_div');
  const numeroPlacaAdicionar = document.querySelector('.dados_placa_numero');
  const placasOpçoes = document.querySelector('.placa');
  const btSalvarPlaca = document.querySelector('.bt_salvar_placa');
  const btCancelarCadastroPlaca = document.querySelector('.bt_cancelar_cadastro');
  const enunciadoTitulo = document.querySelector('.adicionar_viagem_titulo');

  ocultar(divInputsDadosViagem, divCadastrarPlaca);
  btCadastrarPlaca.classList.add('oculto');
  btRemoverPlaca.classList.add('oculto');
  numeroPlacaAdicionar.focus();

  enunciadoTitulo.textContent = 'Cadastrar Placa'

  btSalvarPlaca.addEventListener('click', () => {
    if (numeroPlacaAdicionar) {
      if (numeroPlacaAdicionar.value.length === 7) {

        placas.push(numeroPlacaAdicionar.value.toUpperCase());
        placasOpçoes.innerHTML = `            <select class="placa" name="" id="">
        <option class="placa_opcoes_titulo" disabled selected>
        Placa do Veículo
        </option>`;
        placas.forEach((elemento, index) => {
          placasOpçoes.innerHTML += `<option class="placa_opcoes" value="${elemento}" data-value="${index}">${elemento}</option>`
        });
        ocultar(divCadastrarPlaca, divInputsDadosViagem);
        btCadastrarPlaca.classList.remove('oculto');
        btRemoverPlaca.classList.remove('oculto');
        numeroPlacaAdicionar.value = '';
        enunciadoTitulo.textContent = 'Dados da Viagem'
      } else {
        alert('Favor revisar se o número dá placa está correto')
      }
    } else {
      alert('Ops, acho que você esqueceu de colocar a placa!');
      numeroPlacaAdicionar.focus();
    }
  })
  btCancelarCadastroPlaca.addEventListener('click', () => {
    ocultar(divCadastrarPlaca, divInputsDadosViagem);
    btCadastrarPlaca.classList.remove('oculto');
    btRemoverPlaca.classList.remove('oculto');
    numeroPlacaAdicionar.value = '';
    enunciadoTitulo.textContent = 'Dados da Viagem'

  })

}

function adicionarViagem() {
  const dadosViagens = document.querySelector('.tabela_viagens');
  const dadosData = document.querySelector('.data').value.split('-');
  const data = dadosData.reverse().join('/');
  const motorista = document.querySelector('.motorista');
  const placa = document.querySelector('.placa');
  const de = document.querySelector('.de');
  const ate = document.querySelector('.ate');
  if (data && motorista.value && placa.value != 'Placa do Veículo' && de.value && ate.value) {
    viagens.push({
      data: data,
      motorista: motorista.value,
      placa: placa.value,
      de: de.value,
      ate: ate.value,
      retornado: false
    })
    dadosViagens.innerHTML = `<tr class="tabela_viagens_informacoes">
  <th class="tabela_viagens_dados_titulo">Data Saída</th>
  <th class="tabela_viagens_dados_titulo">Motorista</th>
  <th class="tabela_viagens_dados_titulo">Placa Veículo</th>
  <th class="tabela_viagens_dados_titulo">De</th>
  <th class="tabela_viagens_dados_titulo">Até</th>
</tr>`
    viagens.forEach((i, index) => {

      dadosViagens.innerHTML += `      <tr class="tabela_viagens_relatorio" index ="${index}">
      <td class="tabela_viagens_dados">${i.data}</td>
      <td class="tabela_viagens_dados">${i.motorista}</td>
      <td class="tabela_viagens_dados dados_placa" >
        ${i.placa}
      </td>
      <td class="tabela_viagens_dados">${i.de}</td>
      <td class="tabela_viagens_dados">${i.ate}</td>
      <td class="tabela_viagens_dados_retorno">
        <input class="data_retorno oculto" type="date" />
        <button class="bt salvar_retorno oculto">Salvar</button>
        <button class="bt informar_retorno">Informar retorno</button>
      </td>
    </tr>`
      data.value = 'dd/mm/aaaa'
      motorista.value = ''
      placa.value = 'Placa do Veículo'
      de.value = ''
      ate.value = ''
    })
  } else {
    alert('Todos os campos são obrigatórios!')
  }


}

btCadastrarPlaca.addEventListener('click', () => {
  cadastrarPlacaSistema();
})
btAdicionarViagem.addEventListener('click', () => {
  adicionarViagem()
})