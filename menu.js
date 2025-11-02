// Controle do Menu Mobile
class MobileMenu {
    constructor() {
        this.menuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar em um link
        const mobileLinks = this.mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.mobileMenu.classList.add('active');
        this.menuButton.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }
    
    closeMenu() {
        this.mobileMenu.classList.remove('active');
        this.menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});
