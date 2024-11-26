let consumoTotal = 0; 
const eletrodomesticos = {}; 

const form = document.getElementById("form");
const nivelConsumo = document.getElementById("nivel-consumo");
const consumoTotalElement = document.getElementById("consumo-total");
const tabelaEletrodomesticos = document.getElementById("tabela-eletrodomesticos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome-eletrodomestico").value.trim().toLowerCase();
    const potencia = parseFloat(document.getElementById("potencia").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const dias = parseInt(document.getElementById("dias").value);

    if (!nome || isNaN(potencia) || isNaN(horas) || isNaN(dias) || potencia <= 0 || horas <= 0 || dias <= 0) {
        alert("Por favor, insira valores válidos para todos os campos.");
        return;
    }

    
    const consumo = ((potencia * horas * dias) / 1000).toFixed(2);

    if (!eletrodomesticos[nome]) {
        eletrodomesticos[nome] = parseFloat(consumo); 
        consumoTotal += parseFloat(consumo); 
        atualizarConsumoTotal(); 
        atualizarTermometro();
        exibirDicas(nome); 
        atualizarTabela(); 
    } else {
        alert("Este eletrodoméstico já foi adicionado!");
    }

    form.re
});

function atualizarConsumoTotal() {
    consumoTotalElement.textContent = `Consumo Total: ${consumoTotal.toFixed(2)} kWh/mês`;
}

function atualizarTermometro() {
    nivelConsumo.textContent = `${consumoTotal.toFixed(2)} kWh`;
    const largura = Math.min(consumoTotal, 300);
    nivelConsumo.style.width = `${largura}%`;
    nivelConsumo.style.backgroundColor = 
        consumoTotal < 100 ? "green" : consumoTotal < 200 ? "yellow" : "red";
}

function atualizarTabela() {
    tabelaEletrodomesticos.innerHTML = ''; 
    for (const [nome, consumo] of Object.entries(eletrodomesticos)) {
        const row = document.createElement("tr");
        const maiorMenor = consumo === Math.max(...Object.values(eletrodomesticos)) ? "Maior Consumo" : 
                            consumo === Math.min(...Object.values(eletrodomesticos)) ? "Menor Consumo" : "";

        row.innerHTML = `
            <td>${nome.charAt(0).toUpperCase() + nome.slice(1)}</td>
            <td>${consumo.toFixed(2)} kWh/mês</td>
            <td>${maiorMenor}</td>
        `;
        tabelaEletrodomesticos.appendChild(row);
    }
}

function exibirDicas(nome) {
    const dicasContainer = document.getElementById("dicas");
    dicasContainer.innerHTML = ""; 

    const dicas = {
        geladeira: [
            "Evite abrir a porta frequentemente.",
            "Descongele o freezer regularmente.",
            "Não coloque alimentos quentes na geladeira."
        ],
        ferro: [
            "Use o ferro apenas quando acumular uma quantidade significativa de roupas.",
            "Desligue o ferro antes de terminar e use o calor residual.",
            "Prefira passar roupas leves juntas para otimizar o tempo."
        ],
        chuveiro: [
            "Reduza o tempo de banho.",
            "Prefira temperaturas mais baixas.",
            "Faça revisões periódicas para evitar vazamentos."
        ],
        televisão: [
            "Desligue a TV quando não estiver assistindo.",
            "Ajuste o brilho da tela para economizar energia.",
            "Evite usar o modo de espera (standby)."
        ],
        ventilador: [
            "Use o ventilador apenas em ambientes ocupados.",
            "Mantenha as hélices limpas para melhor eficiência.",
            "Desligue o ventilador ao sair do ambiente."
        ]
    };

    const dicasEletrodomestico = dicas[nome];
    if (dicasEletrodomestico) {
        dicasEletrodomestico.forEach((dica) => {
            const li = document.createElement("li");
            li.textContent = dica;
            dicasContainer.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Dica geral: use eletrodomésticos nos horários de tarifa reduzida e otimize a capacidade máxima.";
        dicasContainer.appendChild(li);
    }
}
