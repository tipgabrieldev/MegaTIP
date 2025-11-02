// Sistema de Verificação de Resultados
class ResultChecker {
    constructor() {
        this.numerosOficiais = [0, 0, 0, 0, 0, 0]; // Será atualizado após o sorteio
        this.tickets = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadTicketsForChecking();
    }
    
    setupEventListeners() {
        const verificarBtn = document.getElementById('btn-verificar-bilhetes');
        verificarBtn.addEventListener('click', () => this.verificarBilhetes());
    }
    
    async loadTicketsForChecking() {
        // Carregar os mesmos tickets do sistema principal
        // Em uma implementação real, isso viria de uma API
        this.tickets = await this.fetchTickets();
    }
    
    async fetchTickets() {
        // Simular carregamento de tickets
        return [
            {
                id: 1,
                participante: "João Silva",
                numeros: [5, 12, 23, 34, 45, 56],
                codigo: "MT2025-001"
            }
            // ... mais tickets
        ];
    }
    
    verificarBilhetes() {
        const resultados = this.tickets.map(ticket => {
            const acertos = this.calcularAcertos(ticket.numeros);
            return {
                ...ticket,
                acertos,
                premiado: acertos === 6 // Ganhou se acertou todos os 6 números
            };
        });
        
        this.mostrarResultados(resultados);
    }
    
    calcularAcertos(numerosTicket) {
        return numerosTicket.filter(num => this.numerosOficiais.includes(num)).length;
    }
    
    mostrarResultados(resultados) {
        const resultadoElement = document.getElementById('resultado-verificacao');
        const tituloResultado = document.getElementById('titulo-resultado');
        const bilheteVencedor = document.getElementById('bilhete-vencedor');
        const totalAcertos = document.getElementById('total-acertos');
        const statusGrupo = document.getElementById('status-grupo');
        const mensagemResultado = document.getElementById('mensagem-resultado');
        const detalhesAcertos = document.getElementById('detalhes-acertos');
        const listaBilhetes = document.getElementById('lista-bilhetes-acertos');
        
        const bilhetePremiado = resultados.find(r => r.premiado);
        const maxAcertos = Math.max(...resultados.map(r => r.acertos));
        
        if (bilhetePremiado) {
            // Há um vencedor!
            tituloResultado.textContent = '🎉 PARABÉNS! TEMOS GANHADOR! 🎉';
            tituloResultado.className = 'text-2xl font-bold mb-4 text-center text-green-400';
            
            bilheteVencedor.textContent = bilhetePremiado.participante;
            totalAcertos.textContent = '6 acertos';
            statusGrupo.textContent = 'Grupo Premiado!';
            
            mensagemResultado.innerHTML = `
                <p class="text-center font-bold text-lg">🏆 PARABÉNS A TODOS DO GRUPO! 🏆</p>
                <p class="text-center mt-2">O bilhete de <strong>${bilhetePremiado.participante}</strong> acertou os 6 números!</p>
                <p class="text-center mt-2">Cada participante recebe seu prêmio individual!</p>
            `;
            mensagemResultado.className = 'mt-4 bg-green-900 bg-opacity-20 p-6 rounded-lg border border-green-700';
        } else {
            // Não há vencedor ainda
            tituloResultado.textContent = '📊 Resultado da Verificação';
            tituloResultado.className = 'text-2xl font-bold mb-4 text-center text-yellow-400';
            
            bilheteVencedor.textContent = 'Não identificado';
            totalAcertos.textContent = `${maxAcertos} acertos`;
            statusGrupo.textContent = 'Aguardando sorteio';
            
            mensagemResultado.innerHTML = `
                <p class="text-center font-bold text-lg">⏳ Ainda não temos um ganhador</p>
                <p class="text-center mt-2">O maior número de acertos no momento é <strong>${maxAcertos}</strong>.</p>
                <p class="text-center mt-2">Continue acompanhando!</p>
            `;
            mensagemResultado.className = 'mt-4 bg-yellow-900 bg-opacity-20 p-6 rounded-lg border border-yellow-700';
        }
        
        // Mostrar detalhes dos acertos
        listaBilhetes.innerHTML = resultados
            .filter(r => r.acertos > 0)
            .map(r => `
                <div class="bg-gray-800 p-3 rounded-lg">
                    <p><strong>${r.participante}</strong> - ${r.acertos} acerto(s)</p>
                    <p class="text-sm text-gray-400">Código: ${r.codigo}</p>
                </div>
            `).join('');
        
        detalhesAcertos.classList.remove('hidden');
        resultadoElement.classList.remove('hidden');
        
        // Rolar até os resultados
        resultadoElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Método para atualizar números oficiais (chamar após sorteio)
    atualizarNumerosOficiais(novosNumeros) {
        this.numerosOficiais = novosNumeros;
        
        // Atualizar display visual
        const numerosElement = document.getElementById('numeros-oficiais');
        numerosElement.innerHTML = novosNumeros.map(num => 
            `<span class="numero-oficial sorteado">${num.toString().padStart(2, '0')}</span>`
        ).join('');
        
        // Atualizar status
        const statusElement = document.getElementById('status-sorteio');
        statusElement.innerHTML = '<p class="text-green-400"><i class="fas fa-check-circle mr-2"></i>Sorteio realizado!</p>';
    }
}

// Inicializar verificador
document.addEventListener('DOMContentLoaded', () => {
    window.resultChecker = new ResultChecker();
});
