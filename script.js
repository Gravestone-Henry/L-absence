const entryInput = document.getElementById('entry-input');
const saveBtn = document.getElementById('save-btn');
const entriesContainer = document.getElementById('entries-container');


document.addEventListener('DOMContentLoaded', displayEntries);


saveBtn.addEventListener('click', () => {
    const text = entryInput.value;
    if (text.trim() === "") return alert("Escreva algo antes de entrar no vazio.");

    const entries = JSON.parse(localStorage.getItem('fragments')) || [];
    entries.push({ text: text, date: new Date().toLocaleString() });
    
    localStorage.setItem('fragments', JSON.stringify(entries));
    entryInput.value = ""; 
    displayEntries();
});


function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('fragments')) || [];
    entriesContainer.innerHTML = ""; 

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry-card'); 

        entryDiv.innerHTML = `
            <p>${entry.text}</p>
            <small>${entry.date}</small>
            <button class="delete-btn" onclick="deleteEntry(${index})">Deletar</button>
        `;
        
        entriesContainer.appendChild(entryDiv);
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('fragments')) || [];
    
    
    entries.splice(index, 1);
    
    // local storage
    localStorage.setItem('fragments', JSON.stringify(entries));
    
    
    displayEntries();
}
