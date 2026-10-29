function calcularTotal(valor: number, parcelas: number): number {
  return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}

function simularParcelamento(preco: number, entrada?: number): string {
  const valorEntrada = typeof entrada !== 'undefined' ? entrada : 0;
  const financiado = preco - valorEntrada;
  let linhas = '';

  for (let quantidade = 1; quantidade <= 12; quantidade++) {
    if (quantidade === 7 || quantidade === 8 || quantidade === 9 || quantidade === 11) {
      continue;
    }
    const total = calcularTotal(financiado, quantidade);
    const parcela = total / quantidade;
    if (parcela < 50) {
      break;
    }
    const juros = quantidade <= 3 ? 'sem juros' : '2% a.m.';
    linhas += `<tr><td>${quantidade}x</td><td>R$ ${parcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }
  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoParcelas = document.getElementById('parcelas') as HTMLTableSectionElement;

botao.addEventListener('click', () => {
  const preco = campoPreco.valueAsNumber;
  const entradaInformada = campoEntrada.value.trim() !== '';
  const entrada = entradaInformada ? campoEntrada.valueAsNumber : undefined;
  corpoParcelas.innerHTML = '';

  if (preco <= 0 || Number.isNaN(preco) || (typeof entrada !== 'undefined' && entrada < 0)) {
    saida.textContent = 'Informe um preço válido e uma entrada igual ou maior que zero.';
    saida.className = 'erro';
    return;
  }
  if (typeof entrada !== 'undefined' && entrada >= preco) {
    saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
    saida.className = 'alerta';
    return;
  }

  const financiado = preco - (entrada ?? 0);
  saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  saida.className = 'sucesso';
  corpoParcelas.innerHTML = entradaInformada
    ? simularParcelamento(preco, entrada)
    : simularParcelamento(preco);
});
