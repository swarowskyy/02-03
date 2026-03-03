document.addEventListener('DOMContentLoaded', () => {
    
    // --- SELEÇÃO DE ELEMENTOS ---
    // Criamos "apelidos" (variáveis) para os campos do formulário que vamos manipular
    const form = document.querySelector('.form-wrapper');
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const codigoInput = document.getElementById('codigo');
    const btnSubmit = document.querySelector('button[type="submit"]');

    // --- MÁSCARA DE CPF ---
    // 'input' detecta cada tecla digitada pelo usuário
    cpfInput.addEventListener('input', (e) => {
        // Remove qualquer caractere que NÃO seja número (letras, pontos, traços)
        let value = e.target.value.replace(/\D/g, ''); 
        
        // Aplica a formatação 000.000.000-00 conforme o usuário digita
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');       // Coloca o primeiro ponto
            value = value.replace(/(\d{3})(\d)/, '$1.$2');       // Coloca o segundo ponto
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o traço final
        }
        e.target.value = value; // Devolve o valor formatado para o campo visual
    });

    // --- MÁSCARA DE CEP ---
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove o que não é número
        
        // Formata como 00000-000
        if (value.length <= 8) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });

    // --- VALIDAÇÃO DO CÓDIGO DE BARRAS ---
    codigoInput.addEventListener('input', (e) => {
        // Garante que só números entrem e limita a 13 dígitos (padrão EAN-13)
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 13);
    });

    // --- LÓGICA DE ENVIO DO FORMULÁRIO ---
    btnSubmit.addEventListener('click', (e) => {
        // e.preventDefault() evita que a página recarregue ao clicar no botão
        e.preventDefault(); 

        // Seleciona todos os inputs dentro do formulário para verificar se estão vazios
        const campos = form.querySelectorAll('input');
        let todosPreenchidos = true;

        // Loop: passa por cada campo individualmente
        campos.forEach(input => {
            if (!input.value) {
                todosPreenchidos = false;
                // Se estiver vazio, pinta a borda de rosa (erro visual)
                input.style.borderColor = '#F7C6C7'; 
            } else {
                // Se estiver preenchido, volta a borda para a cor cinza normal
                input.style.borderColor = '#eee';
            }
        });

        // Verificação final
        if (todosPreenchidos) {
            // Feedback de UX: muda o texto do botão e desativa o clique duplo
            btnSubmit.innerText = "enviando!😎...";
            btnSubmit.disabled = true;

            // Simula uma espera de rede (1.5 segundos) antes de confirmar
            setTimeout(() => {
                alert('Cadastro concluido com sucesso!');
                
                // Reseta o botão para o estado original
                btnSubmit.innerText = "cadastrar agora mesmo";
                btnSubmit.disabled = false;
                
                // Opcional: limpa todos os campos após o sucesso
                // campos.forEach(input => input.value = ""); 
            }, 1500);
        } else {
            // Alerta amigável caso falte algo
            alert('Eita! Por favor, preencha todos os campos para adquirir os brindes.');
        }
    });
});