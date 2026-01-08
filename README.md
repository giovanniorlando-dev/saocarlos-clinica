# São Carlos Medicina e Segurança do Trabalho - Site Institucional

## 📋 Sobre o Projeto

Site profissional desenvolvido para a clínica São Carlos Medicina e Segurança do Trabalho, localizada em São Carlos - SP.

### 🎨 Características
- Design moderno e responsivo
- Cores: Cinza e Laranja
- Botão flutuante do WhatsApp
- Formulário de orçamento
- Seções: Início, Sobre, Serviços, Exames e Contato

## 🚀 Como Usar

### 1. Abrir o Site
Basta abrir o arquivo `index.html` no seu navegador preferido.

### 2. Configurar o E-mail para Receber Orçamentos

Atualmente, o formulário está configurado para abrir o cliente de e-mail padrão do computador. Para mudar o e-mail que receberá os orçamentos:

**Abra o arquivo `script.js` e encontre a linha 73:**
```javascript
const clinicEmail = 'contato@saocarlosmedicina.com.br';
```

**Substitua pelo seu e-mail:**
```javascript
const clinicEmail = 'seuemail@example.com';
```

### 3. Configurar Envio Automático de E-mail (Opcional)

Para envio automático de e-mails sem precisar do cliente de e-mail, você pode usar o **EmailJS** (gratuito):

1. Acesse [EmailJS](https://www.emailjs.com/) e crie uma conta
2. Configure um serviço de e-mail (Gmail, Outlook, etc.)
3. Crie um template de e-mail
4. Copie seu User ID, Service ID e Template ID
5. No arquivo `script.js`, descomente o código no final (linhas 211-243) e adicione suas credenciais:

```javascript
emailjs.init("SEU_USER_ID");

// No evento de submit:
await emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    company: document.getElementById('company').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
    to_email: "seuemail@example.com"
});
```

6. Adicione a biblioteca do EmailJS no `index.html` antes do fechamento da tag `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

## 📱 WhatsApp

O botão flutuante do WhatsApp está configurado com o número: **(16) 99626-2266**

Para alterar o número ou a mensagem padrão, edite o arquivo `index.html` na linha 345:

```html
<a href="https://wa.me/5516996262266?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento." class="whatsapp-float" target="_blank">
```

**Formato do número:** `55` (código do Brasil) + `16` (DDD) + `996262266` (número sem espaços ou traços)

## 🎨 Personalização

### Alterar Cores
Edite o arquivo `style.css` nas linhas 9-16:

```css
:root {
    --primary-color: #ff7b00;      /* Laranja principal */
    --secondary-color: #e66d00;    /* Laranja secundário */
    --dark-gray: #2c2c2c;          /* Cinza escuro */
    --medium-gray: #555555;         /* Cinza médio */
    --light-gray: #f5f5f5;         /* Cinza claro */
}
```

### Alterar Imagens
As imagens atuais são do Unsplash. Para usar suas próprias imagens:

1. **Banner Principal** - Substitua a URL na linha 119 do `style.css`:
```css
background: url('sua-imagem.jpg') center/cover;
```

2. **Seção Sobre Nós** - Substitua a URL na linha 187 do `index.html`:
```html
<img src="sua-imagem.jpg" alt="Medicina do Trabalho">
```

### Adicionar Logo
No lugar do texto "SÃO CARLOS", você pode adicionar uma logo editando o `index.html` na linha 26:

```html
<div class="logo">
    <img src="logo.png" alt="São Carlos Medicina" style="height: 60px;">
</div>
```

## 📞 Informações de Contato

Todas as informações de contato estão corretas no site:

- **Endereço:** R. 15 de Novembro, 982 - Centro, São Carlos - SP, 13560-241
- **Telefone:** (16) 99626-2266
- **E-mail:** contato@saocarlosmedicina.com.br

Para alterar, edite o arquivo `index.html`.

## 🔧 Funcionalidades Implementadas

✅ Menu de navegação responsivo  
✅ Botão flutuante do WhatsApp  
✅ Formulário de orçamento  
✅ Máscara para telefone  
✅ Validação de e-mail  
✅ Animações suaves  
✅ Design totalmente responsivo  
✅ Mapa do Google Maps integrado  

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- 📱 Celulares (320px+)
- 📱 Tablets (768px+)
- 💻 Notebooks (1024px+)
- 🖥️ Desktops (1200px+)

## 🌐 Publicação do Site

Para colocar o site online, você pode usar serviços gratuitos:

### Opção 1: GitHub Pages (Gratuito)
1. Crie uma conta no GitHub
2. Crie um repositório
3. Faça upload dos arquivos
4. Ative o GitHub Pages nas configurações

### Opção 2: Netlify (Gratuito)
1. Acesse [Netlify](https://www.netlify.com/)
2. Arraste a pasta do site
3. Pronto! Seu site estará online

### Opção 3: Vercel (Gratuito)
1. Acesse [Vercel](https://vercel.com/)
2. Importe o projeto
3. Deploy automático

## 📧 Suporte

Para dúvidas ou suporte, entre em contato pelo WhatsApp: (16) 99626-2266

## 📄 Licença

Este site foi desenvolvido exclusivamente para São Carlos Medicina e Segurança do Trabalho.

---

**Desenvolvido com ❤️ para São Carlos Medicina e Segurança do Trabalho**
