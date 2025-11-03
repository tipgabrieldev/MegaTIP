// Dados dos bilhetes (exemplo - substitua pelos seus dados reais)
const ticketsData = [
    {
        id: 1,
        participante: "João Silva",
        numeros: [5, 12, 23, 34, 45, 56],
        codigo: "MT2025-001",
        data: "15/12/2025",
        premiado: false
    },
    {
        id: 2,
        participante: "Maria Santos",
        numeros: [7, 14, 21, 28, 35, 42],
        codigo: "MT2025-002", 
        data: "15/12/2025",
        premiado: false
    },
    {
        id: 3,
        participante: "Pedro Oliveira",
        numeros: [3, 11, 19, 27, 39, 51],
        codigo: "MT2025-003",
        data: "16/12/2025",
        premiado: false
    },
    {
        id: 4,
        participante: "Ana Costa",
        numeros: [8, 16, 24, 32, 40, 48],
        codigo: "MT2025-004",
        data: "16/12/2025",
        premiado: false
    },
    {
        id: 5,
        participante: "Carlos Souza",
        numeros: [2, 13, 25, 36, 44, 55],
        codigo: "MT2025-005",
        data: "17/12/2025",
        premiado: false
    },
    {
        id: 6,
        participante: "Fernanda Lima",
        numeros: [9, 17, 26, 38, 47, 53],
        codigo: "MT2025-006",
        data: "17/12/2025",
        premiado: false
    },
    {
        id: 7,
        participante: "Ricardo Alves",
        numeros: [4, 15, 22, 33, 46, 54],
        codigo: "MT2025-007",
        data: "18/12/2025",
        premiado: false
    },
    {
        id: 8,
        participante: "Juliana Ferreira",
        numeros: [1, 18, 29, 37, 43, 52],
        codigo: "MT2025-008",
        data: "18/12/2025",
        premiado: false
    }
];

// Sistema principal
class MegaTipSystem {
    constructor() {
        this.tickets = ticketsData;
        this.filteredTickets = [...ticketsData];
        this.currentPage = 1;
        this.ticketsPerPage = 8;
        this.searchTerm = '';
        this.numerosOficiais = [0, 0, 0, 0, 0, 0];
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupMenu();
        this.setupEventListeners();
        this.renderTickets();
        this.setupCopyright();
        this.setupSmoothScroll();
    }
    
