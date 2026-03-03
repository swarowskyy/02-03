// Aguarda o navegador carregar todo o HTML antes de ativar o JS
document.addEventListener('DOMContentLoaded', () => {
    
    // Conecta o JavaScript aos elementos do seu HTML
    const form = document.getElementById('formPromocao');
    const modal = document.getElementById('modalSucesso');
    const campoCodigo = document.getElementById('codigo');

    // 1. Função para fechar o modal
    // Usamos 'window.' para que o botão 'onclick' do HTML encontre a função
    window.fecharModal = function() {
        modal.style.display = 'none'; // Esconde o modal
        form.reset(); // Limpa os campos do formulário para o próximo uso
    };

    // 2. Escuta o envio do formulário
    form.addEventListener('submit', function(event) {
        // MUITO IMPORTANTE: Impede a página de recarregar e perder os dados
        event.preventDefault();

        // Validação: O código de barras deve ter 13 dígitos
        if (campoCodigo.value.length === 13) {
            // Se estiver tudo certo, exibe o modal
            modal.style.display = 'flex';
        } else {
            alert('Ops! O código de barras precisa ter exatamente 13 dígitos.');
        }
    });

    // 3. Fechar o modal se o usuário clicar fora da caixinha branca
    window.onclick = function(event) {
        if (event.target == modal) {
            fecharModal();
        }
    };
});
