// Sistema de Cópia PIX
class PixSystem {
    constructor() {
        this.pixKey = "00020126580014br.gov.bcb.pix01365ba9125c-f301-48ef-9f7f-d4508777bd830225MegaTIP - Mega da Virada 52040000530398654056.005802BR5924Gabriel da Paz Silva San6009Sao Paulo61080540900062250515MegaTIP2025122152040000530398654046.005802BR5913Gabriel Silva6009Sao Paulo62070503***6304E2CD";
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Configurar botões de cópia
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.closest('.pix-code');
                this.copyToClipboard(this.pixKey, container);
            });
        });
    }
    
    async copyToClipboard(text, container) {
        try {
            await navigator.clipboard.writeText(text);
            this.showFeedback('Chave PIX copiada com sucesso!', 'success', container);
        } catch (err) {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showFeedback('Chave PIX copiada com sucesso!', 'success', container);
        }
    }
    
    showFeedback(message, type, container) {
        // Adicionar classe de feedback visual
        container.classList.add('copied');
        
        // Criar mensagem flutuante
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
        
        // Remover após 3 segundos
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(feedback);
                container.classList.remove('copied');
            }, 300);
        }, 3000);
    }
}

// Inicializar sistema PIX
document.addEventListener('DOMContentLoaded', () => {
    new PixSystem();
});
