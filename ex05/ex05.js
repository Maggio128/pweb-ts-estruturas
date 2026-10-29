const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
function lerPrecos(texto) {
    const precos = [];
    let ignorados = 0;
    const linhas = texto.split('\n');
    for (const linha of linhas) {
        const limpa = linha.trim();
        if (limpa === '')
            continue;
        const valor = Number(limpa.replace(',', '.'));
        if (!Number.isFinite(valor) || valor <= 0) {
            ignorados++;
            continue;
        }
        precos.push(valor);
        if (precos.length >= 20)
            break;
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    return precos.reduce((soma, preco) => soma + preco, 0);
}
function calcularDesconto(total, percentualOuCupom) {
    if (typeof percentualOuCupom === 'number') {
        return total * percentualOuCupom / 100;
    }
    switch (percentualOuCupom.toUpperCase()) {
        case 'BEMVINDO': return total * 0.10;
        case 'PROMO20': return total * 0.20;
        case 'MENOS15': return total >= 100 ? 15 : 0;
        default: return 0;
    }
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const leitura = lerPrecos(campoItens.value);
    const precos = leitura.precos;
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = campoCupom.value.trim();
    const descontoCupom = cupom === '' ? 0 : calcularDesconto(subtotal, cupom);
    const cupomValido = cupom !== '' && (cupom.toUpperCase() === 'BEMVINDO' || cupom.toUpperCase() === 'PROMO20' || (cupom.toUpperCase() === 'MENOS15' && subtotal >= 100));
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
    const total = aposCupom - descontoFidelidade;
    const linhas = [`Itens: ${precos.length}${leitura.ignorados > 0 ? ` (${leitura.ignorados} ${leitura.ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})` : ''}`, exibirValor('Subtotal', subtotal, formatarReal)];
    if (cupom !== '') {
        linhas.push(cupomValido
            ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
            : 'Cupom inválido ou não aplicável.');
    }
    if (campoFidelidade.checked)
        linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
    linhas.push(exibirValor('Total a pagar', total, formatarReal));
    saida.textContent = linhas.join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map