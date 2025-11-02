// Sistema de Geração e Busca de Bilhetes
class TicketSystem {
    constructor() {
        this.tickets = [];
        this.filteredTickets = [];
        this.currentPage = 1;
        this.ticketsPerPage = 12;
        this.searchTerm = '';
        
        this.init();
    }
    
    async init() {
        await this.loadTickets();
        this.renderTickets();
        this.setupEventListeners();
    }
    
    async loadTickets() {
        // Dados de exemplo - substitua pela sua API
        this.tickets = [
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
            }
            // Adicione mais bilhetes aqui...
        ];
        
        this.filteredTickets = [...this.tickets];
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const loadMoreBtn = document.getElementById('load-more');
        
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterTickets();
        });
        
        searchBtn.addEventListener('click', () => this.filterTickets());
        loadMoreBtn.addEventListener('click', () => this.loadMoreTickets());
    }
    
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
        
        gallery.innerHTML = ticketsToShow.map(ticket => this.createTicketHTML(ticket)).join('');
        
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
        
        if (shownTickets >= totalTickets) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    updateSearchInfo() {
        const infoElement = document.getElementById('search-results-info');
        if (this.searchTerm.trim() !== '') {
            infoElement.textContent = `${this.filteredTickets.length} bilhete(s) encontrado(s) para "${this.searchTerm}"`;
            infoElement.style.display = 'block';
        } else {
            infoElement.style.display = 'none';
        }
    }
}

// Inicializar sistema de bilhetes
document.addEventListener('DOMContentLoaded', () => {
    new TicketSystem();
});
