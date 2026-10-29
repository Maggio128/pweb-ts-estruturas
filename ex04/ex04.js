const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
function formatarMeses(meses) {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    const partes = [];
    if (anos > 0)
        partes.push(`${anos} ${anos === 1 ? 'ano' : 'anos'}`);
    if (mesesRestantes > 0)
        partes.push(`${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`);
    return partes.join(' e ') || '0 meses';
}
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        saldo = saldo * (1 + taxa / 100) + deposito;
        depositado += deposito;
        if (meses % 12 === 0) {
            saldo += deposito;
            depositado += deposito;
        }
        if (meses >= 600)
            break;
    }
    return { meses, saldo, depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    if (meta <= 0 || deposito <= 0 || Number.isNaN(meta) || Number.isNaN(deposito)) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const resultado = campoTaxa.value.trim() === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);
    if (resultado.meses >= 600 && resultado.saldo < meta) {
        saida.textContent = `Meta inalcançável em 50 anos. Saldo após 600 meses: ${formatarReal(resultado.saldo)}`;
        saida.className = 'erro';
        return;
    }
    const rendimento = resultado.saldo - resultado.depositado;
    saida.textContent = `Você atinge a meta em ${resultado.meses} meses (${formatarMeses(resultado.meses)}).\n${exibirValor('Saldo final', resultado.saldo, formatarReal)}\n${exibirValor('Total depositado', resultado.depositado, formatarReal)}\n${exibirValor('Rendimento', rendimento, formatarReal)}`;
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map