    // Menu Mobile
    setupMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuButton.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            mobileMenu.classList.toggle('active', this.isMenuOpen);
            menuButton.innerHTML = this.isMenuOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        });
        
        // Fechar menu ao clicar nos links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.isMenuOpen = false;
                mobileMenu.classList.remove('active');
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Event Listeners
    setupEventListeners() {
        // Busca de bilhetes
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const loadMoreBtn = document.getElementById('load-more');
        
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterTickets();
        });
        
        searchBtn.addEventListener('click', () => this.filterTickets());
        loadMoreBtn.addEventListener('click', () => this.loadMoreTickets());
        
        // Verificação de resultados
        const verificarBtn = document.getElementById('btn-verificar-bilhetes');
        verificarBtn.addEventListener('click', () => this.verificarBilhetes());
        
        // Sistema PIX
        this.setupPixSystem();
    }
    
    // Sistema de Bilhetes
    filterTickets() {
        if (this.searchTerm.trim() === '') {
            this.filteredTickets = [...this.tickets];
        } else {
            this.filteredTickets = this.tickets.filter(ticket =>
                ticket.participante.toLowerCase().includes(this.searchTerm) ||
                ticket.codigo.toLowerCase().includes(this.searchTerm)
            );
        }
        
        this.currentPage = 1;
        this.renderTickets();
        this.updateSearchInfo();
    }
    
    renderTickets() {
        const gallery = document.getElementById('tickets-gallery');
        const startIndex = (this.currentPage - 1) * this.ticketsPerPage;
        const endIndex = startIndex + this.ticketsPerPage;
        const ticketsToShow = this.filteredTickets.slice(0, endIndex);
        
        if (ticketsToShow.length === 0) {
            gallery.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <p class="text-xl text-gray-400">Nenhum bilhete encontrado</p>
                </div>
            `;
        } else {
            gallery.innerHTML = ticketsToShow.map(ticket => this.createTicketHTML(ticket)).join('');
        }
        
        this.toggleLoadMoreButton();
    }
    
    createTicketHTML(ticket) {
        const numerosHTML = ticket.numeros.map(num => 
            `<div class="numero-sorteio">${num.toString().padStart(2, '0')}</div>`
        ).join('');
        
        return `
            <div class="ticket card-hover" data-ticket-id="${ticket.id}">
                <div class="ticket-stripes"></div>
                
                ${ticket.premiado ? '<div class="badge-premiado">🎉 Premiado</div>' : ''}
                
                <div class="ticket-header">
                    <div class="ticket-logo">
                        <i class="fas fa-clover"></i>
                    </div>
                    <h3 class="ticket-title">Mega<span class="text-[#d4af37]">TIP</span></h3>
                    <p class="ticket-subtitle">Mega da Virada 2025</p>
                    <span class="ticket-concurso">Concurso: 2025</span>
                </div>
                
                <div class="ticket-body">
                    <div class="ticket-participante">
                        <p><strong>Participante:</strong></p>
                        <p>${ticket.participante}</p>
                    </div>
                    
                    <div class="ticket-numeros-title">Seus Números da Sorte</div>
                    <div class="numeros-container">
                        ${numerosHTML}
                    </div>
                    
                    <div class="ticket-data">
                        <p><strong>Data:</strong> ${ticket.data}</p>
                        <p class="ticket-valor">Valor: R$ 6,00</p>
                    </div>
                    
                    <div class="ticket-codigo">
                        Código: ${ticket.codigo}
                    </div>
                </div>
                
                <div class="ticket-footer">
                    <i class="fas fa-shield-alt mr-2"></i>Bilhete Registrado e Válido
                </div>
                
                <div class="ticket-watermark">MegaTIP</div>
            </div>
        `;
    }
    
    loadMoreTickets() {
        this.currentPage++;
        this.renderTickets();
    }
    
    toggleLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        const totalTickets = this.filteredTickets.length;
        const shownTickets = this.currentPage * this.ticketsPerPage;
        
        loadMoreBtn.style.display = shownTickets >= totalTickets ? 'none' : 'block';
    }
    
    updateSearchInfo() {
        const infoElement = document.getElementById('search-results-info');
        if (this.searchTerm.trim() !== '') {
            infoElement.textContent = `${this.filteredTickets.length} bilhete(s) encontrado(s) para "${this.searchTerm}"`;
            infoElement.classList.remove('hidden');
        } else {
            infoElement.classList.add('hidden');
        }
    }
    
    // Sistema de Verificação
    verificarBilhetes() {
        const resultados = this.tickets.map(ticket => {
            const acertos = this.calcularAcertos(ticket.numeros);
            return {
                ...ticket,
                acertos,
                premiado: acertos === 6
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
        const bilhetesComAcertos = resultados.filter(r => r.acertos > 0);
        if (bilhetesComAcertos.length > 0) {
            listaBilhetes.innerHTML = bilhetesComAcertos
                .map(r => `
                    <div class="bg-gray-800 p-3 rounded-lg">
                        <p><strong>${r.participante}</strong> - ${r.acertos} acerto(s)</p>
                        <p class="text-sm text-gray-400">Código: ${r.codigo}</p>
                    </div>
                `).join('');
            detalhesAcertos.classList.remove('hidden');
        } else {
            detalhesAcertos.classList.add('hidden');
        }
        
        resultadoElement.classList.remove('hidden');
        resultadoElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Sistema PIX
    setupPixSystem() {
        const pixKey = "00020126580014br.gov.bcb.pix01365ba9125c-f301-48ef-9f7f-d4508777bd830225MegaTIP - Mega da Virada 52040000530398654056.005802BR5924Gabriel da Paz Silva San6009Sao Paulo61080540900062250515MegaTIP2025122152040000530398654046.005802BR5913Gabriel Silva6009Sao Paulo62070503***6304E2CD";
        
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const container = e.target.closest('.pix-code');
                try {
                    await navigator.clipboard.writeText(pixKey);
                    this.showFeedback('Chave PIX copiada com sucesso!', 'success', container);
                } catch (err) {
                    const textArea = document.createElement('textarea');
                    textArea.value = pixKey;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showFeedback('Chave PIX copiada com sucesso!', 'success', container);
                }
            });
        });
    }
    
    showFeedback(message, type, container) {
        container.classList.add('copied');
        
        const feedback = document.createElement('div');
        feedback.className = `floating-message ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : '#dc2626'};
            color: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(feedback);
                container.classList.remove('copied');
            }, 300);
        }, 3000);
    }
    
    // Utilitários
    setupCopyright() {
        const copyrightElement = document.getElementById('copyright');
        if (copyrightElement) {
            const year = new Date().getFullYear();
            copyrightElement.textContent = `© ${year} MegaTIP - Todos os direitos reservados.`;
        }
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Método para atualizar números oficiais após sorteio
    atualizarNumerosOficiais(novosNumeros) {
        this.numerosOficiais = novosNumeros;
        const numerosElement = document.getElementById('numeros-oficiais');
        numerosElement.innerHTML = novosNumeros.map(num => 
            `<span class="numero-oficial sorteado">${num.toString().padStart(2, '0')}</span>`
        ).join('');
        
        const statusElement = document.getElementById('status-sorteio');
        statusElement.innerHTML = '<p class="text-green-400"><i class="fas fa-check-circle mr-2"></i>Sorteio realizado!</p>';
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.megaTip = new MegaTipSystem();
});

// Funções globais para compatibilidade
function copiarPix() {
    const pixKey = "00020126580014br.gov.bcb.pix01365ba9125c-f301-48ef-9f7f-d4508777bd830225MegaTIP - Mega da Virada 52040000530398654056.005802BR5924Gabriel da Paz Silva San6009Sao Paulo61080540900062250515MegaTIP2025122152040000530398654046.005802BR5913Gabriel Silva6009Sao Paulo62070503***6304E2CD";
    navigator.clipboard.writeText(pixKey).then(() => {
        alert('Chave PIX copiada com sucesso!');
    });
}

function copiarPixContato() {
    copiarPix();
}
