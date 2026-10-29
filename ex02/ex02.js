function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde': return 0;
        case 'amarela': return consumo * 0.02;
        case 'vermelha1': return consumo * 0.04;
        case 'vermelha2': return consumo * 0.08;
    }
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde': return 'Condições favoráveis de geração de energia.';
        case 'amarela': return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2': return 'Condições mais caras de geração. Economize!';
        default: return 'Bandeira não reconhecida.';
    }
}
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
// adicionalBandeira(100) resulta em 0, pois a bandeira padrão é verde.
console.log('Adicional padrão para 100 kWh:', adicionalBandeira(100));
botao.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    if (consumo <= 0 || Number.isNaN(consumo)) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    saida.textContent = `Energia: R$ ${energia.toFixed(2)}\nBandeira ${bandeira}: R$ ${adicional.toFixed(2)}\nTotal: R$ ${(energia + adicional).toFixed(2)}\n${mensagemBandeira(bandeira)}`;
    saida.className = bandeira === 'verde' ? 'sucesso' : 'alerta';
});
export {};
//# sourceMappingURL=ex02.js.map