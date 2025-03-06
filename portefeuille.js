let portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || [];

const form = document.getElementById('portfolioForm');
const table = document.getElementById('portfolioTable').getElementsByTagName('tbody')[0];

// Fonction pour afficher les données du portefeuille
function displayPortfolioData() {
    table.innerHTML = '';
    portfolioData.forEach((item, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.value} €</td>
            <td>
                <button onclick="editItem(${index})">Modifier</button>
                <button onclick="deleteItem(${index})">Supprimer</button>
            </td>
        `;
    });
}

// Fonction pour ajouter ou modifier un élément
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const value = parseFloat(document.getElementById('itemValue').value);

    if (id === '') {
        // Ajouter un nouvel élément
        portfolioData.push({ name, value });
    } else {
        // Modifier un élément existant
        portfolioData[parseInt(id)] = { name, value };
    }

    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    displayPortfolioData();
    form.reset();
    document.getElementById('itemId').value = '';
});

// Fonction pour éditer un élément
function editItem(index) {
    const item = portfolioData[index];
    document.getElementById('itemId').value = index;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemValue').value = item.value;
}

// Fonction pour supprimer un élément
function deleteItem(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
        portfolioData.splice(index, 1);
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        displayPortfolioData();
    }
}

// Afficher les données au chargement de la page
displayPortfolioData();