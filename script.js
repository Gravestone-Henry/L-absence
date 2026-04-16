const entryInput = document.getElementById('entry-input');
const saveBtn = document.getElementById('save-btn');
const entriesContainer = document.getElementById('entries-container');

// Carregar registros ao abrir a página
document.addEventListener('DOMContentLoaded', displayEntries);

// Função para salvar novo registro
saveBtn.addEventListener('click', () => {
    const text = entryInput.value;
    if (text.trim() === "") return alert("Escreva algo antes de entrar no vazio.");

    const entries = JSON.parse(localStorage.getItem('fragments')) || [];
    entries.push({ text: text, date: new Date().toLocaleString() });
    
    localStorage.setItem('fragments', JSON.stringify(entries));
    entryInput.value = ""; // Limpa o campo
    displayEntries();
});

// Função para exibir os registros na tela
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('fragments')) || [];
    entriesContainer.innerHTML = ""; // Limpa a lista para atualizar

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry-card'); // Você pode estilizar essa classe no CSS

        entryDiv.innerHTML = `
            <p>${entry.text}</p>
            <small>${entry.date}</small>
            <button class="delete-btn" onclick="deleteEntry(${index})">Deletar</button>
        `;
        
        entriesContainer.appendChild(entryDiv);
    });
}

// Função para deletar um registro específico
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('fragments')) || [];
    
    // Remove o item do array pelo índice
    entries.splice(index, 1);
    
    // Salva a nova lista (sem o item) no localStorage
    localStorage.setItem('fragments', JSON.stringify(entries));
    
    // Renderiza a lista atualizada
    displayEntries();
}