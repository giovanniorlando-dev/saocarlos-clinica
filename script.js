// Menu Mobile Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth Scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Destacar link ativo no menu ao rolar a página
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Formulário de Orçamento
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Formatar mensagem para envio
    const emailSubject = 'Solicitação de Orçamento - São Carlos Medicina';
    const emailBody = `
Nome: ${formData.name}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Empresa: ${formData.company || 'Não informado'}
Serviço de Interesse: ${formData.service}

Mensagem:
${formData.message}
    `.trim();

    // IMPORTANTE: Substitua o email abaixo pelo email da clínica
    const clinicEmail = 'contato@saocarlosmedicina.com.br';
    
    // Criar link mailto
    const mailtoLink = `mailto:${clinicEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir cliente de e-mail
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de confirmação
    showNotification('Seu cliente de e-mail foi aberto! Por favor, envie a mensagem.', 'success');
    
    // Limpar formulário
    quoteForm.reset();
    
    // Alternativamente, você pode enviar via WhatsApp
    // const whatsappMessage = `*Solicitação de Orçamento*\n\nNome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\nEmpresa: ${formData.company || 'Não informado'}\nServiço: ${formData.service}\n\nMensagem:\n${formData.message}`;
    // const whatsappLink = `https://wa.me/5516996262266?text=${encodeURIComponent(whatsappMessage)}`;
    // window.open(whatsappLink, '_blank');
});

// Máscara para telefone
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Adicionar estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
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

// Animação ao rolar (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.service-card, .exam-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Contador de rolagem para header
let lastScroll = 0;
const header = document.querySelector('.navbar');

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

// Validação de email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Adicionar validação ao campo de email
document.getElementById('email').addEventListener('blur', (e) => {
    if (e.target.value && !isValidEmail(e.target.value)) {
        e.target.style.borderColor = '#ff0000';
        showNotification('Por favor, insira um e-mail válido', 'error');
    } else {
        e.target.style.borderColor = '#ddd';
    }
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

// Máscara para RG
const rgInput = document.getElementById('auth-rg');
rgInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 9) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{0,1})/, '$1.$2.$3-$4');
    }
    
    e.target.value = value;
});

authorizationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
        empresa: document.getElementById('auth-empresa').value,
        cnpj: document.getElementById('auth-cnpj').value,
        nome: document.getElementById('auth-nome').value,
        rg: document.getElementById('auth-rg').value,
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
RG: ${formData.rg}
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
    `.trim();

    // E-mail da clínica que receberá a autorização
    const clinicEmail = 'contato@saocarlosmedicina.com.br';
    
    // Criar link mailto
    const mailtoLink = `mailto:${clinicEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir cliente de e-mail
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de confirmação
    showNotification('Seu cliente de e-mail foi aberto! A autorização será enviada para o e-mail informado após você clicar em enviar.', 'success');
    
    // Limpar formulário
    authorizationForm.reset();
});

// Configuração de envio por e-mail usando serviço externo
// Para usar um serviço de envio de e-mail como EmailJS, descomente e configure:

/*
// Exemplo com EmailJS (você precisa criar uma conta em emailjs.com)
emailjs.init("SEU_USER_ID"); // Substitua pelo seu User ID

quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = quoteForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        await emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            to_email: "contato@saocarlosmedicina.com.br"
        });
        
        showNotification('Orçamento enviado com sucesso! Entraremos em contato em breve.', 'success');
        quoteForm.reset();
    } catch (error) {
        showNotification('Erro ao enviar orçamento. Por favor, tente novamente ou entre em contato pelo WhatsApp.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitação';
    }
});
*/

console.log('São Carlos Medicina e Segurança do Trabalho - Site carregado com sucesso!');
