// Menu Mobile Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Formulário de Autorização de Exames
const authorizationForm = document.getElementById('authorizationForm');

// Máscara para CNPJ
const cnpjInput = document.getElementById('auth-cnpj');
cnpjInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 14) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    }
    
    e.target.value = value;
});

// Máscara para CPF
const cpfInput = document.getElementById('auth-cpf');
cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
    
    e.target.value = value;
});

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Adicionar estilos inline
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Adicionar estilos de animação para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.8;
        transition: opacity 0.3s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Validação de email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Adicionar validação ao campo de email
document.getElementById('auth-email').addEventListener('blur', (e) => {
    if (e.target.value && !isValidEmail(e.target.value)) {
        e.target.style.borderColor = '#ff0000';
        showNotification('Por favor, insira um e-mail válido', 'error');
    } else {
        e.target.style.borderColor = '#ddd';
    }
});

// Submit do formulário
authorizationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        empresa: document.getElementById('auth-empresa').value,
        cnpj: document.getElementById('auth-cnpj').value,
        nome: document.getElementById('auth-nome').value,
        cpf: document.getElementById('auth-cpf').value,
        cargo: document.getElementById('auth-cargo').value,
        nascimento: document.getElementById('auth-nascimento').value,
        tipoExame: document.querySelector('input[name="tipo-exame"]:checked')?.value || '',
        examesComplementares: Array.from(document.querySelectorAll('input[name="exames"]:checked')).map(cb => cb.value),
        observacoes: document.getElementById('auth-observacoes').value,
        email: document.getElementById('auth-email').value
    };

    // Validar tipo de exame
    if (!formData.tipoExame) {
        showNotification('Por favor, selecione o tipo de exame', 'error');
        document.querySelector('input[name="tipo-exame"]').focus();
        return;
    }

    // Validar email
    if (!isValidEmail(formData.email)) {
        showNotification('Por favor, insira um e-mail válido', 'error');
        document.getElementById('auth-email').focus();
        return;
    }

    // Formatar data
    const [ano, mes, dia] = formData.nascimento.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Formatar mensagem para envio
    const emailSubject = `Autorização de Exames - ${formData.nome}`;
    const emailBody = `
AUTORIZAÇÃO DE EXAMES
São Carlos Medicina e Segurança do Trabalho
========================================

DADOS DA EMPRESA
Empresa: ${formData.empresa}
CNPJ: ${formData.cnpj}

DADOS DO COLABORADOR
Nome: ${formData.nome}
CPF: ${formData.cpf}
Cargo/Função: ${formData.cargo}
Data de Nascimento: ${dataFormatada}

TIPO DE EXAME
${formData.tipoExame}

EXAMES COMPLEMENTARES
${formData.examesComplementares.length > 0 ? formData.examesComplementares.join('\n') : 'Nenhum exame complementar selecionado'}

OBSERVAÇÕES
${formData.observacoes || 'Nenhuma observação adicional'}

========================================
Data da Solicitação: ${new Date().toLocaleDateString('pt-BR')}
E-mail para impressão: ${formData.email}

Contato da Clínica:
São Carlos Medicina e Segurança do Trabalho
R. 15 de Novembro, 982 - Centro, São Carlos - SP
Telefone: (16) 99626-2266
    `.trim();

    // E-mail da clínica que receberá a autorização
    const clinicEmail = 'contato@saocarlosmedicina.com.br';
    
    // Criar link mailto
    const mailtoLink = `mailto:${clinicEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir cliente de e-mail
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de confirmação
    showNotification('Seu cliente de e-mail foi aberto! A autorização será enviada para o e-mail informado após você clicar em enviar.', 'success');
    
    // Limpar formulário após 2 segundos
    setTimeout(() => {
        authorizationForm.reset();
    }, 2000);
});

// Contador de rolagem para header
let lastScroll = 0;
const header = document.querySelector('.navbar');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        }
        
        lastScroll = currentScroll;
    });

    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

console.log('Página de Autorização de Exames - São Carlos Medicina e Segurança do Trabalho');
