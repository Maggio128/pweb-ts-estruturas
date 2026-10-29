type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.8;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
  switch (bandeira) {
    case 'verde': return 0;
    case 'amarela': return consumo * 0.02;
    case 'vermelha1': return consumo * 0.04;
    case 'vermelha2': return consumo * 0.08;
  }
}

function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'verde': return 'Condições favoráveis de geração de energia.';
    case 'amarela': return 'Condições de geração menos favoráveis.';
    case 'vermelha1':
    case 'vermelha2': return 'Condições mais caras de geração. Economize!';
    default: return 'Bandeira não reconhecida.';
  }
}

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

// adicionalBandeira(100) resulta em 0, pois a bandeira padrão é verde.
console.log('Adicional padrão para 100 kWh:', adicionalBandeira(100));

botao.addEventListener('click', () => {
  const consumo = campoConsumo.valueAsNumber;
  if (consumo <= 0 || Number.isNaN(consumo)) {
    saida.textContent = 'Informe um consumo válido';
    saida.className = 'erro';
    return;
  }

  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;
  const energia = consumo * tarifaPorKwh(tipo);
  const adicional = adicionalBandeira(consumo, bandeira);
  saida.textContent = `Energia: R$ ${energia.toFixed(2)}\nBandeira ${bandeira}: R$ ${adicional.toFixed(2)}\nTotal: R$ ${(energia + adicional).toFixed(2)}\n${mensagemBandeira(bandeira)}`;
  saida.className = bandeira === 'verde' ? 'sucesso' : 'alerta';
});
